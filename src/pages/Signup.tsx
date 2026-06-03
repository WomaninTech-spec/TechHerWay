import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Eye, EyeOff } from 'lucide-react';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

export default function Signup() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError(t('auth.errorShort'));
      return;
    }
    if (password !== confirmPassword) {
      setError(t('auth.errorMismatch'));
      return;
    }

    setLoading(true);

    const { error: authError } = await supabase.auth.signUp({ email, password });

    if (authError) {
      setError(authError.message === 'User already registered'
        ? t('auth.errorExists')
        : t('auth.errorGeneric'));
      setLoading(false);
      return;
    }

    navigate('/onboarding/1');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Link to="/">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              TechHerWay
            </h1>
          </Link>
          <p className="mt-2 text-gray-600">{t('auth.signupSubtitle')}</p>
          <div className="mt-3 flex justify-center">
            <LanguageSwitcher className="border-gray-300 text-gray-500" />
          </div>
        </div>

        <Card className="p-8 shadow-xl border-purple-100">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 font-medium">{t('auth.email')}</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('auth.emailPlaceholder')}
                required
                className="h-12 rounded-xl border-gray-200 focus:border-purple-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 font-medium">{t('auth.password')}</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t('auth.passwordMinPlaceholder')}
                  required
                  className="h-12 rounded-xl border-gray-200 focus:border-purple-400 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password" className="text-gray-700 font-medium">
                {t('auth.confirmPassword')}
              </Label>
              <Input
                id="confirm-password"
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder={t('auth.passwordPlaceholder')}
                required
                className="h-12 rounded-xl border-gray-200 focus:border-purple-400"
              />
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white border-0 shadow-lg disabled:opacity-70 text-base"
            >
              {loading ? t('auth.signupLoading') : t('auth.signupBtn')}
            </Button>
          </form>
        </Card>

        <p className="text-center text-sm text-gray-600">
          {t('auth.hasAccount')}{' '}
          <Link to="/login" className="text-purple-600 font-semibold hover:underline">
            {t('auth.loginLink')}
          </Link>
        </p>
      </div>
    </div>
  );
}
