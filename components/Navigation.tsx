'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { toast } from 'sonner';
import { LogOut, Users, Package, ShoppingCart, Pill } from 'lucide-react';

export function Navigation() {
  const router = useRouter();
  const pathname = usePathname();

  const { user, logout } = useAuth();

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
      toast.success('Logged out successfully');
      router.replace('/login');
    } catch {
      toast.error('Logout failed');
    } finally {
      setIsLoggingOut(false);
    }
  };

  const navItems = [
    { href: '/needed', label: 'Needed', icon: Package },
    { href: '/ordered', label: 'Ordered', icon: ShoppingCart },
    ...(user?.role === 'admin' ? [{ href: '/users', label: 'Users', icon: Users }] : []),
  ];

  const active = (href: string) => pathname === href;

  return (
    <>
      {/* ================= Desktop Sidebar ================= */}
      <aside className="hidden md:flex md:w-72 md:flex-col border-r border-slate-200 bg-white/75 backdrop-blur-xl shadow-sm">
        <div className="p-8 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-600 text-white shadow-md">
              <Pill className="w-7 h-7" />
            </div>
            <div>
              <h1 className="font-bold text-xl tracking-tight">PharmaFlow</h1>
              <p className="text-sm text-slate-500">Pharmacy Dashboard</p>
            </div>
          </div>
        </div>

        <div className="p-5">
          <div className="mb-8 rounded-2xl bg-slate-50 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-100 text-cyan-700 font-semibold">
                {user?.email.charAt(0).toUpperCase()}
              </div>
              <div className="overflow-hidden">
                <p className="truncate font-semibold">{user?.email}</p>
                <p className="text-sm text-slate-500 capitalize">{user?.role}</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.href}
                  variant="ghost"
                  onClick={() => router.push(item.href)}
                  className={`w-full justify-start rounded-2xl h-12 transition-all duration-150 hover:translate-x-1 ${
                    active(item.href)
                      ? 'bg-cyan-600 text-white shadow-md hover:bg-cyan-700 hover:translate-x-0'
                      : 'hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.label}
                </Button>
              );
            })}
          </div>
        </div>

        <div className="mt-auto p-5 border-t border-slate-100">
          <Button
            variant="outline"
            disabled={isLoggingOut}
            onClick={handleLogout}
            className="w-full justify-start rounded-2xl h-12"
          >
            <LogOut className="mr-3 h-5 w-5" />
            {isLoggingOut ? 'Logging out...' : 'Logout'}
          </Button>
        </div>
      </aside>

      {/* ================= Mobile Navigation ================= */}
      <nav className="fixed bottom-4 left-4 right-4 z-50 md:hidden">
        <div className="rounded-3xl border border-slate-200 bg-white/90 backdrop-blur-xl shadow-2xl">
          <div className="flex h-18 items-center justify-around px-2 py-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isCurrent = active(item.href);

              return (
                <button
                  key={item.href}
                  onClick={() => router.push(item.href)}
                  className="flex flex-1 justify-center"
                >
                  <div
                    className={`flex h-14 w-16 flex-col items-center justify-center rounded-2xl transition-all duration-200 active:scale-90 ${
                      isCurrent ? 'bg-cyan-600' : 'bg-transparent'
                    }`}
                  >
                    <Icon className={`h-5 w-5 ${isCurrent ? 'text-white' : 'text-slate-500'}`} />
                    <span className={`mt-1 text-[11px] font-medium ${isCurrent ? 'text-white' : 'text-slate-500'}`}>
                      {item.label}
                    </span>
                  </div>
                </button>
              );
            })}

            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="flex flex-1 justify-center"
            >
              <div className="flex h-14 w-16 flex-col items-center justify-center rounded-2xl text-slate-500 transition-colors duration-150 hover:bg-slate-100 active:scale-90">
                <LogOut className="h-5 w-5" />
                <span className="mt-1 text-[11px] font-medium">Logout</span>
              </div>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}