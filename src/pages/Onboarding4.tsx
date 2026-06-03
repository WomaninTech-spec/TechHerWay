import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { supabase } from "@/lib/supabase";
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ProgressIndicator } from '@/components/ui/progress-indicator';
import { Clock } from 'lucide-react';

export default function Onboarding4() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [selected, setSelected] = useState<string>('');

  const handleFinish = async () => {
    if (!selected) return;

    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          availability: selected,
          onboarding_completed: true,
          updated_at: new Date()
        });
    }

    navigate('/dashboard');
  };

  const timeRanges = [
    { id: 'less5', label: '< 5h', description: t('onboarding.time_less5') },
    { id: '5-10', label: '5–10h', description: t('onboarding.time_5-10') },
    { id: '10-20', label: '10–20h', description: t('onboarding.time_10-20') },
    { id: 'more20', label: '+20h', description: t('onboarding.time_more20') },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-white to-pink-50 p-6 pb-24">
      <div className="max-w-md mx-auto">
        <ProgressIndicator currentStep={4} totalSteps={4} />

        <div className="mt-8 space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">
              {t('onboarding.step4title')}
            </h1>
            <p className="text-gray-600">{t('onboarding.step4subtitle')}</p>
          </div>

          <div className="space-y-4">
            {timeRanges.map((range) => {
              const isSelected = selected === range.id;
              return (
                <Card
                  key={range.id}
                  onClick={() => setSelected(range.id)}
                  className={`p-6 cursor-pointer transition-all duration-200 ${
                    isSelected
                      ? 'border-2 border-purple-500 bg-purple-50 shadow-lg'
                      : 'border border-gray-200 hover:border-purple-300 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full ${
                      isSelected ? 'bg-linear-to-r from-purple-600 to-pink-500' : 'bg-gray-100'
                    }`}>
                      <Clock className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-gray-600'}`} />
                    </div>
                    <div className="flex-1">
                      <div className={`text-xl font-bold ${isSelected ? 'text-purple-700' : 'text-gray-900'}`}>
                        {range.label}
                      </div>
                      <div className="text-sm text-gray-600">{range.description}</div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          <Button
            onClick={handleFinish}
            disabled={!selected}
            className="w-full h-14 text-lg rounded-full bg-linear-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            {t('onboarding.finish')}
          </Button>
        </div>
      </div>
    </div>
  );
}
