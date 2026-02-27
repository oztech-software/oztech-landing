import '../globals.css';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { locales, type Locale } from '@/i18n/routing';
import { notFound } from 'next/navigation';

const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://oztech.com.br').replace(/\/$/, '');

const titlePT = 'Oztech — Software sob medida para operações reais';
const descPT =
  'Da landing ao sistema completo: autenticação, dashboards, integrações e automações — com entrega incremental e manutenção.';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),

  title: {
    default: titlePT,
    template: '%s · Oztech'
  },
  description: descPT,

  alternates: {
    canonical: '/',
    languages: {
      'pt-BR': '/',
      'en-US': '/en-US'
    }
  },

  openGraph: {
    type: 'website',
    url: '/',
    siteName: 'Oztech',
    title: titlePT,
    description: descPT,
    locale: 'pt_BR',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Oztech'
      }
    ]
  },

  twitter: {
    card: 'summary_large_image',
    title: titlePT,
    description: descPT,
    images: ['/og.png']
  },

  robots: {
    index: true,
    follow: true
  },

  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png'
  }
};

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages({ locale: locale as Locale });

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="min-h-screen bg-oztech-dark text-white">
        <NextIntlClientProvider locale={locale as Locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}