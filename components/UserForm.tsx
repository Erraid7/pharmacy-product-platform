'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import {
  UserPlus,
  Mail,
  Lock,
  Shield,
  Loader2,
} from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const userSchema = z.object({
  email: z.string().email('Please enter a valid email address.'),
  password: z.string().min(6, 'Password must contain at least 6 characters.'),
  role: z.enum(['worker', 'admin']),
});

type UserFormData = z.infer<typeof userSchema>;

interface UserFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: UserFormData) => Promise<void>;
  isLoading?: boolean;
}

export function UserForm({
  open,
  onOpenChange,
  onSubmit,
  isLoading = false,
}: UserFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      role: 'worker',
    },
  });

  const onFormSubmit = async (data: UserFormData) => {
    try {
      await onSubmit(data);
      reset();
      onOpenChange(false);
    } catch (error: any) {
      toast.error(error?.response?.data?.error || error?.message || 'Failed to create user.');
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!isLoading) {
          if (!value) reset();
          onOpenChange(value);
        }
      }}
    >
      <DialogContent className="sm:max-w-md rounded-3xl border-0 bg-white shadow-2xl">
        <DialogHeader className="space-y-4 text-center">
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-sky-600 text-white shadow-lg"
          >
            <UserPlus className="h-8 w-8" />
          </motion.div>

          <div>
            <DialogTitle className="text-2xl font-bold text-slate-900">
              Create User
            </DialogTitle>

            <DialogDescription className="mt-2 text-slate-500">
              Create a new pharmacy staff account.
            </DialogDescription>
          </div>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onFormSubmit)}
          className="mt-2 space-y-5"
        >
          {/* Email */}

          <div className="space-y-2">
            <Label htmlFor="email">
              Email Address
            </Label>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <Input
                id="email"
                type="email"
                placeholder="employee@pharmaflow.com"
                disabled={isLoading}
                autoComplete="email"
                {...register('email')}
                className="h-11 rounded-xl pl-10"
              />
            </div>

            {errors.email && (
              <p className="text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}

          <div className="space-y-2">
            <Label htmlFor="password">
              Password
            </Label>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <Input
                id="password"
                type="password"
                placeholder="Minimum 6 characters"
                autoComplete="new-password"
                disabled={isLoading}
                {...register('password')}
                className="h-11 rounded-xl pl-10"
              />
            </div>

            {errors.password && (
              <p className="text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Role */}

          <div className="space-y-2">
            <Label htmlFor="role">
              Account Role
            </Label>

            <div className="relative">
              <Shield className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 pointer-events-none" />

              <select
                id="role"
                disabled={isLoading}
                {...register('role')}
                className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm font-medium text-slate-700 transition focus:border-cyan-500 focus:outline-none focus:ring-4 focus:ring-cyan-100"
              >
                <option value="worker">
                  👨‍⚕️ Worker
                </option>

                <option value="admin">
                  🛡️ Administrator
                </option>
              </select>
            </div>

            {errors.role && (
              <p className="text-sm text-red-500">
                {errors.role.message}
              </p>
            )}
          </div>

          <DialogFooter className="mt-8 flex-col gap-3 sm:flex-row">
            <Button
              type="button"
              variant="outline"
              disabled={isLoading}
              onClick={() => {
                reset();
                onOpenChange(false);
              }}
              className="h-11 flex-1 rounded-xl"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={!isValid || isLoading}
              className="h-11 flex-1 rounded-xl bg-cyan-600 font-semibold text-white hover:bg-cyan-700"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create User'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}