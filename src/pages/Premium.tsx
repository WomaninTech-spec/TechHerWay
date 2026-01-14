import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BottomNav } from '@/components/ui/bottom-nav';
import { ArrowLeft, Crown, Check, Users, Video, BookOpen, Sparkles } from 'lucide-react';

export default function Premium() {
  const navigate = useNavigate();

  const benefits = [
    {
      icon: Users,
      title: 'Mentorat illimité',
      description: 'Sessions 1-to-1 avec des mentors expérimentées',
    },
    {
      icon: Users,
      title: 'Groupes avancés',
      description: 'Accès aux communautés premium et networking',
    },
    {
      icon: Video,
      title: 'Ateliers live',
      description: 'Workshops techniques et soft skills chaque semaine',
    },
    {
      icon: BookOpen,
      title: 'Contenus exclusifs',
      description: 'Ressources avancées et templates professionnels',
    },
    {
      icon: Sparkles,
      title: 'Priorité support',
      description: 'Réponses rapides à toutes tes questions',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 pb-24">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-6 shadow-lg">
          <Button
            variant="ghost"
            onClick={() => navigate('/profile')}
            className="text-white hover:bg-white/20 mb-4 -ml-2"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour
          </Button>
          <div className="flex items-center gap-3">
            <Crown className="w-8 h-8 text-yellow-300" />
            <h1 className="text-2xl font-bold text-white">
              TechHerWay Premium
            </h1>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Hero Message */}
          <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Tu n'as pas à faire ce chemin seule
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Rejoins des centaines de femmes qui ont accéléré leur carrière tech grâce au mentorat et à une communauté engagée.
            </p>
          </Card>

          {/* Hero Image */}
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img
              src="https://mgx-backend-cdn.metadl.com/generate/images/898311/2026-01-12/2f6bca3c-c852-4b26-9307-19eea808435c.png"
              alt="Women in Tech"
              className="w-full h-48 object-cover"
            />
          </div>

          {/* Benefits */}
          <Card className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Ce que tu obtiens
            </h3>
            <div className="space-y-4">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div key={index} className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-purple-100 to-pink-100 flex-shrink-0">
                      <Icon className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">
                        {benefit.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {benefit.description}
                      </p>
                    </div>
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Pricing */}
          <Card className="p-6 border-2 border-purple-300 shadow-lg">
            <div className="text-center space-y-4">
              <div>
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-5xl font-bold text-gray-900">29€</span>
                  <span className="text-gray-600">/mois</span>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Sans engagement • Annule quand tu veux
                </p>
              </div>

              <div className="space-y-2 py-4">
                <div className="flex items-center justify-center gap-2 text-sm text-gray-700">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Essai gratuit 7 jours</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-700">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Accès immédiat à tout</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-700">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Garantie satisfait ou remboursé</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Testimonial */}
          <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold text-lg">
                  M
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Marie L.</div>
                  <div className="text-sm text-gray-600">Dev Junior chez Startup</div>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Grâce au mentorat Premium, j'ai décroché mon premier job tech en 4 mois. Ma mentor m'a aidée à préparer mes entretiens et à gagner en confiance. Meilleur investissement de ma reconversion !"
              </p>
            </div>
          </Card>

          {/* CTA Button */}
          <Button
            className="w-full h-16 text-lg rounded-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 shadow-2xl"
            onClick={() => {
              // Stripe integration placeholder
              alert('Intégration Stripe à venir');
            }}
          >
            <Crown className="mr-2 w-6 h-6" />
            Devenir Premium
          </Button>

          <p className="text-center text-sm text-gray-500">
            Paiement sécurisé par Stripe • Données cryptées
          </p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}