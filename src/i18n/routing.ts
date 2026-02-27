import { defineRouting } from 'next-intl/routing';

export const locales = ['pt-BR', 'en-US'] as const;
export const defaultLocale = 'pt-BR';

export const routing = defineRouting({
  locales,
  defaultLocale,
});

export type Locale = (typeof locales)[number];
