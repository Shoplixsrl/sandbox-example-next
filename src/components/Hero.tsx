'use client';

import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';

export default function Hero() {
  const t = useTranslations('hero');
  const locale = useLocale();

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=2070"
          alt="Nail salon"
          fill
          className="object-cover scale-105 animate-[scale_20s_ease-in-out_infinite_alternate]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-pink-900/95 via-purple-900/90 to-pink-800/95"></div>

        {/* Animated Gradient Orbs */}
        <div className="absolute top-20 -left-20 w-96 h-96 bg-pink-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="container mx-auto px-6 z-10 relative">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-6 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-2xl hover:scale-105 transition-transform duration-300">
            <span className="text-3xl">💅</span>
            <span className="text-white text-sm font-semibold tracking-wide uppercase">{t('subtitle')}</span>
            <span className="text-3xl">✨</span>
          </div>

          {/* Main Heading with Gradient */}
          <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-pink-100 to-purple-100 mb-8 leading-tight tracking-tight drop-shadow-2xl animate-[fadeIn_1s_ease-out]">
            {t('title')}
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl text-pink-50 mb-12 leading-relaxed max-w-3xl mx-auto font-light animate-[fadeIn_1.5s_ease-out]">
            {t('description')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-[fadeIn_2s_ease-out]">
            <a
              href={`/${locale}#services`}
              className="group relative px-10 py-5 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-2xl font-bold text-lg shadow-2xl hover:shadow-pink-500/50 transition-all duration-300 overflow-hidden hover:scale-105"
            >
              <span className="relative z-10">{t('cta')}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
            <a
              href={`/${locale}#contact`}
              className="group px-10 py-5 bg-white/10 backdrop-blur-md text-white rounded-2xl font-bold text-lg border-2 border-white/30 hover:bg-white/20 hover:border-white/50 transition-all duration-300 shadow-xl hover:scale-105"
            >
              {t('contact')}
            </a>
          </div>

          {/* Floating Elements */}
          <div className="absolute top-1/4 left-10 text-6xl opacity-20 animate-bounce" style={{animationDuration: '3s'}}>💎</div>
          <div className="absolute bottom-1/4 right-10 text-6xl opacity-20 animate-bounce" style={{animationDuration: '4s', animationDelay: '1s'}}>✨</div>
          <div className="absolute top-1/2 left-1/4 text-5xl opacity-10 animate-bounce" style={{animationDuration: '5s', animationDelay: '2s'}}>💅</div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-20">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 80C1200 80 1320 70 1380 65L1440 60V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="rgb(249, 250, 251)"/>
        </svg>
      </div>
    </section>
  );
}
