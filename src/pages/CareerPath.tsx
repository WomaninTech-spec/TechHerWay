import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { BottomNav } from '@/components/ui/bottom-nav';
import { ChevronDown, ChevronUp, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function CareerPath() {
  const navigate = useNavigate();
  const [expandedStep, setExpandedStep] = useState<number | null>(0);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const steps = [
    {
      title: 'Étape 1 : Bases',
      items: [
        'Comprendre HTML et structure web',
        'Apprendre CSS et mise en page',
        'Introduction à JavaScript',
        'Créer ta première page web',
      ],
    },
    {
      title: 'Étape 2 : Projet simple',
      items: [
        'Concevoir un portfolio personnel',
        'Utiliser Git et GitHub',
        'Responsive design avec CSS',
        'Déployer ton site en ligne',
      ],
    },
    {
      title: 'Étape 3 : Approfondissement',
      items: [
        'Frameworks JavaScript (React)',
        'APIs et données dynamiques',
        'Bases de données',
        'Projet web interactif',
      ],
    },
    {
      title: 'Étape 4 : Préparation emploi',
      items: [
        'Optimiser ton portfolio',
        'Préparer ton CV tech',
        'Entretiens techniques',
        'Networking et candidatures',
      ],
    },
  ];

  const toggleStep = (index: number) => {
    setExpandedStep(expandedStep === index ? null : index);
  };

  const toggleItem = (stepIndex: number, itemIndex: number) => {
    const key = `${stepIndex}-${itemIndex}`;
    setCheckedItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const getStepProgress = (stepIndex: number) => {
    const items = steps[stepIndex].items;
    const checked = items.filter((_, i) => checkedItems[`${stepIndex}-${i}`]).length;
    return Math.round((checked / items.length) * 100);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-white to-pink-50 pb-24">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="bg-linear-to-r from-purple-600 to-pink-500 p-6 shadow-lg">
          <Button
            variant="ghost"
            onClick={() => navigate('/dashboard')}
            className="text-white hover:bg-white/20 mb-4 -ml-2"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour
          </Button>
          <h1 className="text-2xl font-bold text-white">
            Parcours Développeuse Web
          </h1>
          <p className="text-purple-100 mt-2">
            Suis ton chemin vers ton premier job tech
          </p>
        </div>

        <div className="p-6 space-y-4">
          {steps.map((step, stepIndex) => {
            const isExpanded = expandedStep === stepIndex;
            const progress = getStepProgress(stepIndex);
            const isCompleted = progress === 100;

            return (
              <Card key={stepIndex} className="overflow-hidden border-2 border-gray-200 shadow-md">
                <div
                  onClick={() => toggleStep(stepIndex)}
                  className="p-5 cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      {isCompleted ? (
                        <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0" />
                      ) : (
                        <div className="w-6 h-6 rounded-full border-2 border-purple-500 flex items-center justify-center shrink-0">
                          <span className="text-xs font-bold text-purple-600">
                            {stepIndex + 1}
                          </span>
                        </div>
                      )}
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {step.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-linear-to-r from-purple-600 to-pink-500 transition-all duration-300"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium text-gray-600">
                            {progress}%
                          </span>
                        </div>
                      </div>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-gray-400 shrink-0 ml-2" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400 shrink-0 ml-2" />
                    )}
                  </div>
                </div>

                {isExpanded && (
                  <div className="px-5 pb-5 space-y-3 border-t border-gray-100 pt-4">
                    {step.items.map((item, itemIndex) => {
                      const key = `${stepIndex}-${itemIndex}`;
                      const isChecked = checkedItems[key];

                      return (
                        <div
                          key={itemIndex}
                          onClick={() => toggleItem(stepIndex, itemIndex)}
                          className="flex items-start gap-3 p-3 rounded-lg hover:bg-purple-50 cursor-pointer transition-colors"
                        >
                          <Checkbox
                            checked={isChecked}
                            className="mt-0.5"
                          />
                          <span
                            className={`text-base ${
                              isChecked
                                ? 'line-through text-gray-500'
                                : 'text-gray-700'
                            }`}
                          >
                            {item}
                          </span>
                        </div>
                      );
                    })}
                    <Button
                      onClick={() => navigate('/resource')}
                      variant="outline"
                      className="w-full mt-4 border-purple-300 text-purple-700 hover:bg-purple-50"
                    >
                      Voir les ressources
                    </Button>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}