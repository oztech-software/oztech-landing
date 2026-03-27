'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { motion, type Variants } from 'framer-motion';

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.08
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

function buildWhatsAppUrl(phoneE164: string, message: string) {
  const clean = phoneE164.replace(/[^\d+]/g, '');
  const text = encodeURIComponent(message);
  return `https://wa.me/${clean.replace('+', '')}?text=${text}`;
}

export function HeroSection() {
  const t = useTranslations('Hero');

  const whatsapp = '+55 11 918519304';
  const waUrl = buildWhatsAppUrl(whatsapp, t('whatsMessage'));

  return (
    <section
      id='top'
      className='relative flex min-h-[78vh] items-center overflow-hidden px-4 py-14 md:py-20'
    >
      <div className='pointer-events-none absolute inset-0'>
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(0,245,212,0.18),transparent_48%),radial-gradient(circle_at_78%_55%,rgba(255,213,0,0.07),transparent_52%),radial-gradient(circle_at_50%_88%,rgba(0,245,212,0.07),transparent_60%),linear-gradient(180deg,rgba(6,10,26,0.30),rgba(2,3,10,0.92))]' />
        <div className='absolute -top-44 left-12 h-80 w-80 rounded-full bg-oztech-primary/14 blur-3xl' />
        <div className='absolute top-1/2 right-20 h-96 w-96 -translate-y-1/2 rounded-full bg-oztech-accent/10 blur-3xl' />
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(2,3,10,0.78)_100%)]' />
      </div>

      <div className='relative mx-auto w-full max-w-4xl'>
        <motion.div
          className='space-y-6 text-center'
          variants={containerVariants}
          initial='hidden'
          animate='show'
        >
          <motion.p
            variants={itemVariants}
            className='text-xs uppercase tracking-[0.35em] text-oztech-primary/80'
          >
            {t('kicker')}
          </motion.p>

          <motion.h1
            variants={itemVariants}
            className='mx-auto max-w-4xl text-4xl font-bold leading-tight md:text-5xl lg:text-6xl'
          >
            {t('title')}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className='mx-auto max-w-2xl text-sm leading-7 text-white/72 md:text-base'
          >
            {t('subtitle')}
          </motion.p>

          <motion.p
            variants={itemVariants}
            className='mx-auto max-w-2xl text-xs tracking-wide text-white/55 md:text-sm'
          >
            {t('trust')}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className='flex flex-col items-center justify-center gap-3 pt-3 sm:flex-row'
          >
            <a
              href={waUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='rounded-full bg-oztech-primary px-6 py-2.5 text-sm font-semibold text-black transition hover:brightness-110'
            >
              {t('ctaPrimary')}
            </a>

            <Link
              href='#products'
              className='rounded-full border border-white/20 px-6 py-2.5 text-sm text-white/88 transition hover:border-oztech-primary/80 hover:text-oztech-primary'
            >
              {t('ctaSecondary')}
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}