import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-6xl font-bold">404</h1>
      <h2 className="text-muted-foreground text-xl font-medium">Page not found</h2>
      <p className="text-muted-foreground">The page you are looking for does not exist.</p>
      <Link
        href="/"
        className="bg-primary text-primary-foreground hover:bg-primary-hover mt-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors"
      >
        Go home
      </Link>
    </div>
  );
}
