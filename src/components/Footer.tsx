import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/8">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="grid size-7 place-items-center rounded-lg bg-gradient-to-br from-aurora-teal to-aurora-indigo text-xs font-semibold text-ink">
            N
          </div>
          <span className="text-sm font-semibold tracking-tight">
            Northlight Academy
          </span>
        </Link>
        <div className="flex flex-wrap gap-x-7 gap-y-2 text-sm text-fog">
          <Link to="/courses" className="transition-colors hover:text-white">
            Courses
          </Link>
          <Link to="/faculty" className="transition-colors hover:text-white">
            Faculty
          </Link>
          <Link to="/outcomes" className="transition-colors hover:text-white">
            Careers
          </Link>
          <Link to="/about" className="transition-colors hover:text-white">
            Contact
          </Link>
        </div>
        <p className="text-xs text-fog/70">© 2025 Northlight Academy</p>
      </div>
    </footer>
  );
}
