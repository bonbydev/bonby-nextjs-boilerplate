"use client";

import { useLocale } from "next-intl";

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

  function handleChange(newLocale: string) {
    router.replace(pathname, { locale: newLocale });
  }

  return (
    <div className="border-border flex items-center gap-1 rounded-lg border p-0.5">
      {locales.map((loc) => (
        <button
          key={loc}
          onClick={() => handleChange(loc)}
          className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
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
