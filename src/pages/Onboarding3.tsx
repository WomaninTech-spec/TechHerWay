import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ProgressIndicator } from '@/components/ui/progress-indicator';
import { Code, Database, Layers, Palette } from 'lucide-react';

export default function Onboarding3() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string>('');

  const roles = [
    { id: 'dev', label: 'Développeuse web', icon: Code, color: 'from-blue-500 to-cyan-500' },
    { id: 'data', label: 'Data analyst', icon: Database, color: 'from-green-500 to-emerald-500' },
    { id: 'product', label: 'Product manager', icon: Layers, color: 'from-orange-500 to-amber-500' },
    { id: 'ux', label: 'UX/UI designer', icon: Palette, color: 'from-pink-500 to-rose-500' },
  ];

  const handleNext = () => {
    if (selected) {
      navigate('/onboarding/4');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 p-6 pb-24">
      <div className="max-w-md mx-auto">
        <ProgressIndicator currentStep={3} totalSteps={4} />
        
        <div className="mt-8 space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">
              Quel métier vises-tu ?
            </h1>
            <p className="text-sm text-gray-500">
              Tu pourras changer plus tard
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {roles.map((role) => {
              const Icon = role.icon;
              const isSelected = selected === role.id;
              
              return (
                <Card
                  key={role.id}
                  onClick={() => setSelected(role.id)}
                  className={`p-6 cursor-pointer transition-all duration-200 ${
                    isSelected
                      ? 'border-2 border-purple-500 shadow-lg scale-105'
                      : 'border border-gray-200 hover:border-purple-300 hover:shadow-md'
                  }`}
                >
                  <div className="flex flex-col items-center gap-4 text-center">
                    <div className={`p-4 rounded-2xl bg-gradient-to-br ${
                      isSelected ? role.color : 'from-gray-100 to-gray-200'
                    }`}>
                      <Icon className={`w-8 h-8 ${
                        isSelected ? 'text-white' : 'text-gray-600'
                      }`} />
                    </div>
                    <span className={`text-base font-semibold ${
                      isSelected ? 'text-purple-700' : 'text-gray-700'
                    }`}>
                      {role.label}
                    </span>
                  </div>
                </Card>
              );
            })}
          </div>

          <Button
            onClick={handleNext}
            disabled={!selected}
            className="w-full h-14 text-lg rounded-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            Continuer
          </Button>
        </div>
      </div>
    </div>
  );
}