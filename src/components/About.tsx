'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function About() {
  const t = useTranslations('about');

  const stats = [
    { label: t('experience'), value: '15+', icon: '🏆', color: 'from-pink-500 to-rose-500' },
    { label: t('clients'), value: '50+', icon: '❤️', color: 'from-purple-500 to-fuchsia-500' },
    { label: t('projects'), value: '200+', icon: '✨', color: 'from-fuchsia-500 to-pink-500' }
  ];

  return (
    <section id="about" className="py-32 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'radial-gradient(circle, #ec4899 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }}></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="order-2 lg:order-1">
            <div className="inline-block mb-6">
              <span className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-sm font-bold rounded-full shadow-lg">
                {t('subtitle')}
              </span>
            </div>

            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
              {t('title')}
            </h2>

            <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full mb-8"></div>

            <p className="text-xl text-gray-600 leading-relaxed mb-12">
              {t('description')}
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="group relative"
                  style={{
                    animation: 'fadeIn 0.8s ease-out forwards',
                    animationDelay: `${index * 0.2}s`
                  }}
                >
                  <div className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-pink-200 hover:-translate-y-2">
                    {/* Icon */}
                    <div className="text-4xl mb-3">{stat.icon}</div>

                    {/* Value */}
                    <div className={`text-4xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                      {stat.value}
                    </div>

                    {/* Label */}
                    <div className="text-sm text-gray-600 font-semibold">
                      {stat.label}
                    </div>

                    {/* Glow Effect */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300 -z-10`}></div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="mt-12">
              <a
                href="#contact"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                <span>Scopri di Più</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right Image */}
          <div className="order-1 lg:order-2 relative">
            <div className="relative">
              {/* Main Image */}
              <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=2069"
                  alt="Nail art salon"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-pink-900/20 to-purple-900/20"></div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-pink-500 to-rose-500 rounded-3xl -z-10 blur-lg animate-pulse"></div>
              <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-gradient-to-br from-purple-500 to-fuchsia-500 rounded-3xl -z-10 blur-lg animate-pulse" style={{animationDelay: '1s'}}></div>

              {/* Floating Badge */}
              <div className="absolute top-8 -left-8 bg-white rounded-2xl p-6 shadow-2xl animate-bounce" style={{animationDuration: '3s'}}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl flex items-center justify-center text-2xl">
                    💅
                  </div>
                  <div>
                    <div className="text-2xl font-black text-gray-900">100%</div>
                    <div className="text-xs text-gray-600 font-semibold">Professionale</div>
                  </div>
                </div>
              </div>

              {/* Grid Pattern Overlay */}
              <div className="absolute inset-0 opacity-10 rounded-3xl" style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)',
                backgroundSize: '30px 30px'
              }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
