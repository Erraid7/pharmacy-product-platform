'use client';

import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { Package } from 'lucide-react';

import { useAuth } from '@/lib/auth-context';
import {
  useCreateProduct,
  useDeleteProduct,
  useOrderProduct,
  useProducts,
} from '@/lib/queries';

import { ProductForm } from '@/components/ProductForm';
import { ProductGrid } from '@/components/ProductGrid';
import { PageHeader } from '@/components/PageHeader';

export default function NeededPage() {
  const { user } = useAuth();

  const { data: allProducts, isLoading } = useProducts();

  const createMutation = useCreateProduct();
  const deleteMutation = useDeleteProduct();
  const orderMutation = useOrderProduct();

  const [search, setSearch] = useState('');
  const [formOpen, setFormOpen] = useState(false);

  const products = useMemo(() => {
    if (!allProducts) return [];

    return allProducts
      .filter((product) => product.status === 'needed')
      .filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
  }, [allProducts, search]);

  async function handleCreateProduct(data: { name: string }) {
    await createMutation.mutateAsync(data);

    toast.success('Product added successfully');
    setFormOpen(false);
    setSearch('');
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this product?')) return;

    await deleteMutation.mutateAsync(id);

    toast.success('Product deleted');
  }

  async function handleOrder(id: string) {
    await orderMutation.mutateAsync(id);

    toast.success('Product marked as ordered');
  }

  return (
    <>
      <PageHeader
        title="Needed Products"
        subtitle={`${products.length} product${
          products.length !== 1 ? 's' : ''
        } waiting to be ordered`}
        icon={Package}
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search medicines..."
        actionLabel="Add Product"
        onAction={() => setFormOpen(true)}
      />

      <ProductGrid
        products={products}
        loading={isLoading}
        currentUser={user}
        emptyTitle="Everything is ordered 🎉"
        emptyDescription={
          search
            ? 'No products match your search.'
            : 'Add a product when something needs to be purchased.'
        }
        emptyAction={{
          label: 'Add Product',
          onClick: () => setFormOpen(true),
        }}
        onDelete={handleDelete}
        onOrder={handleOrder}
        deleting={deleteMutation.isPending}
        ordering={orderMutation.isPending}
      />

      <ProductForm
        open={formOpen}
        onOpenChange={setFormOpen}
        onSubmit={handleCreateProduct}
        isLoading={createMutation.isPending}
      />
    </>
  );
}