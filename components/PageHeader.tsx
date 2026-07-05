'use client';

import { Search, RotateCw, X, Sparkles, Plus, LucideIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  count?: number;

  icon?: LucideIcon;

  search?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;

  onRefresh?: () => void;
  isRefreshing?: boolean;

  actionLabel?: string;
  onAction?: () => void;
  actionIcon?: LucideIcon; // new, defaults to Plus
}

export function PageHeader({
  title,
  subtitle,
  count,
  icon: Icon,
  search = '',
  onSearchChange,
  searchPlaceholder = 'Search...',
  onRefresh,
  isRefreshing = false,
  actionLabel,
  onAction,
  actionIcon: ActionIcon = Plus,
}: PageHeaderProps) {
  return (
    <>
      <div className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl supports-backdrop-filter:bg-white/70">
        <div className="mx-auto max-w-7xl px-4 py-5 md:px-8">
          <div className="animate-in fade-in slide-in-from-top-2 duration-300 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-100">
                  {Icon ? (
                    <Icon className="h-5 w-5 text-cyan-700" />
                  ) : (
                    <Sparkles className="h-5 w-5 text-cyan-700" />
                  )}
                </span>
                <p className="text-sm font-medium tracking-wide text-cyan-700">PharmaFlow Workspace</p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-3xl font-black tracking-tight text-slate-900 md:text-4xl">{title}</h1>

                {typeof count === 'number' && (
                  <span className="rounded-full bg-cyan-100 px-3 py-1 text-sm font-semibold text-cyan-700">
                    {count} {count === 1 ? 'item' : 'items'}
                  </span>
                )}
              </div>

              {subtitle && <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">{subtitle}</p>}
            </div>

            <div className="hidden items-center gap-3 md:flex">
              {onRefresh && (
                <Button variant="outline" onClick={onRefresh} disabled={isRefreshing} className="h-11 rounded-xl">
                  <RotateCw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
              )}

              {actionLabel && onAction && (
                <Button
                  onClick={onAction}
                  className="h-11 rounded-xl bg-cyan-600 px-5 shadow-lg shadow-cyan-500/20 hover:bg-cyan-700"
                >
                  <ActionIcon className="h-6 w-6" />
                  {actionLabel}
                </Button>
              )}
            </div>
          </div>

          {onSearchChange && (
            <div className="animate-in fade-in slide-in-from-top-1 duration-300 relative mt-6">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <Input
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={searchPlaceholder}
                className="h-12 rounded-2xl border-slate-200 bg-white pl-12 pr-12 shadow-sm transition-all focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  className="absolute right-4 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full transition hover:bg-slate-100"
                >
                  <X className="h-4 w-4 text-slate-500" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Floating Action Button */}
      {actionLabel && onAction && (
        <Button
          onClick={onAction}
          size="icon"
          className="fixed bottom-24 right-5 z-40 h-14 w-14 rounded-full bg-cyan-600 shadow-xl shadow-cyan-500/30 transition-transform duration-150 hover:bg-cyan-700 active:scale-90 md:hidden"
        >
          <ActionIcon className="h-6 w-6" />
        </Button>
      )}
    </>
  );
}