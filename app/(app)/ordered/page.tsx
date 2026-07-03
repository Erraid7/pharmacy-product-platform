'use client';

import { useState, useMemo } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useProducts, useUnorderProduct } from '@/lib/queries';
import { ProductCard } from '@/components/ProductCard';
import { EmptyState } from '@/components/EmptyState';
import { ProductSkeleton } from '@/components/ProductSkeleton';
import { Input } from '@/components/ui/input';
import { ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

export default function OrderedPage() {
  const { user } = useAuth();
  const { data: allProducts, isLoading } = useProducts();
  const [search, setSearch] = useState('');
  const unorderMutation = useUnorderProduct();

  const products = useMemo(() => {
    if (!allProducts) return [];
    return allProducts
      .filter(p => p.status === 'ordered')
      .filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  }, [allProducts, search]);

  const handleUnorder = async (id: string) => {
    if (confirm('Move this product back to needed?')) {
      try {
        await unorderMutation.mutateAsync(id);
        toast.success('Product moved back to needed');
      } catch (error) {
        toast.error('Failed to update product');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="p-4 md:p-6 max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Ordered Products</h1>
          
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
      <div className="p-4 md:p-6 max-w-6xl mx-auto pb-6">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        ) : products.length === 0 ? (
          <EmptyState
            icon={ShoppingCart}
            title="No ordered products"
            description={search ? 'No products match your search' : 'No products have been ordered yet'}
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
                  onUnorder={() => handleUnorder(product._id)}
                  isLoading={unorderMutation.isPending}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
