'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function Products() {
  const t = useTranslations('products');

  const products = [
    {
      key: 'semipermanent',
      image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=2070',
      icon: '💅',
      color: 'pink'
    },
    {
      key: 'uvgel',
      image: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80&w=2070',
      icon: '✨',
      color: 'purple'
    },
    {
      key: 'rubberbase',
      image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=2070',
      icon: '💎',
      color: 'fuchsia'
    },
    {
      key: 'polygel',
      image: 'https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?q=80&w=2070',
      icon: '🌟',
      color: 'rose'
    },
    {
      key: 'tools',
      image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=2070',
      icon: '🛠️',
      color: 'violet'
    },
    {
      key: 'lashes',
      image: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?q=80&w=2070',
      icon: '👁️',
      color: 'pink'
    },
    {
      key: 'makeup',
      image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=2070',
      icon: '💄',
      color: 'fuchsia'
    },
    {
      key: 'professional',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=2096',
      icon: '🏪',
      color: 'purple'
    }
  ];

  return (
    <section id="products" className="py-32 bg-gradient-to-b from-white via-pink-50/30 to-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-pink-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-fuchsia-400/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 mb-6 px-8 py-3 bg-gradient-to-r from-pink-500 via-purple-500 to-fuchsia-500 text-white rounded-full shadow-2xl">
            <span className="text-2xl">🛍️</span>
            <span className="font-bold tracking-wide">{t('subtitle')}</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-pink-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent mb-6">
            {t('title')}
          </h2>
          <div className="flex items-center justify-center gap-2">
            <div className="w-16 h-1 bg-gradient-to-r from-transparent to-pink-500 rounded-full"></div>
            <div className="w-8 h-1 bg-pink-500 rounded-full"></div>
            <div className="w-16 h-1 bg-gradient-to-l from-transparent to-purple-500 rounded-full"></div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {products.map((product, index) => (
            <div
              key={product.key}
              className="group relative"
              style={{
                animation: 'fadeIn 0.8s ease-out forwards',
                animationDelay: `${index * 0.1}s`,
                opacity: 0
              }}
            >
              {/* Card */}
              <div className="relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-pink-200">
                {/* Image */}
                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50">
                  <Image
                    src={product.image}
                    alt={t(`${product.key}.title`)}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t from-${product.color}-600/80 to-transparent group-hover:from-${product.color}-700/90 transition-all duration-500`}></div>

                  {/* Icon Badge */}
                  <div className="absolute top-4 right-4">
                    <div className="w-14 h-14 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center text-3xl shadow-xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                      {product.icon}
                    </div>
                  </div>

                  {/* Title */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/70 to-transparent">
                    <h3 className="text-2xl font-bold text-white">
                      {t(`${product.key}.title`)}
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {t(`${product.key}.description`)}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-4">
                    {[1, 2, 3].map((i) => (
                      <li key={i} className="flex items-start text-sm text-gray-700">
                        <svg className="w-5 h-5 text-pink-500 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>{t(`${product.key}.feature${i}`)}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <button className={`w-full py-3 bg-gradient-to-r from-${product.color}-500 to-${product.color}-600 text-white font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300`}>
                    Esplora
                  </button>
                </div>

                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none"></div>
              </div>

              {/* Floating Glow */}
              <div className={`absolute inset-0 bg-gradient-to-r from-${product.color}-500/20 to-${product.color}-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`}></div>
            </div>
          ))}
        </div>

        {/* Bottom Stats/Banner */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="text-center p-8 bg-gradient-to-br from-pink-500 to-rose-500 rounded-3xl shadow-xl text-white">
            <div className="text-5xl font-black mb-2">10000+</div>
            <div className="text-pink-100 font-semibold">Prodotti Disponibili</div>
          </div>
          <div className="text-center p-8 bg-gradient-to-br from-purple-500 to-fuchsia-500 rounded-3xl shadow-xl text-white">
            <div className="text-5xl font-black mb-2">100%</div>
            <div className="text-purple-100 font-semibold">Qualità Professionale</div>
          </div>
          <div className="text-center p-8 bg-gradient-to-br from-fuchsia-500 to-pink-500 rounded-3xl shadow-xl text-white">
            <div className="text-5xl font-black mb-2">24/7</div>
            <div className="text-fuchsia-100 font-semibold">Assistenza Online</div>
          </div>
        </div>
      </div>
    </section>
  );
}
