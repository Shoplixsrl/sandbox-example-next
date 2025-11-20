import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

export const locales = ['it', 'en', 'ro'] as const;
export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = (await requestLocale) || 'it';

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
