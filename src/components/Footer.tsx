'use client';

import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-600 to-purple-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">💅</span>
              </div>
              <span className="text-2xl font-bold">Onicotecnica</span>
            </div>
            <p className="text-gray-400 mb-4">
              {t('description')}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Roma, Italia</h3>
            <p className="text-gray-400 text-sm">
              Via Example 123<br />
              00100 Roma<br />
              info@onicotecnica.it
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Slatina, România</h3>
            <p className="text-gray-400 text-sm">
              Strada Example 45<br />
              230001 Slatina<br />
              contact@onicotecnica.ro
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Onicotecnica. {t('rights')}.</p>
        </div>
      </div>
    </footer>
  );
}
