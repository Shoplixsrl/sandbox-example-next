'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function Locations() {
  const t = useTranslations('locations');

  const locations = [
    {
      key: 'rome',
      image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=2096',
      flag: '🇮🇹'
    },
    {
      key: 'slatina',
      image: 'https://images.unsplash.com/photo-1555992336-fb7c1cf24976?q=80&w=2070',
      flag: '🇷🇴'
    }
  ];

  return (
    <section id="locations" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {locations.map((location) => (
            <div
              key={location.key}
              className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative h-96">
                <Image
                  src={location.image}
                  alt={t(`${location.key}.city`)}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <div className="text-5xl mb-4">{location.flag}</div>
                  <h3 className="text-3xl font-bold mb-2">
                    {t(`${location.key}.city`)}
                  </h3>
                  <p className="text-xl text-blue-200 mb-3">
                    {t(`${location.key}.country`)}
                  </p>
                  <p className="text-gray-200">
                    {t(`${location.key}.description`)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
