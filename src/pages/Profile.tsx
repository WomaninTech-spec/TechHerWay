import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { BottomNav } from '@/components/ui/bottom-nav';
import { Crown, Target, Award, TrendingUp, LogOut } from 'lucide-react';

const SITUATION_LABELS: Record<string, string> = {
  reconversion: 'En reconversion',
  debutante: 'Débutante en tech',
  travaille: 'Travaille dans la tech',
  mentor: 'Mentor',
};

const AVAILABILITY_LABELS: Record<string, string> = {
  less5: 'Moins de 5h/semaine',
  '5-10': '5–10h par semaine',
  '10-20': '10–20h par semaine',
  more20: 'Plus de 20h/semaine',
};

interface Profile {
  first_name: string | null;
  situation: string | null;
  availability: string | null;
}

const badges = [
  { id: 1, name: 'Première étape', icon: '🎯', earned: true },
  { id: 2, name: '10 ressources', icon: '📚', earned: true },
  { id: 3, name: 'Membre actif', icon: '💬', earned: true },
  { id: 4, name: 'Premier projet', icon: '🚀', earned: false },
  { id: 5, name: 'Mentor connecté', icon: '🤝', earned: false },
  { id: 6, name: '50% parcours', icon: '⭐', earned: false },
];

export default function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { navigate('/login'); return; }

      setEmail(user.email ?? '');

      const { data } = await supabase
        .from('profiles')
        .select('first_name, situation, availability')
        .eq('id', user.id)
        .single();

      setProfile(data);
      setLoading(false);
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const initials = profile?.first_name
    ? profile.first_name.charAt(0).toUpperCase()
    : email.charAt(0).toUpperCase();

  const displayName = profile?.first_name ?? email.split('@')[0];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="w-10 h-10 rounded-full border-4 border-purple-200 border-t-purple-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 pb-24">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-white">Mon Profil</h1>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="text-white hover:bg-white/20"
              title="Se déconnecter"
            >
              <LogOut className="w-6 h-6" />
            </Button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Profile Card */}
          <Card className="p-6 border-2 border-purple-200 shadow-lg">
            <div className="flex flex-col items-center text-center space-y-4">
              <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                <AvatarFallback className="bg-gradient-to-br from-purple-400 to-pink-400 text-white text-3xl font-bold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 capitalize">{displayName}</h2>
                <p className="text-gray-600">{email}</p>
              </div>
              <Badge className="bg-gray-200 text-gray-700 hover:bg-gray-200 text-sm py-1.5 px-4">
                Compte Gratuit
              </Badge>
            </div>
          </Card>

          {/* Situation */}
          {profile?.situation && (
            <Card className="p-6">
              <div className="flex items-start gap-3">
                <div className="p-3 rounded-full bg-purple-100">
                  <Target className="w-6 h-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Situation actuelle</h3>
                  <p className="text-gray-700">
                    {SITUATION_LABELS[profile.situation] ?? profile.situation}
                  </p>
                  {profile.availability && (
                    <p className="text-sm text-gray-500 mt-1">
                      {AVAILABILITY_LABELS[profile.availability] ?? profile.availability}
                    </p>
                  )}
                </div>
              </div>
            </Card>
          )}

          {/* Progress */}
          <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-6 h-6 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-900">Ma progression</h3>
            </div>
            <div className="space-y-3">
              {[
                { label: 'Parcours complété', value: '35%' },
                { label: 'Ressources terminées', value: '12/34' },
                { label: 'Jours actifs', value: '18' },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <span className="text-gray-700">{item.label}</span>
                  <span className="font-bold text-purple-600">{item.value}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Badges */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Award className="w-6 h-6 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-900">Mes badges</h3>
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
                  <span className={`text-xs text-center font-medium ${badge.earned ? 'text-gray-900' : 'text-gray-500'}`}>
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
                <h3 className="text-xl font-bold">Passe Premium</h3>
              </div>
              <p className="text-purple-100">
                Accède au mentorat, aux groupes avancés et aux ateliers live pour accélérer ta carrière tech.
              </p>
              <Button
                onClick={() => navigate('/premium')}
                className="w-full h-12 bg-white text-purple-700 hover:bg-gray-100 font-semibold rounded-full border-0"
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
