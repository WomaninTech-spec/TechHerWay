const COMPANIES = [
  { slug: 'algolia', name: 'Algolia' },
  { slug: 'contentsquare', name: 'Contentsquare' },
  { slug: 'backmarket', name: 'Back Market' },
  { slug: 'doctolib', name: 'Doctolib' },
  { slug: 'qonto', name: 'Qonto' },
  { slug: 'ledger', name: 'Ledger' },
  { slug: 'spendesk', name: 'Spendesk' },
  { slug: 'stripe', name: 'Stripe' },
  { slug: 'figma', name: 'Figma' },
  { slug: 'notion', name: 'Notion' },
  { slug: 'datadog', name: 'Datadog' },
];

const TECH_KEYWORDS = [
  'engineer', 'developer', 'frontend', 'backend', 'fullstack', 'full-stack',
  'data', 'product', 'designer', 'devops', 'cloud', 'mobile', 'ios', 'android',
  'qa', 'security', 'software', 'web', 'ux', 'ui', 'ingénieur', 'développeur',
];

const FRANCE_KEYWORDS = ['paris', 'france', 'lyon', 'bordeaux', 'toulouse',
  'nantes', 'marseille', 'remote', 'télétravail', 'hybrid', 'hybride', 'worldwide'];

function isRelevantJob(title: string): boolean {
  const lower = title.toLowerCase();
  return TECH_KEYWORDS.some((k) => lower.includes(k));
}

function isFranceOrRemote(location: string): boolean {
  if (!location) return true;
  const lower = location.toLowerCase();
  return FRANCE_KEYWORDS.some((k) => lower.includes(k));
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const results = await Promise.allSettled(
    COMPANIES.map(({ slug, name }) =>
      fetch(`https://boards-api.greenhouse.io/v1/boards/${slug}/jobs`)
        .then((r) => r.json())
        .then((data) =>
          (data.jobs || []).map((job: any) => ({
            id: `${slug}-${job.id}`,
            title: job.title,
            company: name,
            location: job.location?.name || 'Remote',
            url: job.absolute_url,
            updatedAt: job.updated_at,
            source: 'greenhouse',
          }))
        )
        .catch(() => [])
    )
  );

  const jobs = results
    .flatMap((r) => (r.status === 'fulfilled' ? r.value : []))
    .filter((job) => isRelevantJob(job.title) && isFranceOrRemote(job.location))
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 30);

  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=600');
  res.status(200).json({ jobs, total: jobs.length });
}
