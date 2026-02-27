import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from '@/i18n/routing';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed',
});

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|site.webmanifest|manifest.webmanifest|assets|.*\\.(?:ico|svg|png|jpg|jpeg|gif|webp|webm)$).*)'
  ]
};