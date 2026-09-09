import { Link } from "@tanstack/react-router";
import { Moon } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/8">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="grid size-7 place-items-center rounded-lg bg-gradient-to-br from-aurora-indigo to-aurora-teal text-xs font-semibold text-ink">
            <Moon className="size-4" />
          </div>
          <span className="text-sm font-semibold tracking-tight">
            Sleep Tracker
          </span>
        </Link>
        <div className="flex flex-wrap gap-x-7 gap-y-2 text-sm text-fog">
          <Link to="/" className="transition-colors hover:text-white">
            Home
          </Link>
          <Link to="/dashboard" className="transition-colors hover:text-white">
            Dashboard
          </Link>
          <Link to="/history" className="transition-colors hover:text-white">
            History
          </Link>
        </div>
        <p className="text-xs text-fog/70">© {new Date().getFullYear()} Sleep Tracker</p>
      </div>
    </footer>
  );
}
