'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { ModeToggle } from '@/components/mode-toggle';
import { useEffect, useState } from 'react';
import { LogOut, User } from 'lucide-react';

export function Navbar() {
  const router = useRouter();
  const supabase = createClient();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Verificar sesión actual
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    checkUser();

    // Escuchar cambios de sesión
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-primary/10 p-1.5 rounded-lg">
            <span className="text-xl font-bold text-primary">LazyTrip</span>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <Link href="/features" className="hover:text-primary transition-colors">
            Features
          </Link>
          <Link href="/pricing" className="hover:text-primary transition-colors">
            Pricing
          </Link>
          <Link href="/destinations" className="hover:text-primary transition-colors">
            Destinations
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <ModeToggle />

          {user ? (
            <div className="flex items-center gap-2 ml-2">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm" className="gap-2">
                  <User className="h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="gap-2 text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/20"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Salir</span>
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2 ml-2">
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button
                  size="sm"
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
