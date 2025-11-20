'use client';

import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';

export default function Hero() {
  const t = useTranslations('hero');
  const locale = useLocale();

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=2070"
          alt="Nail salon"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-pink-900/90 to-purple-800/75"></div>
      </div>

      <div className="container mx-auto px-6 z-10">
        <div className="max-w-4xl">
          <div className="inline-block mb-4 px-4 py-2 bg-pink-600/30 backdrop-blur-sm rounded-full border border-pink-400/50">
            <span className="text-pink-100 text-sm font-semibold">{t('subtitle')}</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            {t('title')}
          </h1>
          <p className="text-xl md:text-2xl text-pink-100 mb-8 leading-relaxed max-w-3xl">
            {t('description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={`/${locale}#services`}
              className="px-8 py-4 bg-pink-600 text-white rounded-lg font-semibold hover:bg-pink-700 transition-colors text-center shadow-lg hover:shadow-xl"
            >
              {t('cta')}
            </a>
            <a
              href={`/${locale}#contact`}
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold hover:bg-white/20 transition-colors text-center border border-white/30"
            >
              {t('contact')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
