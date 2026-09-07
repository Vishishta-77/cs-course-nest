import { Link } from "@tanstack/react-router";

export function Header() {
  return (
    <header className="relative z-10 border-b border-white/8">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-aurora-teal to-aurora-indigo text-sm font-semibold text-ink">
            N
          </div>
          <span className="text-[15px] font-semibold tracking-tight">
            Northlight Academy
          </span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-fog sm:flex">
          <Link to="/courses" className="transition-colors hover:text-white">
            Courses
          </Link>
          <Link to="/faculty" className="transition-colors hover:text-white">
            Faculty
          </Link>
          <Link to="/outcomes" className="transition-colors hover:text-white">
            Outcomes
          </Link>
          <Link to="/about" className="transition-colors hover:text-white">
            About
          </Link>
        </nav>
        <Link
          to="/courses"
          className="inline-flex items-center gap-2 rounded-full bg-aurora-teal py-2 pr-3 pl-3 text-sm font-semibold text-ink ring-1 ring-aurora-teal/40 transition-colors hover:bg-aurora-teal/90"
        >
          Browse courses
        </Link>
      </div>
    </header>
  );
}
