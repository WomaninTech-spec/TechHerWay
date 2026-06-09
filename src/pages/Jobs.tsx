import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BottomNav } from '@/components/ui/bottom-nav';
import { MapPin, Clock, ExternalLink, Loader2, RefreshCw } from 'lucide-react';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  url: string;
  updatedAt: string;
  source: string;
}

function timeAgo(dateStr: string, isFr: boolean): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return isFr ? "Aujourd'hui" : 'Today';
  if (days === 1) return isFr ? 'Il y a 1 jour' : '1 day ago';
  if (days < 7) return isFr ? `Il y a ${days} jours` : `${days} days ago`;
  if (days < 30) return isFr ? `Il y a ${Math.floor(days / 7)} semaine(s)` : `${Math.floor(days / 7)}w ago`;
  return isFr ? `Il y a ${Math.floor(days / 30)} mois` : `${Math.floor(days / 30)}mo ago`;
}

export default function Jobs() {
  const { i18n } = useTranslation();
  const isFr = i18n.language.startsWith('fr');

  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState('');

  const fetchJobs = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch('/api/jobs');
      const data = await res.json();
      setJobs(data.jobs || []);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchJobs(); }, []);

  const filtered = jobs.filter((j) =>
    search === '' ||
    j.title.toLowerCase().includes(search.toLowerCase()) ||
    j.company.toLowerCase().includes(search.toLowerCase()) ||
    j.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 pb-24">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-6 shadow-lg">
          <h1 className="text-2xl font-bold text-white mb-1">
            {isFr ? 'Opportunités tech' : 'Tech Opportunities'}
          </h1>
          <p className="text-purple-100 text-sm">
            {isFr ? 'France & Remote · Mis à jour en temps réel' : 'France & Remote · Updated in real time'}
          </p>
        </div>

        <div className="p-6 space-y-5">
          {/* Search */}
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={isFr ? 'Rechercher un poste, une entreprise…' : 'Search job, company…'}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-400 focus:outline-none text-sm"
          />

          {/* Sources badges */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-gray-500">{isFr ? 'Sources :' : 'Sources:'}</span>
            <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs">Greenhouse</Badge>
            <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 text-xs">+ WTTJ bientôt</Badge>
          </div>

          {/* Jobs list */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3 text-gray-400">
              <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
              <p className="text-sm">{isFr ? 'Chargement des offres…' : 'Loading jobs…'}</p>
            </div>
          ) : error ? (
            <div className="text-center py-12 space-y-4">
              <p className="text-gray-500">{isFr ? 'Erreur de chargement.' : 'Loading error.'}</p>
              <Button variant="outline" onClick={fetchJobs} className="border-purple-300 text-purple-600">
                <RefreshCw className="w-4 h-4 mr-2" />
                {isFr ? 'Réessayer' : 'Retry'}
              </Button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900">
                  {filtered.length} {isFr ? 'offres disponibles' : 'jobs available'}
                </h2>
                <button onClick={fetchJobs} className="text-purple-500 hover:text-purple-700">
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3">
                {filtered.map((job) => (
                  <Card
                    key={job.id}
                    className="p-5 border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 leading-snug">{job.title}</h3>
                          <p className="text-purple-600 font-medium text-sm mt-0.5">{job.company}</p>
                        </div>
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs shrink-0">
                          Greenhouse
                        </Badge>
                      </div>

                      <div className="flex flex-wrap gap-3 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{timeAgo(job.updatedAt, isFr)}</span>
                        </div>
                      </div>

                      <a
                        href={job.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full border-2 border-purple-200 text-purple-700 text-sm font-semibold hover:bg-purple-50 transition-colors"
                      >
                        {isFr ? 'Voir l\'offre' : 'View job'}
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </Card>
                ))}
              </div>

              {/* WTTJ CTA */}
              <Card className="p-5 bg-gradient-to-br from-red-50 to-orange-50 border-2 border-orange-200">
                <div className="text-center space-y-3">
                  <div className="text-2xl">🌴</div>
                  <h3 className="font-bold text-gray-900">Welcome to the Jungle</h3>
                  <p className="text-sm text-gray-600">
                    {isFr
                      ? 'Des centaines d\'offres tech junior & remote en France'
                      : 'Hundreds of junior & remote tech jobs in France'}
                  </p>
                  <a
                    href="https://www.welcometothejungle.com/fr/jobs?refinementList%5Bcontract_type_names.fr%5D%5B%5D=CDI&query=d%C3%A9veloppeur&aroundQuery=France"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="w-full rounded-full bg-gradient-to-r from-red-500 to-orange-400 hover:from-red-600 hover:to-orange-500 text-white border-0">
                      {isFr ? 'Voir les offres WTTJ →' : 'See WTTJ jobs →'}
                    </Button>
                  </a>
                </div>
              </Card>
            </>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
