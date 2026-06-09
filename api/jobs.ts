const ADZUNA_APP_ID = 'ba8b6997';
const ADZUNA_APP_KEY = '75443bb59f8ea5a1fc83b22ee196353b';

const GREENHOUSE_COMPANIES = [
  { slug: 'algolia', name: 'Algolia' },
  { slug: 'contentsquare', name: 'Contentsquare' },
  { slug: 'backmarket', name: 'Back Market' },
  { slug: 'doctolib', name: 'Doctolib' },
  { slug: 'qonto', name: 'Qonto' },
  { slug: 'ledger', name: 'Ledger' },
  { slug: 'stripe', name: 'Stripe' },
  { slug: 'figma', name: 'Figma' },
  { slug: 'notion', name: 'Notion' },
  { slug: 'datadog', name: 'Datadog' },
];

const TECH_KEYWORDS = [
  'engineer', 'developer', 'frontend', 'backend', 'fullstack', 'full-stack',
  'data', 'product', 'designer', 'devops', 'cloud', 'mobile', 'qa',
  'software', 'web', 'ux', 'ui', 'ingénieur', 'développeur', 'développeuse',
];

function isRelevantJob(title: string): boolean {
  const lower = title.toLowerCase();
  return TECH_KEYWORDS.some((k) => lower.includes(k));
}

async function fetchGreenhouse() {
  const results = await Promise.allSettled(
    GREENHOUSE_COMPANIES.map(({ slug, name }) =>
      fetch(`https://boards-api.greenhouse.io/v1/boards/${slug}/jobs`)
        .then((r) => r.json())
        .then((data) =>
          (data.jobs || []).map((job: any) => ({
            id: `gh-${slug}-${job.id}`,
            title: job.title,
            company: name,
            location: job.location?.name || 'Remote',
            url: job.absolute_url,
            updatedAt: job.updated_at,
            source: 'Greenhouse',
          }))
        )
        .catch(() => [])
    )
  );
  return results.flatMap((r) => (r.status === 'fulfilled' ? r.value : []));
}

async function fetchAdzuna() {
  const queries = ['développeur web', 'frontend developer', 'data analyst', 'product manager'];
  const results = await Promise.allSettled(
    queries.map((q) =>
      fetch(
        `https://api.adzuna.com/v1/api/jobs/fr/search/1?app_id=${ADZUNA_APP_ID}&app_key=${ADZUNA_APP_KEY}&what=${encodeURIComponent(q)}&where=France&results_per_page=10&content-type=application/json`
      )
        .then((r) => r.json())
        .then((data) =>
          (data.results || []).map((job: any) => ({
            id: `adz-${job.id}`,
            title: job.title,
            company: job.company?.display_name || '',
            location: job.location?.display_name || 'France',
            url: job.redirect_url,
            updatedAt: job.created,
            source: 'WTTJ / LinkedIn',
          }))
        )
        .catch(() => [])
    )
  );
  return results.flatMap((r) => (r.status === 'fulfilled' ? r.value : []));
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const [greenhouse, adzuna] = await Promise.all([fetchGreenhouse(), fetchAdzuna()]);

  const seen = new Set<string>();
  const jobs = [...greenhouse, ...adzuna]
    .filter((job) => isRelevantJob(job.title))
    .filter((job) => {
      if (seen.has(job.title + job.company)) return false;
      seen.add(job.title + job.company);
      return true;
    })
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 40);

  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=600');
  res.status(200).json({ jobs, total: jobs.length });
}
