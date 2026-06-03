import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Home, Users, Briefcase, User } from 'lucide-react';

export function BottomNav() {
  const location = useLocation();
  const { t } = useTranslation();

  const navItems = [
    { path: '/dashboard', icon: Home, label: t('bottomNav.journey') },
    { path: '/community', icon: Users, label: t('bottomNav.community') },
    { path: '/jobs', icon: Briefcase, label: t('bottomNav.jobs') },
    { path: '/profile', icon: User, label: t('bottomNav.profile') },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="max-w-md mx-auto flex justify-around items-center h-16 px-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center gap-1 flex-1 transition-colors ${
                isActive ? 'text-purple-600' : 'text-gray-500'
              }`}
            >
              <Icon className={`w-6 h-6 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
              <span className={`text-xs ${isActive ? 'font-semibold' : 'font-normal'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
