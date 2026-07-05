'use client';

import { useMemo, useState } from 'react';
import { ShoppingCart, Trash2, X, CheckSquare, ListChecks } from 'lucide-react';
import { toast } from 'sonner';

import { useAuth } from '@/lib/auth-context';
import { useProducts, useUnorderProduct, useBulkDeleteProducts } from '@/lib/queries';

import { ProductGrid } from '@/components/ProductGrid';
import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/ui/button';

export default function OrderedPage() {
  const { user } = useAuth();
  const { data: allProducts, isLoading } = useProducts();
  const unorderMutation = useUnorderProduct();
  const bulkDeleteMutation = useBulkDeleteProducts();

  const [search, setSearch] = useState('');
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const canBulkManage = user?.role === 'admin';

  const products = useMemo(() => {
    if (!allProducts) return [];
    return allProducts
      .filter((product) => product.status === 'ordered')
      .filter((product) => product.name.toLowerCase().includes(search.toLowerCase()));
  }, [allProducts, search]);

  const allSelected = products.length > 0 && selectedIds.size === products.length;

  function toggleSelectionMode() {
    setSelectionMode((v) => !v);
    setSelectedIds(new Set());
  }

  function toggleSelect(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleSelectAll() {
    setSelectedIds(allSelected ? new Set() : new Set(products.map((p) => p._id)));
  }

  async function handleUnorder(id: string) {
    if (!confirm('Move this product back to Needed?')) return;
    await unorderMutation.mutateAsync(id);
    toast.success('Product moved back to Needed');
  }

  async function handleBulkDelete() {
    if (selectedIds.size === 0) return;
    const count = selectedIds.size;
    if (!confirm(`Delete ${count} selected product${count !== 1 ? 's' : ''}? This cannot be undone.`)) return;

    await bulkDeleteMutation.mutateAsync(Array.from(selectedIds));
    toast.success(`${count} product${count !== 1 ? 's' : ''} deleted`);
    setSelectedIds(new Set());
    setSelectionMode(false);
  }

  return (
    <>
      <PageHeader
        title="Ordered Products"
        subtitle={`${products.length} ordered product${products.length !== 1 ? 's' : ''}`}
        count={products.length}
        icon={ShoppingCart}
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search ordered products..."
        actionLabel={canBulkManage ? (selectionMode ? 'Cancel' : 'Select') : undefined}
        onAction={canBulkManage ? toggleSelectionMode : undefined}
        actionIcon={selectionMode ? X : ListChecks}
      />

      {selectionMode && (
        <div className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
            <button
              type="button"
              onClick={toggleSelectAll}
              className="flex items-center gap-2 text-sm font-medium text-slate-700"
            >
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-md border-2 ${
                  allSelected ? 'border-cyan-600 bg-cyan-600 text-white' : 'border-slate-300'
                }`}
              >
                <CheckSquare className="h-3.5 w-3.5" />
              </span>
              {allSelected ? 'Deselect all' : 'Select all'}
            </button>

            <span className="text-sm text-slate-500">{selectedIds.size} selected</span>
          </div>
        </div>
      )}

      <ProductGrid
        products={products}
        loading={isLoading}
        currentUser={user}
        emptyTitle="Nothing has been ordered yet"
        emptyDescription={
          search ? 'No ordered products match your search.' : 'Products marked as ordered will appear here.'
        }
        onUnorder={handleUnorder}
        ordering={unorderMutation.isPending}
        selectable={selectionMode}
        selectedIds={selectedIds}
        onToggleSelect={toggleSelect}
      />

      {selectionMode && selectedIds.size > 0 && (
        <div className="fixed inset-x-4 bottom-24 z-40 md:inset-x-auto md:bottom-8 md:left-auto md:right-8">
          <div className="mx-auto flex max-w-md items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-2xl">
            <span className="text-sm font-medium text-slate-700">{selectedIds.size} selected</span>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setSelectedIds(new Set())} className="rounded-xl">
                <X className="mr-1.5 h-4 w-4" />
                Clear
              </Button>

              <Button
                size="sm"
                disabled={bulkDeleteMutation.isPending}
                onClick={handleBulkDelete}
                className="rounded-xl bg-red-600 hover:bg-red-700"
              >
                <Trash2 className="mr-1.5 h-4 w-4" />
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}