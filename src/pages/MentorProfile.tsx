import { useNavigate, useParams } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BottomNav } from '@/components/ui/bottom-nav';
import { ArrowLeft, Star, Calendar, Award, Users } from 'lucide-react';

export default function MentorProfile() {
  const navigate = useNavigate();
  const { id } = useParams();

  const mentor = {
    name: 'Amélie Dubois',
    role: 'Senior Developer',
    company: 'Tech Startup Paris',
    expertise: ['React', 'JavaScript', 'Node.js', 'TypeScript', 'MongoDB'],
    experience: '8 ans d\'expérience',
    rating: 4.9,
    sessions: 156,
    image: 'https://mgx-backend-cdn.metadl.com/generate/images/898311/2026-01-12/f7a4ed0f-a285-443c-b1df-21becd2ce955.png',
    bio: 'Passionnée par le développement web, j\'ai fait ma reconversion il y a 8 ans. Aujourd\'hui, je suis Senior Developer et j\'adore accompagner les femmes dans leur transition vers la tech. Mon objectif : vous aider à gagner en confiance et en compétences techniques.',
    specialties: [
      'Reconversion professionnelle',
      'Préparation entretiens',
      'Code review',
      'Architecture frontend',
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 pb-24">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-6 shadow-lg">
          <Button
            variant="ghost"
            onClick={() => navigate('/mentors')}
            className="text-white hover:bg-white/20 mb-4 -ml-2"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Profile Card */}
          <Card className="p-6 border-2 border-purple-200 shadow-lg">
            <div className="flex flex-col items-center text-center space-y-4">
              <img
                src={mentor.image}
                alt={mentor.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {mentor.name}
                </h1>
                <p className="text-gray-600 font-medium">{mentor.role}</p>
                <p className="text-sm text-gray-500">{mentor.company}</p>
              </div>

              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{mentor.rating}</span>
                </div>
                <span className="text-gray-400">•</span>
                <div className="flex items-center gap-1">
                  <Users className="w-5 h-5 text-purple-600" />
                  <span className="font-semibold">{mentor.sessions} sessions</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Bio */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              À propos
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {mentor.bio}
            </p>
          </Card>

          {/* Expertise */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              Compétences
            </h2>
            <div className="flex flex-wrap gap-2">
              {mentor.expertise.map((skill) => (
                <Badge
                  key={skill}
                  className="bg-purple-100 text-purple-700 hover:bg-purple-100 text-sm py-1.5 px-3"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </Card>

          {/* Specialties */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-600" />
              Spécialités
            </h2>
            <ul className="space-y-2">
              {mentor.specialties.map((specialty) => (
                <li key={specialty} className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">✓</span>
                  <span className="text-gray-700">{specialty}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* CTA Buttons */}
          <div className="space-y-3">
            <Button
              className="w-full h-14 text-lg rounded-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-lg"
              onClick={() => {}}
            >
              <Calendar className="mr-2 w-5 h-5" />
              Essai gratuit (30 min)
            </Button>
            <Button
              variant="outline"
              className="w-full h-14 text-lg rounded-full border-2 border-purple-500 text-purple-700 hover:bg-purple-50"
              onClick={() => navigate('/premium')}
            >
              Session Premium (1h)
            </Button>
          </div>

          <p className="text-center text-sm text-gray-500">
            Les sessions premium nécessitent un abonnement
          </p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}