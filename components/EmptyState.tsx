import { LucideIcon, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 flex flex-col items-center justify-center py-20 text-center">
      <div className="relative mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-linear-to-br from-cyan-50 to-blue-50 shadow-sm">
        <div className="absolute inset-0 rounded-3xl border border-cyan-100" />

        {Icon ? (
          <Icon className="h-10 w-10 text-cyan-600" />
        ) : (
          <div className="h-10 w-10 rounded-full bg-cyan-100 p-2">
            <Search className="h-6 w-6 text-cyan-600" />
          </div>
        )}
      </div>

      <h2 className="text-2xl font-bold tracking-tight text-slate-900">{title}</h2>

      <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">{description}</p>

      {action && (
        <Button onClick={action.onClick} className="mt-8 rounded-xl bg-cyan-600 px-6 hover:bg-cyan-700">
          {action.label}
        </Button>
      )}
    </div>
  );
}