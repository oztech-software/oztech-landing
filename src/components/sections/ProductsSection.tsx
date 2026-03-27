'use client';

import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'framer-motion';

type ProductKey = 'garageSEC' | 'toka' | 'capibara' | 'reluvi';

type ProductItem = {
  key: ProductKey;
};

type ShowcaseImage = {
  id: string;
  src: string;
  tabLabelKey: string;
  altKey: string;
  fit?: 'cover' | 'contain';
};

type ShowcaseConfig = {
  badges: Array<'demo' | 'nda' | 'product'>;
  images: readonly ShowcaseImage[];
};

const PRODUCTS: readonly ProductItem[] = [
  { key: 'garageSEC' },
  { key: 'toka' },
  { key: 'capibara' },
  { key: 'reluvi' }
] as const;

const SHOWCASES: Record<ProductKey, ShowcaseConfig> = {
  garageSEC: {
    badges: ['product', 'demo'],
    images: [
      {
        id: 'monitor',
        src: '/img/demos/garagesecmonitor.png',
        tabLabelKey: 'showcase.tabs.monitor',
        altKey: 'showcase.alts.monitor',
        fit: 'cover'
      }
    ]
  },
  toka: {
    badges: ['demo', 'nda'],
    images: [
      {
        id: 'recepcao',
        src: '/img/demos/intranet-recepcao-demo.png',
        tabLabelKey: 'showcase.tabs.recepcao',
        altKey: 'showcase.alts.recepcao',
        fit: 'cover'
      },
      {
        id: 'tutor',
        src: '/img/demos/area-tutor-demo.png',
        tabLabelKey: 'showcase.tabs.tutor',
        altKey: 'showcase.alts.tutor',
        fit: 'cover'
      }
    ]
  },
  capibara: {
    badges: ['product', 'demo'],
    images: [
      {
        id: 'hero',
        src: '/img/demos/herocapi.png',
        tabLabelKey: 'showcase.tabs.hero',
        altKey: 'showcase.alts.hero',
        fit: 'cover'
      },
      {
        id: 'preco',
        src: '/img/demos/capipreco.png',
        tabLabelKey: 'showcase.tabs.preco',
        altKey: 'showcase.alts.preco',
        fit: 'cover'
      },
      {
        id: 'links',
        src: '/img/demos/capilink.png',
        tabLabelKey: 'showcase.tabs.links',
        altKey: 'showcase.alts.links',
        fit: 'cover'
      }
    ]
  },
  reluvi: {
    badges: ['product', 'demo'],
    images: [
      {
        id: 'momentos',
        src: '/img/demos/momentosreluvi.png',
        tabLabelKey: 'showcase.tabs.momentos',
        altKey: 'showcase.alts.momentos',
        fit: 'contain'
      },
      {
        id: 'eu',
        src: '/img/demos/reluvieu.png',
        tabLabelKey: 'showcase.tabs.eu',
        altKey: 'showcase.alts.eu',
        fit: 'contain'
      }
    ]
  }
};

const PRODUCT_ROWS: readonly ProductItem[][] = [
  [PRODUCTS[0], PRODUCTS[1]],
  [PRODUCTS[2], PRODUCTS[3]]
];

function getDefaultTabId(key: ProductKey) {
  return SHOWCASES[key]?.images[0]?.id ?? '';
}

function prefersReducedMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function getScrollBehavior(): ScrollBehavior {
  return prefersReducedMotion() ? 'auto' : 'smooth';
}

function getHeaderOffset() {
  if (typeof window === 'undefined') return 96;

  const header = document.querySelector('header');
  const headerHeight =
    header instanceof HTMLElement ? header.getBoundingClientRect().height : 0;

  if (headerHeight > 0) {
    return Math.round(headerHeight + 20);
  }

  return window.innerWidth >= 768 ? 96 : 84;
}

function isElementWellVisible(el: HTMLElement, offset: number) {
  const rect = el.getBoundingClientRect();
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  const topLimit = offset;
  const bottomLimit = viewportHeight - 24;

  return rect.top >= topLimit && rect.bottom <= bottomLimit;
}

function scrollElementIntoView(el: HTMLElement, extraOffset = 0) {
  const offset = getHeaderOffset() + extraOffset;
  const top = window.scrollY + el.getBoundingClientRect().top - offset;

  window.scrollTo({
    top: Math.max(0, top),
    behavior: getScrollBehavior()
  });
}

const Badge = memo(function Badge({ label }: { label: string }) {
  return (
    <span className='inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/70'>
      {label}
    </span>
  );
});

const PreviewImage = memo(function PreviewImage({
  image,
  alt,
  sizes
}: {
  image: ShowcaseImage;
  alt: string;
  sizes: string;
}) {
  const fit = image.fit ?? 'cover';
  const imageClass =
    fit === 'contain'
      ? 'object-contain object-center drop-shadow-[0_20px_60px_rgba(0,0,0,0.55)]'
      : 'object-cover';

  return (
    <div className='overflow-hidden rounded-xl border border-white/10 bg-black/20'>
      <div className={fit === 'contain' ? 'bg-black/30 p-3 md:p-4' : ''}>
        <div className='relative aspect-[16/9] w-full'>
          <Image
            src={image.src}
            alt={alt}
            fill
            sizes={sizes}
            className={imageClass}
          />
        </div>
      </div>
    </div>
  );
});

const ProductCard = memo(function ProductCard({
  title,
  tags,
  what,
  solve,
  value,
  previewImage,
  previewAlt,
  previewLabel,
  isExpanded,
  onToggle,
  openLabel,
  closeLabel,
  controlsId,
  cardRef
}: {
  title: string;
  tags: string;
  what: string;
  solve: string;
  value: string;
  previewImage: ShowcaseImage;
  previewAlt: string;
  previewLabel: string;
  isExpanded: boolean;
  onToggle: () => void;
  openLabel: string;
  closeLabel: string;
  controlsId: string;
  cardRef?: (node: HTMLButtonElement | null) => void;
}) {
  return (
    <button
      ref={cardRef}
      type='button'
      onClick={onToggle}
      aria-expanded={isExpanded}
      aria-controls={controlsId}
      className={[
        'group flex flex-col gap-4 rounded-2xl border bg-white/5 p-5 text-left backdrop-blur-sm transition',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oztech-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-oztech-dark',
        isExpanded
          ? 'border-oztech-primary/70 bg-white/[0.07]'
          : 'border-white/10 hover:border-oztech-primary/50 hover:bg-white/[0.06]'
      ].join(' ')}
    >
      <div className='flex items-start justify-between gap-3'>
        <div className='space-y-1'>
          <h3 className='text-sm font-semibold text-white'>{title}</h3>
          <p className='text-[11px] text-white/45'>{tags}</p>
        </div>

        <span
          className={[
            'shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium transition',
            isExpanded
              ? 'bg-oztech-primary text-black'
              : 'border border-white/15 text-white/70 group-hover:border-oztech-primary/40'
          ].join(' ')}
        >
          {isExpanded ? closeLabel : openLabel}
        </span>
      </div>

      <div className='space-y-2'>
        <p className='text-sm text-white/78'>{what}</p>
        <p className='text-xs leading-6 text-white/62'>{solve}</p>
        <p className='text-xs leading-6 text-white/48'>{value}</p>
      </div>

      <div className='mt-auto space-y-2'>
        <PreviewImage
          image={previewImage}
          alt={previewAlt}
          sizes='(max-width: 768px) 100vw, 280px'
        />
        <p className='text-[11px] text-white/40'>{previewLabel}</p>
      </div>
    </button>
  );
});

const ProductShowcasePanel = memo(
  React.forwardRef<
    HTMLDivElement,
    {
      id?: string;
      productKey: ProductKey;
      config: ShowcaseConfig;
      activeTabId: string;
      onTabChange: (id: string) => void;
      onClose: () => void;
    }
  >(function ProductShowcasePanel(
    { id, productKey, config, activeTabId, onTabChange, onClose },
    ref
  ) {
    const t = useTranslations('Products');

    const activeImage = useMemo(
      () => config.images.find((img) => img.id === activeTabId) ?? config.images[0],
      [activeTabId, config.images]
    );

    const hasTabs = config.images.length > 1;

    return (
      <motion.div
        ref={ref}
        id={id}
        tabIndex={-1}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        className='rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-oztech-primary/70 md:p-6'
      >
        <div className='grid gap-5 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:items-start'>
          <div className='space-y-4'>
            <div className='flex flex-wrap items-center gap-2'>
              {config.badges.map((badge) => (
                <Badge key={badge} label={t(`badges.${badge}`)} />
              ))}
            </div>

            <div className='space-y-2'>
              <h4 className='text-base font-semibold md:text-lg'>
                {t(`${productKey}.showcase.title`)}
              </h4>
              <p className='text-sm leading-7 text-white/72'>
                {t(`${productKey}.showcase.what`)}
              </p>
            </div>

            <div className='grid gap-3 sm:grid-cols-2'>
              <div className='rounded-xl border border-white/10 bg-black/15 p-3'>
                <p className='text-[11px] uppercase tracking-[0.16em] text-white/42'>
                  {t('labels.solve')}
                </p>
                <p className='mt-2 text-sm leading-6 text-white/72'>
                  {t(`${productKey}.showcase.solve`)}
                </p>
              </div>

              <div className='rounded-xl border border-white/10 bg-black/15 p-3'>
                <p className='text-[11px] uppercase tracking-[0.16em] text-white/42'>
                  {t('labels.value')}
                </p>
                <p className='mt-2 text-sm leading-6 text-white/72'>
                  {t(`${productKey}.showcase.value`)}
                </p>
              </div>
            </div>

            <div className='flex flex-col gap-2 pt-1 sm:flex-row'>
              <a
                href='#contact'
                className='inline-flex items-center justify-center rounded-full bg-oztech-primary px-5 py-2 text-sm font-semibold text-black transition hover:brightness-110'
              >
                {t('showcaseCta')}
              </a>

              <button
                type='button'
                onClick={onClose}
                className='inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-2 text-sm text-white/80 transition hover:border-white/35'
              >
                {t('showcaseSecondaryCta')}
              </button>
            </div>

            <p className='text-[11px] text-white/42'>
              {t(`${productKey}.showcase.note`)}
            </p>
          </div>

          <div className='w-full'>
            {hasTabs ? (
              <div className='flex flex-wrap gap-2'>
                {config.images.map((img) => {
                  const isActive = img.id === activeImage.id;

                  return (
                    <button
                      key={img.id}
                      type='button'
                      onClick={() => onTabChange(img.id)}
                      className={[
                        'rounded-full border px-3 py-1 text-[12px] transition',
                        isActive
                          ? 'border-white/20 bg-white/10 text-white'
                          : 'border-white/10 text-white/70 hover:border-white/20'
                      ].join(' ')}
                    >
                      {t(`${productKey}.${img.tabLabelKey}`)}
                    </button>
                  );
                })}
              </div>
            ) : null}

            <div className={hasTabs ? 'mt-3' : ''}>
              <PreviewImage
                image={activeImage}
                alt={t(`${productKey}.${activeImage.altKey}`)}
                sizes='(max-width: 1024px) 100vw, 640px'
              />
            </div>
          </div>
        </div>
      </motion.div>
    );
  })
);

export function ProductsSection() {
  const t = useTranslations('Products');

  const [expanded, setExpanded] = useState<ProductKey | null>(null);
  const [activeTabByProduct, setActiveTabByProduct] = useState<
    Partial<Record<ProductKey, string>>
  >({});

  const cardRefs = useRef<Partial<Record<ProductKey, HTMLButtonElement | null>>>({});
  const panelRefs = useRef<Partial<Record<ProductKey, HTMLDivElement | null>>>({});
  const pendingReturnFocusKeyRef = useRef<ProductKey | null>(null);
  const previousExpandedRef = useRef<ProductKey | null>(null);

  const setCardRef = useCallback(
    (key: ProductKey) => (node: HTMLButtonElement | null) => {
      cardRefs.current[key] = node;
    },
    []
  );

  const setPanelRef = useCallback(
    (key: ProductKey) => (node: HTMLDivElement | null) => {
      panelRefs.current[key] = node;
    },
    []
  );

  const setActiveTab = useCallback((key: ProductKey, id: string) => {
    setActiveTabByProduct((prev) => {
      if (prev[key] === id) return prev;
      return { ...prev, [key]: id };
    });
  }, []);

  const ensureFirstTab = useCallback((key: ProductKey) => {
    const firstTabId = getDefaultTabId(key);
    if (!firstTabId) return;

    setActiveTabByProduct((prev) => {
      if (prev[key]) return prev;
      return { ...prev, [key]: firstTabId };
    });
  }, []);

  const closeProduct = useCallback((key: ProductKey) => {
    pendingReturnFocusKeyRef.current = key;
    setExpanded(null);
  }, []);

  const handleClose = useCallback(() => {
    if (expanded) {
      closeProduct(expanded);
    }
  }, [closeProduct, expanded]);

  const handleToggle = useCallback(
    (key: ProductKey) => {
      if (expanded === key) {
        closeProduct(key);
        return;
      }

      ensureFirstTab(key);
      setExpanded(key);
    },
    [closeProduct, ensureFirstTab, expanded]
  );

  useEffect(() => {
    if (!expanded) {
      const focusKey = pendingReturnFocusKeyRef.current;
      pendingReturnFocusKeyRef.current = null;
      previousExpandedRef.current = null;

      if (!focusKey) return;

      const cardEl = cardRefs.current[focusKey];
      if (!cardEl) return;

      const run = () => {
        const offset = getHeaderOffset();
        if (!isElementWellVisible(cardEl, offset)) {
          scrollElementIntoView(cardEl, 8);
        }

        cardEl.focus({ preventScroll: true });
      };

      requestAnimationFrame(() => {
        requestAnimationFrame(run);
      });

      return;
    }

    previousExpandedRef.current = expanded;

    const run = () => {
      const panelEl = panelRefs.current[expanded];
      if (!panelEl) return;

      const offset = getHeaderOffset();
      if (!isElementWellVisible(panelEl, offset)) {
        scrollElementIntoView(panelEl, 8);
      }

      panelEl.focus({ preventScroll: true });
    };

    requestAnimationFrame(() => {
      requestAnimationFrame(run);
    });
  }, [expanded]);

  return (
    <section
      id='products'
      className='scroll-mt-24 px-4 py-16 md:scroll-mt-28 md:py-20'
    >
      <div className='mx-auto max-w-6xl space-y-8'>
        <header className='space-y-3 text-center'>
          <p className='text-xs uppercase tracking-[0.25em] text-oztech-primary/80'>
            {t('kicker')}
          </p>
          <h2 className='text-2xl font-semibold md:text-3xl'>{t('title')}</h2>
          <p className='mx-auto max-w-2xl text-sm text-white/70 md:text-base'>
            {t('subtitle')}
          </p>
        </header>

        <div className='space-y-6'>
          {PRODUCT_ROWS.map((row, rowIndex) => {
            const rowHasExpanded = expanded ? row.some((item) => item.key === expanded) : false;

            return (
              <div key={`row-${rowIndex}`} className='space-y-6'>
                <div className='grid gap-6 md:grid-cols-2'>
                  {row.map(({ key }) => {
                    const config = SHOWCASES[key];
                    const panelId = `product-showcase-${key}`;
                    const currentTabId = activeTabByProduct[key] ?? getDefaultTabId(key);
                    const previewImage = config.images[0];

                    return (
                      <React.Fragment key={key}>
                        <ProductCard
                          title={t(`${key}.name`)}
                          tags={t(`${key}.tags`)}
                          what={t(`${key}.summary.what`)}
                          solve={t(`${key}.summary.solve`)}
                          value={t(`${key}.summary.value`)}
                          previewImage={previewImage}
                          previewAlt={t(`${key}.${previewImage.altKey}`)}
                          previewLabel={t('card.preview')}
                          isExpanded={expanded === key}
                          onToggle={() => handleToggle(key)}
                          openLabel={t('card.open')}
                          closeLabel={t('card.close')}
                          controlsId={panelId}
                          cardRef={setCardRef(key)}
                        />

                        <div className='md:hidden'>
                          <AnimatePresence initial={false} mode='wait'>
                            {expanded === key ? (
                              <ProductShowcasePanel
                                key={`${key}-mobile`}
                                ref={setPanelRef(key)}
                                id={panelId}
                                productKey={key}
                                config={config}
                                activeTabId={currentTabId}
                                onTabChange={(id) => setActiveTab(key, id)}
                                onClose={handleClose}
                              />
                            ) : null}
                          </AnimatePresence>
                        </div>
                      </React.Fragment>
                    );
                  })}
                </div>

                <div className='hidden md:block'>
                  <AnimatePresence initial={false} mode='wait'>
                    {rowHasExpanded && expanded ? (
                      <ProductShowcasePanel
                        key={`${expanded}-desktop`}
                        ref={setPanelRef(expanded)}
                        id={`product-showcase-${expanded}`}
                        productKey={expanded}
                        config={SHOWCASES[expanded]}
                        activeTabId={activeTabByProduct[expanded] ?? getDefaultTabId(expanded)}
                        onTabChange={(id) => setActiveTab(expanded, id)}
                        onClose={handleClose}
                      />
                    ) : null}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}