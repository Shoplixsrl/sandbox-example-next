'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function About() {
  const t = useTranslations('about');

  const stats = [
    { label: t('experience'), value: '15+' },
    { label: t('projects'), value: '200+' },
    { label: t('clients'), value: '50+' }
  ];

  return (
    <section id="about" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t('title')}
            </h2>
            <p className="text-xl text-blue-600 mb-6 font-semibold">
              {t('subtitle')}
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              {t('description')}
            </p>

            <div className="grid grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069"
                alt="Professional workspace"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-600 rounded-2xl -z-10"></div>
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-200 rounded-2xl -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
