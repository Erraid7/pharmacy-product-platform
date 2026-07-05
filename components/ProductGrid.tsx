'use client';

import { EmptyState } from '@/components/EmptyState';
import { ProductCard } from '@/components/ProductCard';
import { ProductSkeleton } from '@/components/ProductSkeleton';

import { Product, User } from '@/types';

interface ProductGridProps {
  products: Product[];
  loading: boolean;
  currentUser: User | null;

  emptyTitle: string;
  emptyDescription: string;

  emptyAction?: {
    label: string;
    onClick: () => void;
  };

  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
  onOrder?: (id: string) => void;
  onUnorder?: (id: string) => void;

  deleting?: boolean;
  ordering?: boolean;
  editing?: boolean;

  selectable?: boolean;                    // new
  selectedIds?: Set<string>;               // new
  onToggleSelect?: (id: string) => void;
}

export function ProductGrid({
  products,
  loading,
  currentUser,
  emptyTitle,
  emptyDescription,
  emptyAction,
  onDelete,
  onEdit,
  onOrder,
  onUnorder,
  deleting = false,
  ordering = false,
  editing = false,
  selectable = false,
  selectedIds = new Set(),
  onToggleSelect,
}: ProductGridProps) {
  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 pb-28 pt-6 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <ProductSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 pb-28 pt-10 sm:px-6 lg:px-8">
        <EmptyState title={emptyTitle} description={emptyDescription} action={emptyAction} />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 pb-28 pt-6 sm:px-6 lg:px-8">
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {products.map((product, index) => (
          <div
            key={product._id}
            style={{ animationDelay: `${Math.min(index * 30, 300)}ms` }}
            className="animate-in fade-in slide-in-from-bottom-2 fill-mode-both duration-300"
          >
            <ProductCard
              product={product}
              isOwner={product.createdBy?._id === currentUser?._id}
              isAdmin={currentUser?.role === 'admin'}
              onDelete={onDelete ? () => onDelete(product._id) : undefined}
              onEdit={onEdit ? () => onEdit(product._id) : undefined}
              onOrder={onOrder ? () => onOrder(product._id) : undefined}
              onUnorder={onUnorder ? () => onUnorder(product._id) : undefined}
              isLoading={deleting || ordering || editing}
              selectable={selectable}
              selected={selectedIds?.has(product._id)}
              onToggleSelect={onToggleSelect ? () => onToggleSelect(product._id) : undefined}
            />
          </div>
        ))}
      </div>
    </div>
  );
}