import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/lib/supabase";
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { BottomNav } from '@/components/ui/bottom-nav';
import { ArrowRight, Users, Briefcase, Sparkles } from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();
  
  // 1. Déclaration de l'état (le prénom)
  const [userName, setUserName] = useState("Elise"); // "Elise" par défaut le temps du chargement

  // 2. Récupération des données depuis Supabase
  useEffect(() => {
    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('first_name')
        .single();
      
      if (data && !error) {
        setUserName(data.first_name);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-white to-pink-50 pb-24">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="bg-linear-to-r from-purple-600 to-pink-500 p-6 rounded-b-3xl shadow-lg">
          <h1 className="text-2xl font-bold text-white mb-2">
            {/* 3. Utilisation de la variable dynamique ici ! */}
            Bonjour, {userName} ! 👋
          </h1>
          <p className="text-purple-100">
            Prête à continuer ton parcours ?
          </p>
        </div>

        <div className="p-6 space-y-6">
          {/* Progress Section */}
          <Card className="p-6 border-2 border-purple-200 bg-white shadow-lg">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                  Ta progression
                </h2>
                <span className="text-2xl font-bold bg-linear-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                  35%
                </span>
              </div>
              <Progress value={35} className="h-3" />
              <p className="text-sm text-gray-600">
                Continue comme ça ! Tu es sur la bonne voie 🚀
              </p>
            </div>
          </Card>

          {/* Next Step Card */}
          <Card className="p-6 bg-linear-to-br from-purple-50 to-pink-50 border-2 border-purple-300 shadow-lg">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-600" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Prochaine étape
                </h3>
              </div>
              <p className="text-base text-gray-700 font-medium">
                Découvrir les bases HTML
              </p>
              <Button
                onClick={() => navigate('/career-path')}
                className="w-full h-12 rounded-full bg-linear-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 shadow-md"
              >
                Commencer
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </Card>

          {/* Mentor Block */}
          <Card
            onClick={() => navigate('/mentors')}
            className="p-6 cursor-pointer hover:shadow-xl transition-shadow border border-gray-200"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-linear-to-br from-purple-100 to-pink-100">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">
                  Trouver une mentor
                </h3>
                <p className="text-sm text-gray-600">
                  Bénéficie d'un accompagnement personnalisé
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400" />
            </div>
          </Card>

          {/* Community Block */}
          <Card
            onClick={() => navigate('/community')}
            className="p-6 cursor-pointer hover:shadow-xl transition-shadow border border-gray-200"
          >
            <div className="flex items-center gap-4">
              <img
                src="https://mgx-backend-cdn.metadl.com/generate/images/898311/2026-01-12/64da8937-e973-4ff3-a22c-85cab9a6efdb.png"
                alt="Community"
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">
                  Communauté
                </h3>
                <p className="text-sm text-purple-600 font-medium">
                  3 discussions actives
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400" />
            </div>
          </Card>

          {/* Jobs Block */}
          <Card
            onClick={() => navigate('/jobs')}
            className="p-6 cursor-pointer hover:shadow-xl transition-shadow border border-gray-200"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-linear-to-br from-green-100 to-emerald-100">
                <Briefcase className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">
                  Opportunités
                </h3>
                <p className="text-sm text-green-600 font-medium">
                  2 offres adaptées à ton profil
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400" />
            </div>
          </Card>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}