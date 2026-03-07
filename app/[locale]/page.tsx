import { getTranslations, setRequestLocale } from "next-intl/server";

import { auth } from "@/auth";
import { Link } from "@/i18n/navigation";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("home");
  const session = await auth();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 p-8">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">{t("title")}</h1>
        <p className="text-muted-foreground mx-auto max-w-xl text-lg">{t("description")}</p>
      </div>

      <div className="flex gap-4">
        {session?.user ? (
          <Link
            href="/dashboard"
            className="bg-primary text-primary-foreground hover:bg-primary-hover rounded-lg px-6 py-3 text-sm font-medium transition-colors"
          >
            {t("goToDashboard")}
          </Link>
        ) : (
          <>
            <Link
              href="/sign-in"
              className="bg-primary text-primary-foreground hover:bg-primary-hover rounded-lg px-6 py-3 text-sm font-medium transition-colors"
            >
              {t("signIn")}
            </Link>
            <Link
              href="/sign-up"
              className="border-border hover:bg-secondary-hover rounded-lg border px-6 py-3 text-sm font-medium transition-colors"
            >
              {t("signUp")}
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
