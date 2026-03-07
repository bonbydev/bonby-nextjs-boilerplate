import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { SignInForm } from "@/components/features/auth/sign-in-form";
import { SocialButtons } from "@/components/features/auth/social-buttons";
import { Link } from "@/i18n/navigation";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your account",
};

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function SignInPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("auth.signIn");

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight">{t("title")}</h1>
        <p className="text-muted-foreground">{t("description")}</p>
      </div>

      <div className="border-border bg-card rounded-xl border p-6 shadow-sm">
        <SignInForm />

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="border-divider w-full border-t" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-card text-muted-foreground px-2">{t("orContinueWith")}</span>
          </div>
        </div>

        <SocialButtons />
      </div>

      <p className="text-muted-foreground text-center text-sm">
        {t("noAccount")}{" "}
        <Link href="/sign-up" className="text-primary font-medium hover:underline">
          {t("signUpLink")}
        </Link>
      </p>
    </div>
  );
}
