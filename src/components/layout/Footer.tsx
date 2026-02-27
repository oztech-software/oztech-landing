'use client';

import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations('Footer');
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-white/10 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-6 text-xs text-white/50 flex flex-col md:flex-row gap-2 md:items-center md:justify-between">
        <span>{t('copyright', { year })}</span>
        <span>{t('tagline')}</span>
      </div>
    </footer>
  );
}
