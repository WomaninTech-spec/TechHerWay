import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// 1. On ajoute l'import Supabase
import { supabase } from "@/lib/supabase"; 
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ProgressIndicator } from '@/components/ui/progress-indicator';
import { Target, TrendingUp, Heart, RefreshCw, Lightbulb } from 'lucide-react';

export default function Onboarding2() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string[]>([]);

  // 2. Fonction pour sauvegarder les objectifs
  const saveObjectives = async () => {
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      const { error } = await supabase
        .from('profiles')
        .upsert({ 
          id: user.id, 
          objectives: selected, // On enregistre le tableau d'objectifs
          updated_at: new Date() 
        });

      if (error) console.error("Erreur lors de la sauvegarde des objectifs:", error);
    }
    
    // On avance à l'étape suivante
    navigate('/onboarding/3');
  };

  const objectives = [
    { id: 'job', label: 'Trouver mon premier job tech', icon: Target },
    { id: 'skills', label: 'Monter en compétences', icon: TrendingUp },
    { id: 'legitimate', label: 'Me sentir légitime et accompagnée', icon: Heart },
    { id: 'change', label: 'Changer de spécialité', icon: RefreshCw },
    { id: 'project', label: 'Construire un projet', icon: Lightbulb },
  ];

  const toggleObjective = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleNext = () => {
    if (selected.length > 0) {
      // 3. On appelle la sauvegarde avant de naviguer
      saveObjectives();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 p-6 pb-24">
      <div className="max-w-md mx-auto">
        <ProgressIndicator currentStep={2} totalSteps={4} />
        
        <div className="mt-8 space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">
              Quel est ton objectif principal ?
            </h1>
            <p className="text-gray-600">Plusieurs choix possibles</p>
          </div>

          <div className="space-y-4">
            {objectives.map((objective) => {
              const Icon = objective.icon;
              const isSelected = selected.includes(objective.id);
              
              return (
                <Card
                  key={objective.id}
                  onClick={() => toggleObjective(objective.id)}
                  className={`p-6 cursor-pointer transition-all duration-200 ${
                    isSelected
                      ? 'border-2 border-purple-500 bg-purple-50 shadow-lg'
                      : 'border border-gray-200 hover:border-purple-300 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full ${
                      isSelected
                        ? 'bg-gradient-to-r from-purple-600 to-pink-500'
                        : 'bg-gray-100'
                    }`}>
                      <Icon className={`w-6 h-6 ${
                        isSelected ? 'text-white' : 'text-gray-600'
                      }`} />
                    </div>
                    <span className={`text-lg font-medium flex-1 ${
                      isSelected ? 'text-purple-700' : 'text-gray-700'
                    }`}>
                      {objective.label}
                    </span>
                    {isSelected && (
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>

          <Button
            onClick={handleNext}
            disabled={selected.length === 0}
            className="w-full h-14 text-lg rounded-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            Continuer
          </Button>
        </div>
      </div>
    </div>
  );
}