import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BottomNav } from '@/components/ui/bottom-nav';
import { MapPin, Clock, Briefcase } from 'lucide-react';

export default function Jobs() {
  const navigate = useNavigate();
  const [activeFilters, setActiveFilters] = useState<string[]>(['junior']);

  const filters = [
    { id: 'junior', label: 'Junior friendly' },
    { id: 'remote', label: 'Remote' },
    { id: 'cdi', label: 'CDI' },
    { id: 'freelance', label: 'Freelance' },
  ];

  const jobs = [
    {
      id: 1,
      title: 'Développeuse Web Junior',
      company: 'TechStart Paris',
      location: 'Paris',
      type: 'CDI',
      remote: true,
      stack: ['React', 'TypeScript', 'Node.js'],
      level: 'Junior',
      postedAt: 'Il y a 2 jours',
      salary: '35-45k€',
    },
    {
      id: 2,
      title: 'Frontend Developer',
      company: 'Digital Agency',
      location: 'Lyon',
      type: 'CDI',
      remote: true,
      stack: ['Vue.js', 'JavaScript', 'CSS'],
      level: 'Junior',
      postedAt: 'Il y a 5 jours',
      salary: '32-42k€',
    },
    {
      id: 3,
      title: 'Développeuse Full Stack',
      company: 'Startup Innovation',
      location: 'Remote',
      type: 'CDI',
      remote: true,
      stack: ['React', 'Python', 'PostgreSQL'],
      level: 'Junior/Mid',
      postedAt: 'Il y a 1 semaine',
      salary: '38-48k€',
    },
  ];

  const toggleFilter = (filterId: string) => {
    setActiveFilters((prev) =>
      prev.includes(filterId)
        ? prev.filter((id) => id !== filterId)
        : [...prev, filterId]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 pb-24">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-6 shadow-lg">
          <h1 className="text-2xl font-bold text-white mb-2">
            Opportunités
          </h1>
          <p className="text-purple-100">
            Offres adaptées à ton profil
          </p>
        </div>

        <div className="p-6 space-y-6">
          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => {
              const isActive = activeFilters.includes(filter.id);
              return (
                <Badge
                  key={filter.id}
                  onClick={() => toggleFilter(filter.id)}
                  className={`cursor-pointer text-sm py-2 px-4 transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:from-purple-700 hover:to-pink-600'
                      : 'bg-white text-gray-700 border border-gray-300 hover:border-purple-400'
                  }`}
                >
                  {filter.label}
                </Badge>
              );
            })}
          </div>

          {/* Hero Image */}
          <Card className="overflow-hidden border-2 border-purple-200">
            <img
              src="https://mgx-backend-cdn.metadl.com/generate/images/898311/2026-01-12/febd320a-4a98-4461-baa5-8b643c53c9a8.png"
              alt="Job Opportunities"
              className="w-full h-40 object-cover"
            />
          </Card>

          {/* Jobs List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">
                {jobs.length} offres disponibles
              </h2>
            </div>

            {jobs.map((job) => (
              <Card
                key={job.id}
                className="p-5 cursor-pointer hover:shadow-xl transition-all border border-gray-200"
                onClick={() => navigate(`/job/${job.id}`)}
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {job.title}
                      </h3>
                      <p className="text-gray-600 font-medium">
                        {job.company}
                      </p>
                    </div>
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                      {job.level}
                    </Badge>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {job.stack.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="text-xs bg-purple-100 text-purple-700"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Briefcase className="w-4 h-4" />
                      <span>{job.type}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{job.postedAt}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <span className="text-sm font-semibold text-gray-900">
                      {job.salary}
                    </span>
                    {job.remote && (
                      <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 text-xs">
                        Remote
                      </Badge>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}