'use client';

import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';

export function Header() {
  const t = useTranslations('Header');
  const locale = useLocale();
  const pathname = usePathname();

  const isPT = locale === 'pt-BR';

  return (
    <header className='sticky top-0 z-20 h-[78px] w-full border-b border-white/10 bg-oztech-dark/80 backdrop-blur md:h-20'>
      <div className='mx-auto flex h-full max-w-7xl items-center gap-6 px-4 md:px-6'>
        <div className='flex w-[190px] shrink-0 items-center gap-3 md:w-[220px]'>
          <div className='relative h-9 w-9 shrink-0 overflow-visible'>
            <Image
              src='/img/logo/logo-oztech-hero-circle.png'
              alt='Oztech'
              fill
              priority
              className='object-contain scale-[1.45] md:scale-[1.6]'
            />
          </div>

          <span className='whitespace-nowrap text-sm font-semibold uppercase tracking-[0.22em] text-white md:text-[15px]'>
            {t('brand')}
          </span>
        </div>

        <div className='flex flex-1 items-center justify-end gap-4 md:gap-7'>
          <nav className='hidden items-center gap-6 text-sm text-white/72 md:flex md:gap-7 md:text-[13px]'>
            <a href='#products' className='transition hover:text-white'>
              {t('navProducts')}
            </a>

            <a href='#about' className='transition hover:text-white'>
              {t('navManifesto')}
            </a>

            <a href='#contact' className='transition hover:text-white'>
              {t('navContact')}
            </a>
          </nav>

          <div className='flex items-center gap-1 rounded-full border border-white/10 px-1.5 py-1 text-xs md:text-[13px]'>
            <Link
              href={pathname}
              locale='pt-BR'
              className={
                isPT
                  ? 'rounded-full bg-white px-2.5 py-1 text-black transition'
                  : 'rounded-full px-2.5 py-1 text-white/60 transition hover:text-white'
              }
            >
              PT
            </Link>

            <Link
              href={pathname}
              locale='en-US'
              className={
                !isPT
                  ? 'rounded-full bg-white px-2.5 py-1 text-black transition'
                  : 'rounded-full px-2.5 py-1 text-white/60 transition hover:text-white'
              }
            >
              EN
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
