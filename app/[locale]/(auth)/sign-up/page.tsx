import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { SignUpForm } from "@/components/features/auth/sign-up-form";
import { SocialButtons } from "@/components/features/auth/social-buttons";
import { Link } from "@/i18n/navigation";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create a new account",
};

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function SignUpPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("auth.signUp");

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight">{t("title")}</h1>
        <p className="text-muted-foreground">{t("description")}</p>
      </div>

      <div className="border-border bg-card rounded-xl border p-6 shadow-sm">
        <SignUpForm />

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
        {t("hasAccount")}{" "}
        <Link href="/sign-in" className="text-primary font-medium hover:underline">
          {t("signInLink")}
        </Link>
      </p>
    </div>
  );
}
