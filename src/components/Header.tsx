import { Link, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Moon, Menu, X } from "lucide-react";

export function Header() {
  const router = useRouter();
  const [user, setUser] = useState<{ email: string | null } | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user ? { email: data.user.email ?? null } : null);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" || event === "SIGNED_OUT" || event === "USER_UPDATED") {
        setUser(session?.user ? { email: session.user.email ?? null } : null);
        router.invalidate();
      }
    });
    return () => listener.subscription.unsubscribe();
  }, [router]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    await router.navigate({ to: "/", replace: true });
  };

  return (
    <header className="relative z-10 border-b border-white/8">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-aurora-indigo to-aurora-teal text-sm font-semibold text-ink">
            <Moon className="size-4" />
          </div>
          <span className="text-[15px] font-semibold tracking-tight">
            Sleep Tracker
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-fog sm:flex">
          {user ? (
            <>
              <Link to="/dashboard" className="transition-colors hover:text-white">
                Dashboard
              </Link>
              <Link to="/history" className="transition-colors hover:text-white">
                History
              </Link>
              <span className="max-w-[16ch] truncate text-white/70">{user.email}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSignOut}
                className="text-fog hover:bg-white/5 hover:text-white"
              >
                Sign out
              </Button>
            </>
          ) : (
            <>
              <Link to="/" className="transition-colors hover:text-white">
                Home
              </Link>
              <Link
                to="/auth"
                className="inline-flex items-center gap-2 rounded-full bg-aurora-teal py-2 pr-4 pl-4 text-sm font-semibold text-ink ring-1 ring-aurora-teal/40 transition-colors hover:bg-aurora-teal/90"
              >
                Sign in
              </Link>
            </>
          )}
        </nav>

        <button
          className="sm:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/8 px-6 py-4 sm:hidden">
          <div className="flex flex-col gap-4 text-sm text-fog">
            {user ? (
              <>
                <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="hover:text-white">
                  Dashboard
                </Link>
                <Link to="/history" onClick={() => setMobileOpen(false)} className="hover:text-white">
                  History
                </Link>
                <span className="text-white/70">{user.email}</span>
                <button onClick={handleSignOut} className="text-left hover:text-white">
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link to="/" onClick={() => setMobileOpen(false)} className="hover:text-white">
                  Home
                </Link>
                <Link to="/auth" onClick={() => setMobileOpen(false)} className="text-aurora-teal hover:underline">
                  Sign in
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
