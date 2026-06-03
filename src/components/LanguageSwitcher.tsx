import { useTranslation } from 'react-i18next';

interface Props {
  className?: string;
}

export function LanguageSwitcher({ className = '' }: Props) {
  const { i18n } = useTranslation();
  const isFr = i18n.language.startsWith('fr');

  const toggle = () => {
    const next = isFr ? 'en' : 'fr';
    i18n.changeLanguage(next);
    localStorage.setItem('lang', next);
  };

  return (
    <button
      onClick={toggle}
      className={`text-xs font-bold px-2.5 py-1 rounded-full border transition-all hover:opacity-80 ${className}`}
    >
      {isFr ? 'EN' : 'FR'}
    </button>
  );
}
