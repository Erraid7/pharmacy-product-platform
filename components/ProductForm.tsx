'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Package2, Loader2, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet';

const productSchema = z.object({
  name: z.string().trim().min(1, 'Product name is required').max(255),
});

type ProductFormData = z.infer<typeof productSchema>;

interface ProductFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: ProductFormData) => Promise<void>;
  initialData?: { name: string };
  isLoading?: boolean;
  isMobile?: boolean;
}

export function ProductForm({
  open,
  onOpenChange,
  onSubmit,
  initialData,
  isLoading = false,
  isMobile = false,
}: ProductFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors, isDirty },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: initialData || { name: '' },
  });

  useEffect(() => {
    if (open) {
      reset(initialData || { name: '' });
      const timer = setTimeout(() => setFocus('name'), 150);
      return () => clearTimeout(timer);
    }
  }, [open, initialData, reset, setFocus]);

  const onFormSubmit = async (data: ProductFormData) => {
    try {
      await onSubmit(data);
      reset();
      onOpenChange(false);
    } catch (error: any) {
      toast.error(error?.response?.data?.error ?? 'Something went wrong.');
    }
  };

  const form = (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6 pt-4">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-sm font-semibold text-slate-700">
          Product name
        </Label>

        <div className="relative">
          <Package2 className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <Input
            id="name"
            placeholder="Paracetamol 500mg"
            disabled={isLoading}
            {...register('name')}
            className="h-12 rounded-2xl border-slate-200 bg-slate-50 pl-12 shadow-sm transition-all focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
          />
        </div>

        {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
        <p className="text-xs text-slate-500">Example: Ibuprofen 400mg, Vitamin C, Aspirin...</p>
      </div>

      {isMobile ? (
        <SheetFooter className="mt-8 flex-row gap-3">
          <Button
            type="button"
            variant="outline"
            className="flex-1 rounded-xl"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            disabled={!isDirty || isLoading}
            className="flex-1 rounded-xl bg-cyan-600 hover:bg-cyan-700"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                {initialData ? 'Save' : 'Add'}
              </>
            )}
          </Button>
        </SheetFooter>
      ) : (
        <DialogFooter className="mt-8 gap-3">
          <Button
            type="button"
            variant="outline"
            className="rounded-xl"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            disabled={!isDirty || isLoading}
            className="rounded-xl bg-cyan-600 hover:bg-cyan-700"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                {initialData ? 'Save Changes' : 'Add Product'}
              </>
            )}
          </Button>
        </DialogFooter>
      )}
    </form>
  );

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="bottom" className="rounded-t-3xl border-0 px-6 pb-8">
          <SheetHeader>
            <div className="mx-auto mb-3 h-1.5 w-14 rounded-full bg-slate-300" />
            <SheetTitle className="text-left text-xl">
              {initialData ? 'Edit Product' : 'New Product'}
            </SheetTitle>
            <SheetDescription className="text-left">
              Add a product to the pharmacy needed list.
            </SheetDescription>
          </SheetHeader>
          {form}
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">{initialData ? 'Edit Product' : 'Add Product'}</DialogTitle>
          <DialogDescription>
            Create a new product that your team needs to order.
          </DialogDescription>
        </DialogHeader>
        {form}
      </DialogContent>
    </Dialog>
  );
}