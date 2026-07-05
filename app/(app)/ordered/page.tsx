'use client';

import { useMemo, useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';

import { useAuth } from '@/lib/auth-context';
import { useDeleteProduct, useProducts, useUnorderProduct } from '@/lib/queries';

import { ProductGrid } from '@/components/ProductGrid';
import { PageHeader } from '@/components/PageHeader';

export default function OrderedPage() {
  const { user } = useAuth();
  const { data: allProducts, isLoading } = useProducts();
  const unorderMutation = useUnorderProduct();
  const deleteMutation = useDeleteProduct();

  const [search, setSearch] = useState('');

  const products = useMemo(() => {
    if (!allProducts) return [];
    return allProducts
      .filter((product) => product.status === 'ordered')
      .filter((product) => product.name.toLowerCase().includes(search.toLowerCase()));
  }, [allProducts, search]);

  async function handleUnorder(id: string) {
    if (!confirm('Move this product back to Needed?')) return;
    await unorderMutation.mutateAsync(id);
    toast.success('Product moved back to Needed');
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this product?')) return;
    await deleteMutation.mutateAsync(id);
    toast.success('Product deleted');
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
      />

      <ProductGrid
        products={products}
        loading={isLoading}
        currentUser={user}
        emptyTitle="Nothing has been ordered yet"
        emptyDescription={
          search ? 'No ordered products match your search.' : 'Products marked as ordered will appear here.'
        }
        onDelete={handleDelete}
        onUnorder={handleUnorder}
        ordering={unorderMutation.isPending}
      />
    </>
  );
}