import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { BottomNav } from '@/components/ui/bottom-nav';
import { Crown, Target, Award, TrendingUp, Settings } from 'lucide-react';

export default function Profile() {
  const navigate = useNavigate();

  const badges = [
    { id: 1, name: 'Première étape', icon: '🎯', earned: true },
    { id: 2, name: '10 ressources', icon: '📚', earned: true },
    { id: 3, name: 'Membre actif', icon: '💬', earned: true },
    { id: 4, name: 'Premier projet', icon: '🚀', earned: false },
    { id: 5, name: 'Mentor connecté', icon: '🤝', earned: false },
    { id: 6, name: '50% parcours', icon: '⭐', earned: false },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 pb-24">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-white">
              Mon Profil
            </h1>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
            >
              <Settings className="w-6 h-6" />
            </Button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Profile Card */}
          <Card className="p-6 border-2 border-purple-200 shadow-lg">
            <div className="flex flex-col items-center text-center space-y-4">
              <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                <AvatarFallback className="bg-gradient-to-br from-purple-400 to-pink-400 text-white text-3xl font-bold">
                  S
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Sarah Dupont
                </h2>
                <p className="text-gray-600">sarah.dupont@email.com</p>
              </div>
              <Badge className="bg-gray-200 text-gray-700 hover:bg-gray-200 text-sm py-1.5 px-4">
                Compte Gratuit
              </Badge>
            </div>
          </Card>

          {/* Current Objective */}
          <Card className="p-6">
            <div className="flex items-start gap-3">
              <div className="p-3 rounded-full bg-purple-100">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Objectif actuel
                </h3>
                <p className="text-gray-700">
                  Devenir Développeuse Web
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  En reconversion • 5-10h par semaine
                </p>
              </div>
            </div>
          </Card>

          {/* Progress Summary */}
          <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-6 h-6 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Ma progression
              </h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Parcours complété</span>
                <span className="font-bold text-purple-600">35%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Ressources terminées</span>
                <span className="font-bold text-purple-600">12/34</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Jours actifs</span>
                <span className="font-bold text-purple-600">18</span>
              </div>
            </div>
          </Card>

          {/* Badges */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Award className="w-6 h-6 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Mes badges
              </h3>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {badges.map((badge) => (
                <div
                  key={badge.id}
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all ${
                    badge.earned
                      ? 'bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200'
                      : 'bg-gray-100 opacity-50'
                  }`}
                >
                  <span className="text-3xl">{badge.icon}</span>
                  <span className={`text-xs text-center font-medium ${
                    badge.earned ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    {badge.name}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Premium CTA */}
          <Card className="p-6 bg-gradient-to-br from-purple-600 to-pink-500 text-white border-0 shadow-xl">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Crown className="w-8 h-8" />
                <h3 className="text-xl font-bold">
                  Passe Premium
                </h3>
              </div>
              <p className="text-purple-100">
                Accède au mentorat, aux groupes avancés et aux ateliers live pour accélérer ta carrière tech.
              </p>
              <Button
                onClick={() => navigate('/premium')}
                className="w-full h-12 bg-white text-purple-700 hover:bg-gray-100 font-semibold rounded-full"
              >
                Découvrir Premium
              </Button>
            </div>
          </Card>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}