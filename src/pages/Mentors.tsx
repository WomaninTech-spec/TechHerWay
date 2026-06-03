import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BottomNav } from '@/components/ui/bottom-nav';
import { ArrowLeft, Star, Calendar } from 'lucide-react';

export default function Mentors() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const mentors = [
    {
      id: 1,
      name: 'Amélie Dubois',
      role: 'Senior Developer',
      expertise: ['React', 'JavaScript', 'Node.js'],
      experience: t('mentors.experience', { years: 8 }),
      rating: 4.9,
      sessions: 156,
      available: true,
      image: 'https://mgx-backend-cdn.metadl.com/generate/images/898311/2026-01-12/f7a4ed0f-a285-443c-b1df-21becd2ce955.png',
    },
    {
      id: 2,
      name: 'Sophie Martin',
      role: 'Lead Data Analyst',
      expertise: ['Python', 'SQL', 'Data Viz'],
      experience: t('mentors.experience', { years: 6 }),
      rating: 4.8,
      sessions: 98,
      available: true,
      image: 'https://mgx-backend-cdn.metadl.com/generate/images/898311/2026-01-12/a666d45c-6345-4617-bb0a-bc7ba8189be2.png',
    },
    {
      id: 3,
      name: 'Laura Chen',
      role: 'Product Manager',
      expertise: ['Product', 'Agile', 'UX'],
      experience: t('mentors.experience', { years: 5 }),
      rating: 4.7,
      sessions: 72,
      available: false,
      image: 'https://mgx-backend-cdn.metadl.com/generate/images/898311/2026-01-12/3b323de1-c132-4470-b41e-48d82ec04839.png',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 pb-24">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-6 shadow-lg">
          <Button
            variant="ghost"
            onClick={() => navigate('/dashboard')}
            className="text-white hover:bg-white/20 mb-4 -ml-2"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            {t('mentors.back')}
          </Button>
          <h1 className="text-2xl font-bold text-white mb-2">
            {t('mentors.title')}
          </h1>
          <p className="text-purple-100">
            {t('mentors.subtitle')}
          </p>
        </div>

        <div className="p-6 space-y-6">
          {/* Intro Card */}
          <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {t('mentors.whyTitle')}
            </h3>
            <ul className="space-y-2">
              {[0, 1, 2].map((i) => (
                <li key={i} className="flex items-start gap-2 text-gray-700">
                  <span className="text-purple-600 mt-1">✓</span>
                  <span>{t(`mentors.benefit${i}`)}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Mentors List */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900">
              {t('mentors.availableTitle')}
            </h2>

            {mentors.map((mentor) => (
              <Card
                key={mentor.id}
                className="overflow-hidden border border-gray-200 hover:shadow-xl transition-all cursor-pointer"
                onClick={() => navigate(`/mentor/${mentor.id}`)}
              >
                <div className="flex gap-4 p-5">
                  <img
                    src={mentor.image}
                    alt={mentor.name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <div className="flex-1 space-y-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {mentor.name}
                      </h3>
                      <p className="text-sm text-gray-600">{mentor.role}</p>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {mentor.expertise.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="text-xs bg-purple-100 text-purple-700 hover:bg-purple-100"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{mentor.rating}</span>
                      </div>
                      <span>•</span>
                      <span>{mentor.sessions} sessions</span>
                    </div>

                    {mentor.available ? (
                      <div className="flex items-center gap-1.5 text-green-600 text-sm font-medium">
                        <Calendar className="w-4 h-4" />
                        <span>{t('mentors.availableNow')}</span>
                      </div>
                    ) : (
                      <div className="text-gray-500 text-sm">
                        {t('mentors.nextAvail')}
                      </div>
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
