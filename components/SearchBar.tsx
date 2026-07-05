'use client';

import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, placeholder = 'Search...' }: SearchBarProps) {
  return (
    <div className="relative">
      <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-12 rounded-2xl border-slate-200 bg-white pl-11 pr-11 shadow-sm transition-all focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
      />

      {value && (
        <Button
          size="icon"
          variant="ghost"
          type="button"
          onClick={() => onChange('')}
          className="absolute right-2 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full text-slate-500 hover:bg-slate-100"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}