import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { UserButton } from "@/components/features/auth/user-button";
import { APP_NAME } from "@/constants";

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session?.user) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen p-4 sm:p-6">
      <div className="mx-auto grid min-h-[calc(100vh-2rem)] max-w-7xl gap-4 lg:grid-cols-[260px_minmax(0,1fr)] lg:grid-rows-[auto_1fr_auto]">
        <header className="border-border bg-card/80 flex items-center justify-between rounded-[2rem] border px-5 py-4 shadow-[0_18px_60px_var(--shadow)] backdrop-blur lg:col-span-2">
          <div>
            <p className="text-primary text-xs font-black tracking-[0.28em] uppercase">
              {APP_NAME}
            </p>
            <h1 className="text-lg font-black tracking-tight sm:text-xl">Bonby Festival</h1>
          </div>
          <UserButton />
        </header>

        <aside className="border-border bg-card/75 rounded-[2rem] border p-5 shadow-[0_18px_60px_var(--shadow)] backdrop-blur">
          <div className="space-y-6">
            <div>
              <p className="text-primary text-xs font-black tracking-[0.24em] uppercase">
                Navigation
              </p>
              <p className="text-muted-foreground mt-2 text-sm leading-6">
                Festival dashboard shell with a protected home screen.
              </p>
            </div>

            <nav className="space-y-2">
              <Link
                href="/"
                className="bg-primary text-primary-foreground flex rounded-2xl px-4 py-3 text-sm font-semibold"
              >
                Home
              </Link>
            </nav>
          </div>
        </aside>

        <main className="border-border bg-card/75 rounded-[2rem] border p-6 shadow-[0_18px_60px_var(--shadow)] backdrop-blur sm:p-10">
          {children}
        </main>

        <footer className="border-border bg-card/70 text-muted-foreground flex flex-col gap-2 rounded-[2rem] border px-5 py-4 text-sm shadow-[0_18px_60px_var(--shadow)] backdrop-blur sm:flex-row sm:items-center sm:justify-between lg:col-span-2">
          <p>Bonby Festival</p>
          <p>Protected experience for authenticated users.</p>
        </footer>
      </div>
    </div>
  );
}
