'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function Services() {
  const t = useTranslations('services');

  const services = [
    {
      key: 'manicure',
      image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=2070',
      icon: '💅',
      gradient: 'from-pink-500 to-rose-500'
    },
    {
      key: 'pedicure',
      image: 'https://images.unsplash.com/photo-1519415387722-a1c3bbef716c?q=80&w=2070',
      icon: '🦶',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      key: 'nailart',
      image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=2070',
      icon: '✨',
      gradient: 'from-fuchsia-500 to-purple-500'
    },
    {
      key: 'gel',
      image: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80&w=2070',
      icon: '💎',
      gradient: 'from-rose-500 to-pink-500'
    }
  ];

  return (
    <section id="services" className="py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-pink-200/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20 animate-[fadeIn_1s_ease-out]">
          <div className="inline-block mb-4">
            <span className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-sm font-bold rounded-full shadow-lg">
              {t('subtitle')}
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
            {t('title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto rounded-full"></div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={service.key}
              className="group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3"
              style={{
                animationDelay: `${index * 0.1}s`,
                animation: 'fadeIn 0.6s ease-out forwards'
              }}
            >
              {/* Image Container */}
              <div className="relative h-72 overflow-hidden">
                <Image
                  src={service.image}
                  alt={t(`${service.key}.title`)}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${service.gradient} opacity-60 group-hover:opacity-70 transition-opacity duration-500`}></div>

                {/* Icon Badge */}
                <div className="absolute top-6 right-6">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-4xl shadow-2xl group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                </div>

                {/* Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-3xl font-bold text-white mb-2">
                    {t(`${service.key}.title`)}
                  </h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-gray-600 leading-relaxed">
                  {t(`${service.key}.description`)}
                </p>

                {/* Learn More Link */}
                <div className="mt-4 flex items-center text-pink-600 font-semibold group-hover:text-pink-700 transition-colors">
                  <span className="text-sm">Scopri di più</span>
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              {/* Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-6 text-lg">Pronta a trasformare le tue unghie?</p>
          <a
            href="#contact"
            className="inline-block px-10 py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Prenota Ora
          </a>
        </div>
      </div>
    </section>
  );
}
