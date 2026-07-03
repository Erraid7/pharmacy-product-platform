'use client';

import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Trash2, Edit, Check } from 'lucide-react';
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
}: ProductCardProps) {
  const isOrdered = product.status === 'ordered';
  const timeAgo = formatDistanceToNow(new Date(product.createdAt), { addSuffix: true });

  return (
    <div
      className={`p-4 rounded-xl border-2 transition-all ${
        isOrdered
          ? 'border-green-200 bg-green-50'
          : 'border-orange-200 bg-orange-50'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 text-lg">{product.name}</h3>
          <p className="text-sm text-gray-600 mt-1">
            Added by <span className="font-medium">{product.createdBy.email}</span>
          </p>
          <p className="text-xs text-gray-500 mt-1">{timeAgo}</p>
        </div>
        <div
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            isOrdered
              ? 'bg-green-200 text-green-800'
              : 'bg-orange-200 text-orange-800'
          }`}
        >
          {isOrdered ? 'Ordered' : 'Needed'}
        </div>
      </div>

      {isOrdered && product.orderedBy && (
        <p className="text-sm text-gray-600 mb-3">
          Ordered by <span className="font-medium">{product.orderedBy.email}</span>
        </p>
      )}

      <div className="flex gap-2 flex-wrap">
        {isOwner && !isOrdered && (
          <>
            <Button
              size="sm"
              variant="outline"
              onClick={onEdit}
              disabled={isLoading}
              className="text-gray-700 border-gray-300 hover:bg-gray-100"
            >
              <Edit className="w-4 h-4 mr-1" />
              Edit
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={onDelete}
              disabled={isLoading}
              className="text-red-600 border-red-300 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Delete
            </Button>
          </>
        )}

        {isAdmin && (
          isOrdered ? (
            <Button
              size="sm"
              variant="outline"
              onClick={onUnorder}
              disabled={isLoading}
              className="text-green-600 border-green-300 hover:bg-green-50"
            >
              Move Back to Needed
            </Button>
          ) : (
            <Button
              size="sm"
              onClick={onOrder}
              disabled={isLoading}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              <Check className="w-4 h-4 mr-1" />
              Mark Ordered
            </Button>
          )
        )}
      </div>
    </div>
  );
}
