import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { supabase } from "@/lib/supabase";
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ProgressIndicator } from '@/components/ui/progress-indicator';
import { GraduationCap, Rocket, Briefcase, Heart } from 'lucide-react';

export default function Onboarding1() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [selected, setSelected] = useState<string>('');

  const handleSaveSituation = async (situationId: string) => {
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          situation: situationId,
          updated_at: new Date()
        });

      if (error) console.error("Erreur d'enregistrement:", error);
    }

    navigate('/onboarding/2');
  };

  const situations = [
    { id: 'reconversion', label: t('onboarding.sit_reconversion'), icon: GraduationCap },
    { id: 'debutante', label: t('onboarding.sit_debutante'), icon: Rocket },
    { id: 'travaille', label: t('onboarding.sit_travaille'), icon: Briefcase },
    { id: 'mentor', label: t('onboarding.sit_mentor'), icon: Heart },
  ];

  const handleNext = () => {
    if (selected) {
      handleSaveSituation(selected);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-white to-pink-50 p-6 pb-24">
      <div className="max-w-md mx-auto">
        <ProgressIndicator currentStep={1} totalSteps={4} />

        <div className="mt-8 space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">
              {t('onboarding.step1title')}
            </h1>
            <p className="text-gray-600">
              {t('onboarding.step1subtitle')}
            </p>
          </div>

          <div className="space-y-4">
            {situations.map((situation) => {
              const Icon = situation.icon;
              return (
                <Card
                  key={situation.id}
                  onClick={() => setSelected(situation.id)}
                  className={`p-6 cursor-pointer transition-all duration-200 ${
                    selected === situation.id
                      ? 'border-2 border-purple-500 bg-purple-50 shadow-lg'
                      : 'border border-gray-200 hover:border-purple-300 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full ${
                      selected === situation.id
                        ? 'bg-linear-to-r from-purple-600 to-pink-500'
                        : 'bg-gray-100'
                    }`}>
                      <Icon className={`w-6 h-6 ${
                        selected === situation.id ? 'text-white' : 'text-gray-600'
                      }`} />
                    </div>
                    <span className={`text-lg font-medium ${
                      selected === situation.id ? 'text-purple-700' : 'text-gray-700'
                    }`}>
                      {situation.label}
                    </span>
                  </div>
                </Card>
              );
            })}
          </div>

          <Button
            onClick={handleNext}
            disabled={!selected}
            className="w-full h-14 text-lg rounded-full bg-linear-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            {t('onboarding.continue')}
          </Button>
        </div>
      </div>
    </div>
  );
}
