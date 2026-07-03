'use client';

import { useState, useMemo } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useProducts, useCreateProduct, useDeleteProduct, useOrderProduct } from '@/lib/queries';
import { ProductCard } from '@/components/ProductCard';
import { ProductForm } from '@/components/ProductForm';
import { EmptyState } from '@/components/EmptyState';
import { ProductSkeleton } from '@/components/ProductSkeleton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Package } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

export default function NeededPage() {
  const { user } = useAuth();
  const { data: allProducts, isLoading, refetch } = useProducts();
  const [search, setSearch] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const createMutation = useCreateProduct();
  const deleteMutation = useDeleteProduct();
  const orderMutation = useOrderProduct();

  const products = useMemo(() => {
    if (!allProducts) return [];
    return allProducts
      .filter(p => p.status === 'needed')
      .filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  }, [allProducts, search]);

  const handleCreateProduct = async (data: { name: string }) => {
    try {
      await createMutation.mutateAsync(data);
      toast.success('Product added successfully');
      setFormOpen(false);
      setSearch('');
    } catch (error) {
      throw error;
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteMutation.mutateAsync(id);
        toast.success('Product deleted');
      } catch (error) {
        toast.error('Failed to delete product');
      }
    }
  };

  const handleOrder = async (id: string) => {
    try {
      await orderMutation.mutateAsync(id);
      toast.success('Product marked as ordered');
    } catch (error) {
      toast.error('Failed to mark product as ordered');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="p-4 md:p-6 max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Needed Products</h1>
          
          {/* Search Bar */}
          <div className="flex gap-2">
            <Input
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 h-11"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 md:p-6 max-w-6xl mx-auto pb-24 md:pb-6">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        ) : products.length === 0 ? (
          <EmptyState
            icon={Package}
            title="No needed products"
            description={search ? 'No products match your search' : 'All products have been ordered. Add a new one!'}
            action={{
              label: 'Add Product',
              onClick: () => setFormOpen(true),
            }}
          />
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {products.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <ProductCard
                  product={product}
                  isOwner={product.createdBy._id === user?._id}
                  isAdmin={user?.role === 'admin'}
                  onDelete={() => handleDelete(product._id)}
                  onOrder={() => handleOrder(product._id)}
                  isLoading={deleteMutation.isPending || orderMutation.isPending}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Floating Action Button */}
      <Button
        onClick={() => setFormOpen(true)}
        size="lg"
        className="fixed bottom-24 md:bottom-6 right-4 md:right-6 bg-cyan-500 hover:bg-cyan-600 text-white rounded-full w-14 h-14 shadow-lg flex items-center justify-center"
      >
        <Plus className="w-6 h-6" />
      </Button>

      {/* Add Product Form */}
      <ProductForm
        open={formOpen}
        onOpenChange={setFormOpen}
        onSubmit={handleCreateProduct}
        isLoading={createMutation.isPending}
        isMobile={typeof window !== 'undefined' && window.innerWidth < 768}
      />
    </div>
  );
}
