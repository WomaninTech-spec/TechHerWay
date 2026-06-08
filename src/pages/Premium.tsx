import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { supabase } from '@/lib/supabase';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BottomNav } from '@/components/ui/bottom-nav';
import { ArrowLeft, Crown, Check, Users, Video, BookOpen, Sparkles, Loader2 } from 'lucide-react';

const PRICE_MONTHLY = 'price_1Tg2KyIHm122nKzlstq9JEJY';
const PRICE_ANNUAL = 'price_1Tg2PKIHm122nKzlJElmnNcd';

export default function Premium() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isFr = i18n.language.startsWith('fr');
  const [loading, setLoading] = useState<'monthly' | 'annual' | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'annual'>('annual');

  const benefits = [
    { icon: Users, title: isFr ? 'Mentorat illimité' : 'Unlimited mentoring', description: isFr ? 'Sessions 1:1 avec des mentors expérimentées' : '1:1 sessions with experienced mentors' },
    { icon: Users, title: isFr ? 'Groupes avancés' : 'Advanced groups', description: isFr ? 'Accès aux communautés premium et networking' : 'Access to premium communities and networking' },
    { icon: Video, title: isFr ? 'Ateliers live' : 'Live workshops', description: isFr ? 'Workshops techniques et soft skills chaque semaine' : 'Technical and soft skills workshops every week' },
    { icon: BookOpen, title: isFr ? 'Contenus exclusifs' : 'Exclusive content', description: isFr ? 'Ressources avancées et templates professionnels' : 'Advanced resources and professional templates' },
    { icon: Sparkles, title: isFr ? 'Priorité support' : 'Priority support', description: isFr ? 'Réponses rapides à toutes tes questions' : 'Fast answers to all your questions' },
  ];

  const handleSubscribe = async (plan: 'monthly' | 'annual') => {
    setLoading(plan);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      const priceId = plan === 'monthly' ? PRICE_MONTHLY : PRICE_ANNUAL;

      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId, email: user?.email }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(null);
    }
  };

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
            {isFr ? 'Retour' : 'Back'}
          </Button>
          <div className="flex items-center gap-3">
            <Crown className="w-8 h-8 text-yellow-300" />
            <h1 className="text-2xl font-bold text-white">TechHerWay Premium</h1>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Hero Message */}
          <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              {isFr ? 'Tu n\'as pas à faire ce chemin seule' : 'You don\'t have to do this alone'}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {isFr
                ? 'Rejoins des centaines de femmes qui ont accéléré leur carrière tech grâce au mentorat et à une communauté engagée.'
                : 'Join hundreds of women who accelerated their tech career through mentoring and an engaged community.'}
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
              {isFr ? 'Ce que tu obtiens' : 'What you get'}
            </h3>
            <div className="space-y-4">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div key={index} className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-purple-100 to-pink-100 shrink-0">
                      <Icon className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">{benefit.title}</h4>
                      <p className="text-sm text-gray-600">{benefit.description}</p>
                    </div>
                    <Check className="w-5 h-5 text-green-500 shrink-0 mt-1" />
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Pricing toggle */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-gray-900 text-center">
              {isFr ? 'Choisis ton plan' : 'Choose your plan'}
            </h3>

            {/* Annual plan */}
            <Card
              onClick={() => setSelectedPlan('annual')}
              className={`p-5 cursor-pointer transition-all relative ${
                selectedPlan === 'annual'
                  ? 'border-2 border-purple-500 bg-purple-50 shadow-lg'
                  : 'border border-gray-200 hover:border-purple-300'
              }`}
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-gradient-to-r from-purple-600 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  {isFr ? '⭐ Meilleur prix' : '⭐ Best value'}
                </span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div>
                  <div className="font-bold text-gray-900">{isFr ? 'Annuel' : 'Annual'}</div>
                  <div className="text-sm text-green-600 font-medium">
                    {isFr ? '2 mois offerts · Économise 32%' : '2 months free · Save 32%'}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">63,99€</div>
                  <div className="text-sm text-gray-500">{isFr ? '5,33€/mois' : '5.33€/mo'}</div>
                </div>
              </div>
            </Card>

            {/* Monthly plan */}
            <Card
              onClick={() => setSelectedPlan('monthly')}
              className={`p-5 cursor-pointer transition-all ${
                selectedPlan === 'monthly'
                  ? 'border-2 border-purple-500 bg-purple-50 shadow-lg'
                  : 'border border-gray-200 hover:border-purple-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-gray-900">{isFr ? 'Mensuel' : 'Monthly'}</div>
                  <div className="text-sm text-gray-500">
                    {isFr ? 'Sans engagement' : 'No commitment'}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">7,99€</div>
                  <div className="text-sm text-gray-500">/mois</div>
                </div>
              </div>
            </Card>
          </div>

          {/* Guarantees */}
          <div className="flex flex-col gap-2">
            {[
              isFr ? '✓ Essai gratuit 7 jours' : '✓ 7-day free trial',
              isFr ? '✓ Accès immédiat à tout' : '✓ Immediate full access',
              isFr ? '✓ Annule à tout moment' : '✓ Cancel anytime',
            ].map((item) => (
              <div key={item} className="flex items-center justify-center text-sm text-gray-600">
                {item}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <Button
            className="w-full h-16 text-lg rounded-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 shadow-2xl"
            onClick={() => handleSubscribe(selectedPlan)}
            disabled={loading !== null}
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
            ) : (
              <Crown className="mr-2 w-6 h-6" />
            )}
            {loading
              ? (isFr ? 'Redirection...' : 'Redirecting...')
              : (isFr ? 'Devenir Premium' : 'Go Premium')}
          </Button>

          <p className="text-center text-sm text-gray-500">
            {isFr ? 'Paiement sécurisé par Stripe · Données cryptées' : 'Secure payment by Stripe · Encrypted data'}
          </p>

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
                {isFr
                  ? '"Grâce au mentorat Premium, j\'ai décroché mon premier job tech en 4 mois. Meilleur investissement de ma reconversion !"'
                  : '"Thanks to Premium mentoring, I landed my first tech job in 4 months. Best investment of my career change!"'}
              </p>
            </div>
          </Card>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
