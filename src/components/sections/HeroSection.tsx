'use client';

import Link from 'next/link';
import Image from 'next/image';
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
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  }
};

function buildWhatsAppUrl(phoneE164: string, message: string) {
  const clean = phoneE164.replace(/[^\d+]/g, '');
  const text = encodeURIComponent(message);
  return `https://wa.me/${clean.replace('+', '')}?text=${text}`;
}

function BrandCore() {
  return (
    <motion.div
      className='relative w-full max-w-[620px] flex items-center justify-center'
      initial={{ opacity: 0, scale: 0.96, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.25, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* glows (marca) */}
      <div className='pointer-events-none absolute inset-[-18%] rounded-full bg-oztech-primary/14 blur-3xl' />
      <div className='pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-oztech-accent/6 blur-3xl' />

      {/* orbital rings discretos */}
      <motion.div
        className='pointer-events-none absolute inset-[-16%] rounded-full border border-white/10'
        animate={{ rotate: 360 }}
        transition={{ duration: 34, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className='pointer-events-none absolute inset-[-26%] rounded-full border border-white/5'
        animate={{ rotate: -360 }}
        transition={{ duration: 52, repeat: Infinity, ease: 'linear' }}
      />

      {/* PLATE É CÍRCULO (combina com o logo) */}
      <motion.div
        className='relative w-full aspect-square rounded-full border border-white/10 overflow-hidden flex items-center justify-center shadow-[0_18px_70px_rgba(0,0,0,0.60)] bg-[radial-gradient(circle_at_30%_18%,rgba(0,245,212,0.22),transparent_54%),radial-gradient(circle_at_78%_78%,rgba(255,213,0,0.06),transparent_58%),linear-gradient(180deg,rgba(12,16,36,0.86),rgba(2,3,10,0.92))]'
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* borda gradiente sutil (redonda também) */}
        <div className='pointer-events-none absolute inset-0 rounded-full border border-transparent [background:linear-gradient(140deg,rgba(0,245,212,0.55),rgba(0,245,212,0)_45%,rgba(255,213,0,0.18))_border-box] [mask:linear-gradient(#000_0_0)_padding-box,linear-gradient(#000_0_0)_border-box] [mask-composite:exclude]' />

        {/* halo do logo */}
        <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,245,212,0.16),transparent_48%)]' />

        {/* scanline (bem sutil) */}
        <motion.div
          className='pointer-events-none absolute -left-48 top-0 h-full w-44 rotate-12 bg-white/10 blur-xl'
          animate={{ x: [0, 980] }}
          transition={{ duration: 6.2, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* LOGO: PNG circular/transparente */}
        <div className='relative w-[64%] max-w-[380px]'>
          <Image
            src='/img/logo/logo-oztech-hero-circle.png'
            alt='Oztech symbol'
            width={720}
            height={720}
            priority
            className='w-full h-auto drop-shadow-[0_18px_70px_rgba(0,245,212,0.30)]'
          />
        </div>

        {/* vinheta interna */}
        <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_52%,rgba(3,4,12,0.92)_100%)]' />
      </motion.div>
    </motion.div>
  );
}

export function HeroSection() {
  const t = useTranslations('Hero');

  const WHATSAPP = '+55 11 918519304';
  const waUrl = buildWhatsAppUrl(WHATSAPP, t('whatsMessage'));

  return (
    <section
      id='top'
      className='relative min-h-[78vh] flex items-center px-4 py-10 md:py-16 overflow-hidden'
    >
      {/* BG (ambient gradient + glows) */}
      <div className='pointer-events-none absolute inset-0'>
        {/* ambient gradient estilo big tech (marca) */}
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(0,245,212,0.18),transparent_48%),radial-gradient(circle_at_78%_55%,rgba(255,213,0,0.07),transparent_52%),radial-gradient(circle_at_50%_88%,rgba(0,245,212,0.07),transparent_60%),linear-gradient(180deg,rgba(6,10,26,0.30),rgba(2,3,10,0.92))]' />

        {/* spotlights complementares */}
        <div className='absolute -top-44 left-12 h-80 w-80 rounded-full bg-oztech-primary/14 blur-3xl' />
        <div className='absolute top-1/2 right-20 -translate-y-1/2 h-96 w-96 rounded-full bg-oztech-accent/10 blur-3xl' />

        {/* vinheta suave */}
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(2,3,10,0.78)_100%)]' />
      </div>

      <div className='relative max-w-6xl mx-auto grid gap-10 lg:grid-cols-2 items-center'>
        {/* TEXTO */}
        <motion.div
          className='space-y-6 text-center lg:text-left z-10'
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
            className='text-4xl md:text-5xl lg:text-6xl font-bold leading-tight'
          >
            {t('title')}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className='text-sm md:text-base text-white/70 max-w-xl mx-auto lg:mx-0'
          >
            {t('subtitle')}
          </motion.p>

          <motion.p
            variants={itemVariants}
            className='text-xs md:text-sm text-white/55 tracking-wide'
          >
            {t('trust')}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className='flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-3 pt-3'
          >
            <a
              href={waUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='px-6 py-2 rounded-full bg-oztech-primary text-black text-sm font-semibold hover:brightness-110 transition'
            >
              {t('ctaPrimary')}
            </a>

            <Link
              href='#products'
              className='px-6 py-2 rounded-full border border-white/30 text-sm hover:border-oztech-primary/80 hover:text-oztech-primary transition'
            >
              {t('ctaSecondary')}
            </Link>
          </motion.div>
        </motion.div>

        {/* BRAND CORE */}
        <div className='flex items-center justify-center relative'>
          <BrandCore />
        </div>
      </div>
    </section>
  );
}