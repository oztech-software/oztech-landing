"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";

type ProductKey = "garageSEC" | "toka" | "capibara" | "reluvi";

type ProductItem = {
  key: ProductKey;
};

type ShowcaseImage = {
  id: string;
  src: string;
  tabLabelKey: string;
  altKey: string;
  fit?: "cover" | "contain";
};

type ShowcaseConfig = {
  badges: Array<"demo" | "nda" | "product">;
  images: ShowcaseImage[];
};

const PRODUCTS: readonly ProductItem[] = [
  { key: "garageSEC" },
  { key: "reluvi" },
  { key: "toka" },
  { key: "capibara" },
] as const;

const SHOWCASES: Record<ProductKey, ShowcaseConfig> = {
  garageSEC: {
    badges: ["product", "demo"],
    images: [
      {
        id: "monitor",
        src: "/img/demos/garagesecmonitor.png",
        tabLabelKey: "showcase.tabs.monitor",
        altKey: "showcase.alts.monitor",
        fit: "cover",
      },
    ],
  },

  reluvi: {
    badges: ["product", "demo"],
    images: [
      {
        id: "momentos",
        src: "/img/demos/momentosreluvi.png",
        tabLabelKey: "showcase.tabs.momentos",
        altKey: "showcase.alts.momentos",
        fit: "contain",
      },
      {
        id: "eu",
        src: "/img/demos/reluvieu.png",
        tabLabelKey: "showcase.tabs.eu",
        altKey: "showcase.alts.eu",
        fit: "contain",
      },
    ],
  },

  toka: {
    badges: ["demo", "nda"],
    images: [
      {
        id: "recepcao",
        src: "/img/demos/intranet-recepcao-demo.png",
        tabLabelKey: "showcase.tabs.recepcao",
        altKey: "showcase.alts.recepcao",
        fit: "cover",
      },
      {
        id: "tutor",
        src: "/img/demos/area-tutor-demo.png",
        tabLabelKey: "showcase.tabs.tutor",
        altKey: "showcase.alts.tutor",
        fit: "cover",
      },
    ],
  },

  capibara: {
    badges: ["product", "demo"],
    images: [
      {
        id: "hero",
        src: "/img/demos/herocapi.png",
        tabLabelKey: "showcase.tabs.hero",
        altKey: "showcase.alts.hero",
        fit: "cover",
      },
      {
        id: "preco",
        src: "/img/demos/capipreco.png",
        tabLabelKey: "showcase.tabs.preco",
        altKey: "showcase.alts.preco",
        fit: "cover",
      },
      {
        id: "links",
        src: "/img/demos/capilink.png",
        tabLabelKey: "showcase.tabs.links",
        altKey: "showcase.alts.links",
        fit: "cover",
      },
    ],
  },
};

function Badge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/70">
      {label}
    </span>
  );
}

function ProductCard({
  title,
  description,
  tags,
  isExpanded,
  onToggle,
  hasShowcase,
  openLabel,
  closeLabel,
  hintLabel,
  controlsId,
}: {
  title: string;
  description: string;
  tags: string;
  isExpanded: boolean;
  onToggle: () => void;
  hasShowcase: boolean;
  openLabel: string;
  closeLabel: string;
  hintLabel: string;
  controlsId?: string;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={isExpanded}
      aria-controls={controlsId}
      className={[
        "text-left rounded-2xl border bg-white/5 backdrop-blur-sm p-5 flex flex-col gap-3 transition",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oztech-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-oztech-dark",
        isExpanded
          ? "border-oztech-primary/70"
          : "border-white/10 hover:border-oztech-primary/60",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-sm font-semibold">{title}</h3>

        {hasShowcase ? (
          <span
            className={[
              "shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium",
              isExpanded
                ? "bg-oztech-primary text-black"
                : "border border-white/15 text-white/70",
            ].join(" ")}
          >
            {isExpanded ? closeLabel : openLabel}
          </span>
        ) : null}
      </div>

      <p className="text-xs text-white/70">{description}</p>
      <p className="text-[11px] text-white/50">{tags}</p>

      {hasShowcase ? (
        <p className="text-[11px] text-white/40">{hintLabel}</p>
      ) : null}
    </button>
  );
}

function ProductShowcasePanel({
  id,
  productKey,
  config,
  activeTabId,
  onTabChange,
  secondaryMode = "anchor",
  onClose,
}: {
  id?: string;
  productKey: ProductKey;
  config: ShowcaseConfig;
  activeTabId: string;
  onTabChange: (id: string) => void;
  secondaryMode?: "anchor" | "close";
  onClose?: () => void;
}) {
  const t = useTranslations("Products");

  const activeImage = useMemo(() => {
    return (
      config.images.find((img) => img.id === activeTabId) ?? config.images[0]
    );
  }, [activeTabId, config.images]);

  const fit = activeImage.fit ?? "cover";
  const hasTabs = config.images.length > 1;

  const imageClass =
    fit === "contain"
      ? "object-contain object-center drop-shadow-[0_24px_70px_rgba(0,0,0,0.65)]"
      : "object-cover";

  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 md:p-6"
    >
      <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
        {/* Texto */}
        <div className="space-y-3 md:max-w-[420px]">
          <div className="flex flex-wrap items-center gap-2">
            {config.badges.map((b) => (
              <Badge key={b} label={t(`badges.${b}`)} />
            ))}
          </div>

          <h4 className="text-base md:text-lg font-semibold">
            {t(`${productKey}.showcase.title`)}
          </h4>

          <p className="text-sm text-white/70">
            {t(`${productKey}.showcase.subtitle`)}
          </p>

          <ul className="mt-2 space-y-2 text-sm text-white/70 list-disc pl-5">
            <li>{t(`${productKey}.showcase.bullets.0`)}</li>
            <li>{t(`${productKey}.showcase.bullets.1`)}</li>
            <li>{t(`${productKey}.showcase.bullets.2`)}</li>
          </ul>

          <div className="mt-4 flex flex-col sm:flex-row gap-2">
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full bg-oztech-primary px-5 py-2 text-sm font-semibold text-black hover:brightness-110 transition"
            >
              {t("showcaseCta")}
            </a>

            {secondaryMode === "close" ? (
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-2 text-sm text-white/80 hover:border-white/35 transition"
              >
                {t("showcaseSecondaryCta")}
              </button>
            ) : (
              <a
                href="#products"
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-2 text-sm text-white/80 hover:border-white/35 transition"
              >
                {t("showcaseSecondaryCta")}
              </a>
            )}
          </div>

          <p className="text-[11px] text-white/45">
            {t(`${productKey}.showcase.disclaimer`)}
          </p>
        </div>

        {/* Imagem + Tabs */}
        <div className="w-full md:max-w-[520px]">
          {hasTabs ? (
            <div className="flex flex-wrap gap-2">
              {config.images.map((img) => {
                const isActive = img.id === activeImage.id;
                return (
                  <button
                    key={img.id}
                    type="button"
                    onClick={() => onTabChange(img.id)}
                    className={[
                      "rounded-full px-3 py-1 text-[12px] border transition",
                      isActive
                        ? "bg-white/10 border-white/20 text-white"
                        : "border-white/10 text-white/70 hover:border-white/20",
                    ].join(" ")}
                  >
                    {t(`${productKey}.${img.tabLabelKey}`)}
                  </button>
                );
              })}
            </div>
          ) : null}

          <div className={hasTabs ? "mt-3" : "mt-0"}>
            <div className="rounded-2xl border border-white/10 bg-black/20 overflow-hidden">
              <div
                className={fit === "contain" ? "p-4 md:p-5 bg-black/30" : ""}
              >
                <div className="relative w-full aspect-[16/9]">
                  <Image
                    src={activeImage.src}
                    alt={t(`${productKey}.${activeImage.altKey}`)}
                    fill
                    className={imageClass}
                    sizes="(max-width: 768px) 100vw, 520px"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function ProductsSection() {
  const t = useTranslations("Products");

  const [expanded, setExpanded] = useState<ProductKey | null>(null);
  const [activeTabByProduct, setActiveTabByProduct] = useState<
    Partial<Record<ProductKey, string>>
  >({});

  const expandedConfig = expanded ? SHOWCASES[expanded] : undefined;

  const ensureFirstTab = (key: ProductKey) => {
    const firstTabId = SHOWCASES[key]?.images[0]?.id;
    if (!firstTabId) return;

    setActiveTabByProduct((prev) => {
      if (prev[key]) return prev;
      return { ...prev, [key]: firstTabId };
    });
  };

  const handleToggle = (key: ProductKey) => {
    const hasShowcase = Boolean(SHOWCASES[key]);
    if (!hasShowcase) return;

    const isClosing = expanded === key;
    if (!isClosing) ensureFirstTab(key);

    setExpanded(isClosing ? null : key);
  };

  const currentDesktopTabId =
    expanded && SHOWCASES[expanded]
      ? (activeTabByProduct[expanded] ??
        SHOWCASES[expanded].images[0]?.id ??
        "")
      : "";

  return (
    <section
      id="products"
      className="scroll-mt-24 md:scroll-mt-28 px-4 py-16 md:py-20"
    >
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="text-center space-y-3">
          <p className="text-xs uppercase tracking-[0.25em] text-oztech-primary/80">
            {t("kicker")}
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold">{t("title")}</h2>
          <p className="text-sm md:text-base text-white/70 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          {PRODUCTS.map(({ key }) => {
            const hasShowcase = Boolean(SHOWCASES[key]);
            const panelId = `product-showcase-${key}`;
            const currentMobileTabId = hasShowcase
              ? (activeTabByProduct[key] ?? SHOWCASES[key].images[0]?.id ?? "")
              : "";

            return (
              <React.Fragment key={key}>
                <ProductCard
                  title={t(`${key}.name`)}
                  description={t(`${key}.description`)}
                  tags={t(`${key}.tags`)}
                  isExpanded={expanded === key}
                  onToggle={() => handleToggle(key)}
                  hasShowcase={hasShowcase}
                  openLabel={t("card.open")}
                  closeLabel={t("card.close")}
                  hintLabel={t("card.hint")}
                  controlsId={hasShowcase ? panelId : undefined}
                />

                <div className="md:hidden">
                  <AnimatePresence initial={false}>
                    {expanded === key && hasShowcase ? (
                      <ProductShowcasePanel
                        key={`${key}-mobile`}
                        id={panelId}
                        productKey={key}
                        config={SHOWCASES[key]}
                        activeTabId={currentMobileTabId}
                        onTabChange={(id) =>
                          setActiveTabByProduct((p) => ({ ...p, [key]: id }))
                        }
                        secondaryMode="close"
                        onClose={() => setExpanded(null)}
                      />
                    ) : null}
                  </AnimatePresence>
                </div>
              </React.Fragment>
            );
          })}
        </div>

        <div className="hidden md:block">
          <AnimatePresence initial={false}>
            {expanded && expandedConfig ? (
              <ProductShowcasePanel
                key={`${expanded}-desktop`}
                productKey={expanded}
                config={expandedConfig}
                activeTabId={currentDesktopTabId}
                onTabChange={(id) =>
                  setActiveTabByProduct((p) => ({ ...p, [expanded]: id }))
                }
              />
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
