'use client';

import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Trash2, Edit3, Check, Undo2, Package, User, Clock3 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface ProductCardProps {
  product: Product;
  isOwner: boolean;
  isAdmin: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onOrder?: () => void;
  onUnorder?: () => void;
  isLoading?: boolean;
  selectable?: boolean;        // new
  selected?: boolean;          // new
  onToggleSelect?: () => void; // new
}

export function ProductCard({
  product,
  isOwner,
  isAdmin,
  onEdit,
  onDelete,
  onOrder,
  onUnorder,
  isLoading = false,
  selectable = false,
  selected = false,
  onToggleSelect,
}: ProductCardProps) {
  const isOrdered = product.status === 'ordered';
  const createdAgo = formatDistanceToNow(new Date(product.createdAt), { addSuffix: true });

  return (
    <article
      onClick={selectable ? onToggleSelect : undefined}
      className={`group overflow-hidden rounded-3xl border bg-white shadow-sm transition-all duration-200 ${
        selectable
          ? `cursor-pointer ${selected ? 'border-cyan-500 ring-2 ring-cyan-100' : 'border-slate-200 hover:border-cyan-300'}`
          : 'border-slate-200 hover:-translate-y-1 hover:border-cyan-200 hover:shadow-xl'
      }`}
    >
      <div className={`h-1 w-full ${isOrdered ? 'bg-emerald-500' : 'bg-cyan-500'}`} />

      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 gap-4">
            {selectable ? (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleSelect?.();
                }}
                aria-label={selected ? 'Deselect product' : 'Select product'}
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border-2 transition-colors ${
                  selected ? 'border-cyan-600 bg-cyan-600 text-white' : 'border-slate-300 text-transparent'
                }`}
              >
                <Check className="h-6 w-6" />
              </button>
            ) : (
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
                  isOrdered ? 'bg-emerald-100 text-emerald-600' : 'bg-cyan-100 text-cyan-600'
                }`}
              >
                <Package className="h-6 w-6" />
              </div>
            )}

            <div className="min-w-0">
              <h3 className="truncate text-lg font-semibold text-slate-900">{product.name}</h3>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                <span className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {product.createdBy?.email ?? 'Unknown'}
                </span>
                <span className="flex items-center gap-1">
                  <Clock3 className="h-4 w-4" />
                  {createdAgo}
                </span>
              </div>
            </div>
          </div>

          <span
            className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${
              isOrdered ? 'bg-emerald-100 text-emerald-700' : 'bg-cyan-100 text-cyan-700'
            }`}
          >
            {isOrdered ? 'Ordered' : 'Needed'}
          </span>
        </div>

        {isOrdered && product.orderedBy && (
          <div className="mt-5 rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3">
            <p className="text-sm text-emerald-800">
              <span className="font-semibold">Ordered by</span> {product.orderedBy.email}
            </p>
          </div>
        )}

        {!selectable && (
          <>
            <div className="my-5 border-t border-slate-100" />
            <div className="flex flex-wrap gap-2">
              {isOwner && !isOrdered && (
                <>
                  <Button variant="outline" size="sm" onClick={onEdit} disabled={isLoading}
                    className="rounded-xl border-slate-200 hover:border-cyan-300 hover:bg-cyan-50">
                    <Edit3 className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" onClick={onDelete} disabled={isLoading}
                    className="rounded-xl border-red-200 text-red-600 hover:border-red-300 hover:bg-red-50">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </>
              )}

              {isAdmin &&
                (isOrdered ? (
                  <Button onClick={onUnorder} disabled={isLoading} variant="outline" size="sm"
                    className="ml-auto rounded-xl border-emerald-200 text-emerald-700 hover:bg-emerald-50">
                    <Undo2 className="mr-2 h-4 w-4" />
                    Move Back
                  </Button>
                ) : (
                  <Button onClick={onOrder} disabled={isLoading} size="sm"
                    className="ml-auto rounded-xl bg-cyan-600 text-white shadow-sm hover:bg-cyan-700">
                    <Check className="mr-2 h-4 w-4" />
                    Mark Ordered
                  </Button>
                ))}
            </div>
          </>
        )}
      </div>
    </article>
  );
}