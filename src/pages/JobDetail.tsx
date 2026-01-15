import { useNavigate, useParams } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BottomNav } from '@/components/ui/bottom-nav';
import { ArrowLeft, MapPin, Clock, DollarSign, ExternalLink } from 'lucide-react';

export default function JobDetail() {
  const navigate = useNavigate();
  const { id: _id } = useParams();

  const job = {
    title: 'Développeuse Web Junior',
    company: 'TechStart Paris',
    location: 'Paris',
    type: 'CDI',
    remote: true,
    stack: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Git'],
    level: 'Junior',
    postedAt: 'Il y a 2 jours',
    salary: '35-45k€',
    description: 'TechStart Paris recherche une développeuse web junior passionnée pour rejoindre notre équipe dynamique. Vous travaillerez sur des projets innovants dans un environnement bienveillant et formateur.',
    responsibilities: [
      'Développer de nouvelles fonctionnalités frontend avec React',
      'Participer aux code reviews et améliorer la qualité du code',
      'Collaborer avec l\'équipe design et product',
      'Maintenir et optimiser les applications existantes',
    ],
    requirements: [
      'Formation en développement web (bootcamp, autodidacte, ou diplôme)',
      'Connaissance de React et JavaScript',
      'Première expérience en développement (stage, projets perso)',
      'Curiosité et envie d\'apprendre',
      'Bon esprit d\'équipe',
    ],
    benefits: [
      'Télétravail flexible (2-3 jours/semaine)',
      'Budget formation 1000€/an',
      'Mentorat par des seniors',
      'Mutuelle prise en charge à 100%',
      'Tickets restaurant',
      'Ambiance startup conviviale',
    ],
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-white to-pink-50 pb-24">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="bg-linear-to-r from-purple-600 to-pink-500 p-6 shadow-lg">
          <Button
            variant="ghost"
            onClick={() => navigate('/jobs')}
            className="text-white hover:bg-white/20 mb-4 -ml-2"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Job Header */}
          <Card className="p-6 border-2 border-purple-200 shadow-lg">
            <div className="space-y-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {job.title}
                </h1>
                <p className="text-lg text-gray-700 font-medium">
                  {job.company}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                  {job.level}
                </Badge>
                {job.remote && (
                  <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                    Remote
                  </Badge>
                )}
                <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100">
                  {job.type}
                </Badge>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  <span>{job.salary}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Publié {job.postedAt}</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Stack */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              Stack technique
            </h2>
            <div className="flex flex-wrap gap-2">
              {job.stack.map((tech) => (
                <Badge
                  key={tech}
                  className="bg-purple-100 text-purple-700 hover:bg-purple-100 text-sm py-1.5 px-3"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </Card>

          {/* Description */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              Description
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {job.description}
            </p>
          </Card>

          {/* Responsibilities */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              Missions
            </h2>
            <ul className="space-y-2">
              {job.responsibilities.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Requirements */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              Profil recherché
            </h2>
            <ul className="space-y-2">
              {job.requirements.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">✓</span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Benefits */}
          <Card className="p-6 bg-linear-to-br from-purple-50 to-pink-50 border-2 border-purple-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              Avantages
            </h2>
            <ul className="space-y-2">
              {job.benefits.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">🎁</span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Apply Button */}
          <Button
            className="w-full h-14 text-lg rounded-full bg-linear-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 shadow-lg"
            onClick={() => {}}
          >
            Postuler maintenant
            <ExternalLink className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}