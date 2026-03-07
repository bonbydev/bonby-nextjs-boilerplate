import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your dashboard",
};

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function DashboardPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [session, t] = await Promise.all([auth(), getTranslations("dashboard")]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">{t("title")}</h2>
        <p className="text-muted-foreground mt-1">
          {t("welcome", { name: session?.user?.name || session?.user?.email || "" })}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="border-border rounded-xl border p-6">
          <h3 className="text-muted-foreground text-sm font-medium">{t("role")}</h3>
          <p className="mt-2 text-2xl font-semibold">{session?.user?.role || "USER"}</p>
        </div>
        <div className="border-border rounded-xl border p-6">
          <h3 className="text-muted-foreground text-sm font-medium">{t("email")}</h3>
          <p className="mt-2 text-lg font-semibold">{session?.user?.email}</p>
        </div>
        <div className="border-border rounded-xl border p-6">
          <h3 className="text-muted-foreground text-sm font-medium">{t("userId")}</h3>
          <p className="mt-2 truncate font-mono text-sm">{session?.user?.id}</p>
        </div>
      </div>
    </div>
  );
}
