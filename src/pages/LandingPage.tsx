import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, Menu, X } from 'lucide-react';

const features = [
  {
    icon: '🎯',
    title: 'Personalized Career Path',
    description:
      'A step-by-step roadmap tailored to where you are and where you want to go — frontend, data, DevOps, or product.',
  },
  {
    icon: '👩‍💼',
    title: 'Real Mentors',
    description:
      '1:1 sessions with engineers and managers who made the switch themselves. Honest advice, no gatekeeping.',
  },
  {
    icon: '💬',
    title: 'Community',
    description:
      'A space where asking "where do I start?" is always welcome. Study groups and peer accountability.',
  },
  {
    icon: '💼',
    title: 'Job Board',
    description:
      'Curated opportunities from companies that actively invest in diversity and support career changers.',
  },
];

const steps = [
  {
    number: '01',
    title: 'Tell us your goal',
    description: 'Answer a few questions about your background and the tech role you\'re aiming for.',
  },
  {
    number: '02',
    title: 'Follow your path',
    description: 'Access curated resources, milestones, and mentors matched to your profile.',
  },
  {
    number: '03',
    title: 'Land your first role',
    description: 'Apply to jobs with confidence — your profile shows your progress, not just your past.',
  },
];

type FormState = 'idle' | 'submitting' | 'success' | 'error';

export default function LandingPage() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [formState, setFormState] = useState<FormState>('idle');
  const waitlistRef = useRef<HTMLElement>(null);

  const scrollTo = (ref: React.RefObject<HTMLElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    try {
      const res = await fetch('https://formspree.io/f/xnjrdpqz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setFormState('success');
        setEmail('');
      } else {
        setFormState('error');
      }
    } catch {
      setFormState('error');
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-purple-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            TechHerWay
          </span>
          {/* Desktop links */}
          <div className="hidden sm:flex items-center gap-6">
            <button
              onClick={() => scrollTo(waitlistRef)}
              className="text-sm text-gray-600 hover:text-purple-600 transition-colors"
            >
              How it works
            </button>
            <button
              onClick={() => scrollTo(waitlistRef)}
              className="text-sm text-gray-600 hover:text-purple-600 transition-colors"
            >
              Features
            </button>
            <Button
              onClick={() => scrollTo(waitlistRef)}
              size="sm"
              className="rounded-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white border-0"
            >
              Join waitlist
            </Button>
          </div>
          {/* Mobile menu button */}
          <button
            className="sm:hidden text-gray-600"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        {/* Mobile menu */}
        {menuOpen && (
          <div className="sm:hidden px-6 pb-4 flex flex-col gap-4 border-t border-purple-100 bg-white">
            <button onClick={() => scrollTo(waitlistRef)} className="text-sm text-gray-600 text-left pt-3">
              How it works
            </button>
            <button onClick={() => scrollTo(waitlistRef)} className="text-sm text-gray-600 text-left">
              Features
            </button>
            <Button
              onClick={() => scrollTo(waitlistRef)}
              className="rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white border-0"
            >
              Join waitlist
            </Button>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-pink-50 -z-10" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-30 -z-10" />
        <div className="absolute bottom-0 left-10 w-72 h-72 bg-pink-200 rounded-full blur-3xl opacity-30 -z-10" />

        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-8">
            <span>🚀</span> Now in early development · Join the waitlist
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6">
            Build your tech career,{' '}
            <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              your way.
            </span>
          </h1>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            TechHerWay is the platform for women transitioning into tech — with structured learning
            paths, real mentors, and a community that truly gets it.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => scrollTo(waitlistRef)}
              size="lg"
              className="rounded-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white border-0 shadow-lg hover:shadow-xl h-14 px-8 text-lg"
            >
              Join the waitlist →
            </Button>
            <Button
              onClick={() => navigate('/app')}
              variant="outline"
              size="lg"
              className="rounded-full border-2 border-purple-200 text-purple-700 hover:bg-purple-50 h-14 px-8 text-lg"
            >
              Preview the app
            </Button>
          </div>

          <p className="mt-6 text-sm text-gray-400">Free to join · No credit card required</p>
        </div>
      </section>

      {/* Problem */}
      <section className="py-20 px-6 bg-gray-950 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Most career platforms weren't built for you.
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-16">
            They assume you already have a CS degree, a network in tech, and time to figure it out
            alone. Career changers — especially women — deserve something better.
          </p>

          <div className="grid sm:grid-cols-3 gap-6 text-left">
            {[
              {
                icon: '😮‍💨',
                title: 'Overwhelming entry points',
                body: '"Should I learn Python or JavaScript first?" Generic advice leads to months of spinning wheels.',
              },
              {
                icon: '🤐',
                title: 'No one to ask',
                body: 'Stack Overflow is great if you know what to search. Bootcamps end. Communities go quiet.',
              },
              {
                icon: '🎭',
                title: 'Imposter syndrome by design',
                body: "Spaces built by and for people who've never had to prove they belong aren't built for you.",
              },
            ].map((item) => (
              <div key={item.title} className="p-6 rounded-2xl bg-gray-900 border border-gray-800">
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Everything you need to make the switch
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              One platform. No juggling ten tabs and hoping for the best.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <Card
                key={f.title}
                className="p-6 hover:border-purple-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-6 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              From "where do I start?" to hired.
            </h2>
            <p className="text-gray-500 text-lg">Three steps. One clear path.</p>
          </div>
          <div className="space-y-8">
            {steps.map((step) => (
              <div key={step.number} className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {step.number}
                </div>
                <div className="pt-2">
                  <h3 className="font-semibold text-xl text-gray-900 mb-1">{step.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button
              onClick={() => navigate('/onboarding/1')}
              size="lg"
              className="rounded-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white border-0 shadow-lg h-14 px-10 text-lg"
            >
              Start your journey <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Waitlist CTA */}
      <section ref={waitlistRef} className="py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="p-10 sm:p-14 rounded-3xl bg-gradient-to-br from-purple-600 to-pink-500 text-white shadow-2xl">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Be the first to know.</h2>
            <p className="text-purple-100 text-lg mb-8">
              The platform is in development. Join the waitlist to get early access and help shape
              what we build.
            </p>

            {formState === 'success' ? (
              <div className="bg-white/20 rounded-2xl p-6">
                <p className="text-xl font-semibold">🎉 You're on the list!</p>
                <p className="text-purple-100 mt-2 text-sm">We'll reach out when early access opens.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 px-5 py-3 rounded-full text-gray-900 text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <Button
                  type="submit"
                  disabled={formState === 'submitting'}
                  className="px-6 py-3 rounded-full bg-white text-purple-600 font-semibold hover:bg-purple-50 border-0 whitespace-nowrap disabled:opacity-70 h-auto"
                >
                  {formState === 'submitting' ? 'Sending…' : 'Join waitlist →'}
                </Button>
              </form>
            )}

            {formState === 'error' && (
              <p className="mt-3 text-sm text-pink-200">Something went wrong. Try again?</p>
            )}
            <p className="mt-4 text-purple-200 text-sm">No spam. Unsubscribe anytime.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-100">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              TechHerWay
            </span>
            <p className="text-gray-400 text-sm mt-1">
              Built by{' '}
              <a
                href="https://womanintech-spec.github.io/barbarateslar-portfolio"
                className="hover:text-purple-600 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Barbara Teslar
              </a>
            </p>
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <a
              href="https://github.com/WomaninTech-spec"
              className="hover:text-purple-600 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/barbarateslar/?locale=en"
              className="hover:text-purple-600 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
