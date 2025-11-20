'use client';

import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { locales } from '@/i18n';

export default function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const changeLocale = (newLocale: string) => {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    router.push(segments.join('/'));
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-600 to-purple-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">💅</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">Onicotecnica</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href={`/${locale}#home`} className="text-gray-700 hover:text-pink-600 transition-colors font-medium">
              {t('home')}
            </a>
            <a href={`/${locale}#services`} className="text-gray-700 hover:text-pink-600 transition-colors font-medium">
              {t('services')}
            </a>
            <a href={`/${locale}#about`} className="text-gray-700 hover:text-pink-600 transition-colors font-medium">
              {t('about')}
            </a>
            <a href={`/${locale}#contact`} className="text-gray-700 hover:text-pink-600 transition-colors font-medium">
              {t('contact')}
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
              {locales.map((loc) => (
                <button
                  key={loc}
                  onClick={() => changeLocale(loc)}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                    locale === loc
                      ? 'bg-pink-600 text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {loc.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
