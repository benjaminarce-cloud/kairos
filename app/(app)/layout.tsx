import Link from "next/link";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen px-6 py-7 sm:px-10 lg:px-12">
      <header className="mb-12 flex flex-col gap-5 border-b border-[#2A2520] pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Link href="/" className="font-serif-display text-3xl font-semibold">
            Kairos
          </Link>
          <p className="mt-2 text-sm text-[#A39B8E]">
            Calm drafting from Canvas context.
          </p>
        </div>
        <nav className="flex gap-5 text-sm text-[#A39B8E]">
          <Link
            href="/dashboard"
            className="transition-colors hover:text-[#F5F1EA]"
          >
            Dashboard
          </Link>
          <Link
            href="/connect"
            className="transition-colors hover:text-[#F5F1EA]"
          >
            Connect
          </Link>
        </nav>
      </header>
      {children}
    </div>
  );
}
