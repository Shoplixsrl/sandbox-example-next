'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function Services() {
  const t = useTranslations('services');

  const services = [
    {
      key: 'manicure',
      image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=2070',
      icon: '💅'
    },
    {
      key: 'pedicure',
      image: 'https://images.unsplash.com/photo-1519415387722-a1c3bbef716c?q=80&w=2070',
      icon: '🦶'
    },
    {
      key: 'nailart',
      image: 'https://images.unsplash.com/photo-1610992015762-45dca7e6e3e6?q=80&w=2070',
      icon: '✨'
    },
    {
      key: 'gel',
      image: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80&w=2070',
      icon: '💎'
    }
  ];

  return (
    <section id="services" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service) => (
            <div
              key={service.key}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={service.image}
                  alt={t(`${service.key}.title`)}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-5xl">
                  {service.icon}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {t(`${service.key}.title`)}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {t(`${service.key}.description`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
