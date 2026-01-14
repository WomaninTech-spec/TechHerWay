import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BottomNav } from '@/components/ui/bottom-nav';
import { Users, MessageCircle, Plus } from 'lucide-react';

export default function Community() {
  const navigate = useNavigate();

  const groups = [
    {
      id: 1,
      name: 'Reconversion Dev Web',
      members: 234,
      activeDiscussions: 12,
      description: 'Groupe pour celles qui se reconvertissent vers le développement web',
      joined: true,
    },
    {
      id: 2,
      name: 'Objectif Job 6 mois',
      members: 189,
      activeDiscussions: 8,
      description: 'Trouver son premier job tech en 6 mois',
      joined: true,
    },
    {
      id: 3,
      name: 'Data Analysts Débutantes',
      members: 156,
      activeDiscussions: 5,
      description: 'Apprendre la data analysis ensemble',
      joined: false,
    },
    {
      id: 4,
      name: 'Mamans dans la Tech',
      members: 312,
      activeDiscussions: 15,
      description: 'Concilier maternité et carrière tech',
      joined: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 pb-24">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-6 shadow-lg">
          <h1 className="text-2xl font-bold text-white mb-2">
            Communauté
          </h1>
          <p className="text-purple-100">
            Connecte-toi avec d'autres femmes tech
          </p>
        </div>

        <div className="p-6 space-y-6">
          {/* Hero Image */}
          <Card className="overflow-hidden border-2 border-purple-200">
            <img
              src="https://mgx-backend-cdn.metadl.com/generate/images/898311/2026-01-12/64da8937-e973-4ff3-a22c-85cab9a6efdb.png"
              alt="Community"
              className="w-full h-48 object-cover"
            />
            <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50">
              <p className="text-center text-gray-700 font-medium">
                Tu n'es pas seule dans ton parcours 💜
              </p>
            </div>
          </Card>

          {/* Groups Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">
                Groupes recommandés
              </h2>
              <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100">
                {groups.filter(g => g.joined).length} rejoints
              </Badge>
            </div>

            {groups.map((group) => (
              <Card
                key={group.id}
                className="p-5 cursor-pointer hover:shadow-xl transition-all border border-gray-200"
                onClick={() => navigate('/group-thread')}
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {group.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {group.description}
                      </p>
                    </div>
                    {group.joined && (
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100 ml-2">
                        Membre
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{group.members} membres</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      <span>{group.activeDiscussions} discussions</span>
                    </div>
                  </div>

                  {!group.joined && (
                    <Button
                      variant="outline"
                      className="w-full border-purple-300 text-purple-700 hover:bg-purple-50"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      Rejoindre
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Floating Action Button */}
        <Button
          className="fixed bottom-24 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 shadow-2xl z-40"
          onClick={() => {}}
        >
          <Plus className="w-6 h-6" />
        </Button>
      </div>

      <BottomNav />
    </div>
  );
}