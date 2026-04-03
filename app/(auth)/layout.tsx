export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(163,230,53,0.26),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(77,124,15,0.2),_transparent_28%)]" />
      <div className="relative w-full max-w-md">{children}</div>
    </div>
  );
}
