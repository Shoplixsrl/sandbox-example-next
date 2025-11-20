import createMiddleware from 'next-intl/middleware';
import { locales } from './i18n';

export default createMiddleware({
  locales,
  defaultLocale: 'it',
  localePrefix: 'always'
});

export const config = {
  matcher: ['/', '/(it|en|ro)/:path*']
};
