"use client";

import { useLocale } from "next-intl";
import { useTransition } from "react";

import { locales } from "@/i18n/config";
import { usePathname, useRouter } from "@/i18n/navigation";

const localeLabels: Record<string, string> = {
  en: "EN",
  vi: "VI",
};

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function handleChange(newLocale: string) {
    if (newLocale === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
  }

  return (
    <div className="border-border flex items-center gap-1 rounded-lg border p-0.5">
      {locales.map((loc) => (
        <button
          key={loc}
          type="button"
          disabled={isPending}
          onClick={() => handleChange(loc)}
          className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors disabled:pointer-events-none disabled:opacity-60 ${
            locale === loc
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {localeLabels[loc] || loc.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
