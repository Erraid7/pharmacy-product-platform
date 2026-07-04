'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Loader2, Pill } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

import { useAuth } from '@/lib/auth-context';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Email is required.')
    .email('Please enter a valid email address.'),
  password: z
    .string()
    .min(1, 'Password is required.')
    .max(100),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();

  const {
    login,
    user,
    isAuthenticated,
    isLoading: authLoading,
    clearError,
  } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setFocus,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    setFocus('email');
    clearError();
  }, [setFocus, clearError]);

  useEffect(() => {
    if (!authLoading && isAuthenticated && user) {
      router.replace('/needed');
      router.refresh();
    }
  }, [authLoading, isAuthenticated, user, router]);

  const onSubmit = async (data: LoginFormData) => {
    if (isSubmitting) return;

    setServerError('');
    setIsSubmitting(true);

    try {
      await login(data.email, data.password);

      toast.success('Welcome back!');

      router.replace('/needed');
      router.refresh();
    } catch (error: any) {
      const message =
        error?.message ||
        'Unable to sign in. Please verify your credentials.';

      setServerError(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <Loader2 className="h-8 w-8 animate-spin text-cyan-600" />
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-linear-to-br from-slate-50 via-white to-cyan-50 px-6 py-12">

      <div className="absolute inset-0">
        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-cyan-200/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-blue-200/20 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-2xl backdrop-blur">

          <div className="mb-8 flex flex-col items-center">

            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500 text-white shadow-lg">
              <Pill size={30} />
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              PharmaFlow
            </h1>

            <p className="mt-2 text-center text-sm text-slate-500">
              Sign in to continue to your pharmacy workspace.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
            noValidate
          >
            <div className="space-y-2">

              <Label htmlFor="email">
                Email
              </Label>

              <Input
                id="email"
                type="email"
                autoComplete="email"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                disabled={isSubmitting}
                placeholder="name@example.com"
                {...register('email')}
                className="h-11"
              />

              {errors.email && (
                <p className="text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">

              <Label htmlFor="password">
                Password
              </Label>

              <div className="relative">

                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  disabled={isSubmitting}
                  placeholder="Enter your password"
                  {...register('password')}
                  className="h-11 pr-11"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-slate-800"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

              </div>

              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {serverError && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {serverError}
              </div>
            )}

            <Button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="h-11 w-full rounded-xl bg-cyan-600 font-semibold text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>

        </div>
      </motion.div>
    </div>
  );
}