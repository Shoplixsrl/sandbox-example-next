'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function Products() {
  const t = useTranslations('products');

  const products = [
    {
      key: 'semipermanent',
      image: 'https://images.unsplash.com/photo-1610992015762-45dca7e6e3e6?q=80&w=2070',
      icon: '💅'
    },
    {
      key: 'uvgel',
      image: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80&w=2070',
      icon: '✨'
    },
    {
      key: 'rubberbase',
      image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=2070',
      icon: '💎'
    },
    {
      key: 'polygel',
      image: 'https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?q=80&w=2070',
      icon: '🌟'
    },
    {
      key: 'tools',
      image: 'https://images.unsplash.com/photo-1599948128020-9a44ce70c809?q=80&w=2070',
      icon: '🛠️'
    },
    {
      key: 'lashes',
      image: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?q=80&w=2070',
      icon: '👁️'
    },
    {
      key: 'makeup',
      image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=2070',
      icon: '💄'
    },
    {
      key: 'professional',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=2096',
      icon: '🏪'
    }
  ];

  return (
    <section id="products" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.key}
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-gray-50 to-white"
            >
              <div className="relative h-64">
                <Image
                  src={product.image}
                  alt={t(`${product.key}.title`)}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="text-4xl mb-2">{product.icon}</div>
                  <h3 className="text-2xl font-bold mb-2">
                    {t(`${product.key}.title`)}
                  </h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">
                  {t(`${product.key}.description`)}
                </p>
                <ul className="space-y-2">
                  {[1, 2, 3].map((i) => (
                    <li key={i} className="flex items-start text-sm text-gray-600">
                      <span className="text-pink-600 mr-2">✓</span>
                      {t(`${product.key}.feature${i}`)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
