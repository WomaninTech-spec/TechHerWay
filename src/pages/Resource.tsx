import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BottomNav } from '@/components/ui/bottom-nav';
import { ArrowLeft, Clock, CheckCircle2 } from 'lucide-react';

export default function Resource() {
  const navigate = useNavigate();
  const [completed, setCompleted] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 pb-24">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-6 shadow-lg">
          <Button
            variant="ghost"
            onClick={() => navigate('/career-path')}
            className="text-white hover:bg-white/20 mb-4 -ml-2"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour
          </Button>
          <h1 className="text-2xl font-bold text-white">
            Ressource
          </h1>
        </div>

        <div className="p-6 space-y-6">
          <Card className="p-6 border-2 border-purple-200 shadow-lg">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100">
                  HTML
                </Badge>
                <Badge className="bg-pink-100 text-pink-700 hover:bg-pink-100">
                  Débutant
                </Badge>
              </div>

              <h2 className="text-2xl font-bold text-gray-900">
                Introduction à HTML : Structure d'une page web
              </h2>

              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-5 h-5" />
                <span className="font-medium">Durée estimée : 2 heures</span>
              </div>
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Pourquoi c'est utile
            </h3>
            <p className="text-gray-700 leading-relaxed">
              HTML est le langage de base du web. Comprendre sa structure est essentiel pour créer n'importe quel site web. 
              Dans cette ressource, tu apprendras :
            </p>
            <ul className="space-y-2 ml-4">
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-1">•</span>
                <span className="text-gray-700">Les balises HTML fondamentales</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-1">•</span>
                <span className="text-gray-700">Comment structurer un document</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-1">•</span>
                <span className="text-gray-700">Les éléments sémantiques</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-1">•</span>
                <span className="text-gray-700">Créer ta première page web fonctionnelle</span>
              </li>
            </ul>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Contenu de la ressource
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                <span className="text-gray-700">📚 Cours vidéo</span>
                <span className="text-sm text-gray-500">45 min</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                <span className="text-gray-700">✍️ Exercices pratiques</span>
                <span className="text-sm text-gray-500">30 min</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                <span className="text-gray-700">🎯 Quiz de validation</span>
                <span className="text-sm text-gray-500">15 min</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                <span className="text-gray-700">🚀 Mini-projet</span>
                <span className="text-sm text-gray-500">30 min</span>
              </div>
            </div>
          </Card>

          {completed ? (
            <Card className="p-6 bg-green-50 border-2 border-green-300">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
                <div>
                  <h3 className="text-lg font-semibold text-green-900">
                    Ressource terminée !
                  </h3>
                  <p className="text-sm text-green-700">
                    Bravo ! Continue sur ta lancée 🎉
                  </p>
                </div>
              </div>
            </Card>
          ) : (
            <Button
              onClick={() => setCompleted(true)}
              className="w-full h-14 text-lg rounded-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 shadow-lg"
            >
              J'ai terminé
            </Button>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}