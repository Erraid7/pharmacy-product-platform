'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { toast } from 'sonner';
import { LogOut, Users, Package, ShoppingCart } from 'lucide-react';

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
      router.push('/login');
    } catch (error) {
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

  const isActive = (href: string) => pathname === href;

  return (
    <nav className="fixed bottom-0 left-0 right-0 md:sticky md:top-0 md:bottom-auto md:flex md:flex-col md:w-64 bg-white border-t md:border-t-0 md:border-r border-gray-200 z-40">
      <div className="hidden md:flex md:flex-col md:h-screen">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-cyan-600">PharmaFlow</h1>
          <p className="text-sm text-gray-500 mt-1">{user?.email}</p>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 flex flex-col gap-2 p-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Button
                key={item.href}
                variant={active ? 'default' : 'ghost'}
                className={`justify-start h-10 ${
                  active ? 'bg-cyan-500 hover:bg-cyan-600 text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => router.push(item.href)}
              >
                <Icon className="w-4 h-4 mr-2" />
                {item.label}
              </Button>
            );
          })}
        </div>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-200">
          <Button
            variant="outline"
            className="w-full justify-start h-10 text-gray-700"
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            <LogOut className="w-4 h-4 mr-2" />
            {isLoggingOut ? 'Logging out...' : 'Logout'}
          </Button>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden flex items-center justify-around w-full h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <button
              key={item.href}
              onClick={() => router.push(item.href)}
              className={`flex flex-col items-center justify-center w-12 h-12 rounded-lg transition ${
                active ? 'bg-cyan-100 text-cyan-600' : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs mt-1 font-medium">{item.label}</span>
            </button>
          );
        })}
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="flex flex-col items-center justify-center w-12 h-12 rounded-lg text-gray-500 hover:bg-gray-100 transition"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-xs mt-1 font-medium">Logout</span>
        </button>
      </div>
    </nav>
  );
}
