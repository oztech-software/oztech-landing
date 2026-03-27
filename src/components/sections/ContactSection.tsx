'use client';

import { useTranslations } from 'next-intl';
import { motion, type Variants } from 'framer-motion';

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.08 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }
};

function buildWhatsAppUrl(phoneE164: string, message: string) {
  const digits = phoneE164.replace(/\D/g, '');
  const text = encodeURIComponent(message);
  return `https://wa.me/${digits}?text=${text}`;
}

export function ContactSection() {
  const t = useTranslations('Contact');
  const heroT = useTranslations('Hero');

  const WHATSAPP = '+55 11 918519304';
  const waUrl = buildWhatsAppUrl(WHATSAPP, heroT('whatsMessage'));

  return (
    <section id='contact' className='relative px-4 py-16 md:py-20'>
      <div className='mx-auto max-w-6xl'>
        <motion.div
          variants={containerVariants}
          initial='hidden'
          whileInView='show'
          viewport={{ once: true, amount: 0.35 }}
          className='rounded-3xl border border-white/10 bg-white/5 p-8 md:p-12'
        >
          <motion.p variants={itemVariants} className='text-xs uppercase tracking-[0.35em] text-oztech-primary/80'>
            {t('kicker')}
          </motion.p>

          <motion.h2 variants={itemVariants} className='mt-3 text-2xl md:text-3xl font-bold'>
            {t('title')}
          </motion.h2>

          <motion.p variants={itemVariants} className='mt-3 text-sm md:text-base text-white/70 max-w-2xl'>
            {t('subtitle')}
          </motion.p>

          <motion.div variants={itemVariants} className='mt-6 flex flex-col sm:flex-row gap-3 items-start'>
            <a
              href={waUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='px-6 py-2 rounded-full bg-oztech-primary text-black text-sm font-semibold hover:brightness-110 transition'
            >
              {t('whatsappCta')}
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}