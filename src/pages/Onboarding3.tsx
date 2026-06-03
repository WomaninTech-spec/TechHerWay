import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { supabase } from "@/lib/supabase";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ProgressIndicator } from '@/components/ui/progress-indicator';
import { User } from 'lucide-react';

export default function Onboarding3() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [firstName, setFirstName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleNext = async () => {
    if (!firstName) return;
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        const { error } = await supabase
          .from('profiles')
          .upsert({
            id: user.id,
            first_name: firstName,
            updated_at: new Date()
          });

        if (error) throw error;
      }

      navigate('/onboarding/4');
    } catch (error) {
      console.error("Erreur de sauvegarde:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-white to-pink-50 p-6 pb-24">
      <div className="max-w-md mx-auto">
        <ProgressIndicator currentStep={3} totalSteps={4} />

        <div className="mt-12 space-y-8">
          <div className="text-center space-y-2">
            <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <User className="w-8 h-8 text-purple-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              {t('onboarding.step3title')}
            </h1>
            <p className="text-gray-600">
              {t('onboarding.step3subtitle')}
            </p>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <Input
                type="text"
                placeholder={t('onboarding.step3placeholder')}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="h-14 text-lg border-2 border-purple-100 focus:border-purple-500 rounded-xl px-4"
              />
            </div>
          </div>

          <Button
            onClick={handleNext}
            disabled={!firstName || loading}
            className="w-full h-14 text-lg rounded-full bg-linear-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 shadow-lg transition-all"
          >
            {loading ? t('onboarding.loading') : t('onboarding.continue')}
          </Button>
        </div>
      </div>
    </div>
  );
}
