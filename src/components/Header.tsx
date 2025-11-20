'use client';

import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { locales } from '@/i18n';
import { useState, useEffect } from 'react';

export default function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const changeLocale = (newLocale: string) => {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    router.push(segments.join('/'));
  };

  const navLinks = [
    { href: '#home', label: t('home') },
    { href: '#services', label: t('services') },
    { href: '#products', label: t('products') },
    { href: '#about', label: t('about') },
    { href: '#contact', label: t('contact') }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-white/95 backdrop-blur-lg shadow-lg py-3'
        : 'bg-white/80 backdrop-blur-sm shadow-sm py-4'
    }`}>
      <nav className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href={`/${locale}`} className="flex items-center space-x-3 group">
            <div className={`relative transition-all duration-300 ${
              scrolled ? 'w-12 h-12' : 'w-14 h-14'
            }`}>
              <div className="absolute inset-0 bg-gradient-to-br from-pink-600 to-purple-800 rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg"></div>
              <div className="relative w-full h-full flex items-center justify-center text-3xl">
                💅
              </div>
            </div>
            <div>
              <span className={`font-black bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent transition-all duration-300 ${
                scrolled ? 'text-2xl' : 'text-3xl'
              }`}>
                Onicotecnica
              </span>
              <div className="text-xs text-gray-500 font-semibold">Professional Nail Care</div>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={`/${locale}${link.href}`}
                className="relative px-5 py-2 text-gray-700 hover:text-pink-600 transition-colors font-semibold text-sm group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </div>

          {/* Language Switcher & CTA */}
          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1 shadow-inner">
              {locales.map((loc) => (
                <button
                  key={loc}
                  onClick={() => changeLocale(loc)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all duration-300 ${
                    locale === loc
                      ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg scale-105'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-white'
                  }`}
                >
                  {loc.toUpperCase()}
                </button>
              ))}
            </div>

            {/* CTA Button - Hidden on Mobile */}
            <a
              href={`/${locale}#contact`}
              className="hidden md:inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <span>Prenota</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-pink-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 animate-[fadeIn_0.3s_ease-out]">
            <div className="flex flex-col space-y-2 bg-white rounded-2xl shadow-xl p-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={`/${locale}${link.href}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-xl transition-all font-semibold"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={`/${locale}#contact`}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold rounded-xl text-center shadow-lg"
              >
                Prenota Ora
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
