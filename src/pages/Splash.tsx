import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profile } = await supabase
        .from('profiles')
        .select('onboarding_completed')
        .eq('id', user.id)
        .single();

      if (profile?.onboarding_completed) {
        navigate('/dashboard', { replace: true });
      } else {
        navigate('/onboarding/1', { replace: true });
      }
    };

    checkSession();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full space-y-8 text-center animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="space-y-6">
          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center shadow-xl">
            <span className="text-4xl">👩‍💻</span>
          </div>

          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            TechHerWay
          </h1>

          <p className="text-xl text-gray-700 font-medium">
            Build your tech career, your way.
          </p>
        </div>

        <div className="space-y-3">
          <Button
            onClick={() => navigate('/signup')}
            className="w-full h-14 text-lg rounded-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Commencer <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button
            onClick={() => navigate('/login')}
            variant="outline"
            className="w-full h-12 rounded-full border-2 border-purple-200 text-purple-700 hover:bg-purple-50"
          >
            Déjà un compte ? Se connecter
          </Button>
        </div>
      </div>
    </div>
  );
}
