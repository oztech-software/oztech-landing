'use client';

import { useTranslations } from 'next-intl';

export function ManifestoSection() {
  const t = useTranslations('Manifesto');

  const bullets = ['ethics', 'energy', 'auditability'] as const;

  return (
    <section id="about" className="px-4 py-16 md:py-20">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="space-y-3 text-center md:text-left">
          <p className="text-xs uppercase tracking-[0.25em] text-oztech-primary/80">
            {t('kicker')}
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold">
            {t('title')}
          </h2>
          <p className="text-sm md:text-base text-white/70">
            {t('intro')}
          </p>
        </header>

        <ul className="space-y-4 text-sm text-white/70">
          {bullets.map(key => (
            <li key={key}>
              <span className="font-semibold text-white">
                {t(`${key}.title`)}
              </span>
              <span className="block text-white/70">
                {t(`${key}.description`)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
