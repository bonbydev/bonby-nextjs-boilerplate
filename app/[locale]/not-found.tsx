import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("common");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-6xl font-bold">404</h1>
      <h2 className="text-muted-foreground text-xl font-medium">{t("notFound")}</h2>
      <p className="text-muted-foreground">{t("notFoundDescription")}</p>
      <Link
        href="/"
        className="bg-primary text-primary-foreground hover:bg-primary-hover mt-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors"
      >
        {t("goHome")}
      </Link>
    </div>
  );
}
