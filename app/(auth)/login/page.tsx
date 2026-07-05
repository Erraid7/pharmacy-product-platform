'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Loader2, Pill, ShieldCheck, Package, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

import { useAuth } from '@/lib/auth-context';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const loginSchema = z.object({
  email: z.string().trim().min(1, 'Email is required.').email('Please enter a valid email address.'),
  password: z.string().min(1, 'Password is required.').max(100),
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
    defaultValues: { email: '', password: '' },
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
      const message = error?.message || 'Unable to sign in. Please verify your credentials.';
      setServerError(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <div className="animate-in fade-in zoom-in-95 duration-300 flex flex-col items-center gap-5">
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-linear-to-br from-cyan-500 to-sky-600 shadow-2xl">
            <Pill className="h-10 w-10 text-white" />
          </div>
          <Loader2 className="h-8 w-8 animate-spin text-cyan-400" />
          <p className="text-sm text-slate-400">Loading PharmaFlow...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen overflow-hidden bg-slate-950">
      {/* ================= Background ================= */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#0891b255,transparent_35%),radial-gradient(circle_at_bottom_right,#2563eb33,transparent_35%)]" />

        {/* Static-position, CSS-only ambient blobs (no per-frame JS) */}
        <div className="animate-float absolute -left-32 -top-32 h-105 w-105 rounded-full bg-cyan-500/20 blur-[130px]" />
        <div className="animate-float-delayed absolute -right-32 bottom-0 h-105 w-105 rounded-full bg-blue-600/20 blur-[140px]" />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[48px_48px]" />
      </div>

      {/* ================= Left Branding ================= */}
      <div className="animate-in fade-in slide-in-from-left-8 duration-500 relative hidden flex-1 xl:flex">
        <div className="flex max-w-xl flex-col justify-center px-20">
          <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-4xl bg-linear-to-br from-cyan-500 to-sky-600 shadow-[0_20px_70px_rgba(6,182,212,0.35)]">
            <Pill className="h-12 w-12 text-white" />
          </div>

          <span className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-300">
            <Sparkles className="h-4 w-4" />
            Pharmacy Management Platform
          </span>

          <h1 className="text-6xl font-black leading-tight tracking-tight text-white">PharmaFlow</h1>

          <p className="mt-8 text-xl leading-9 text-slate-300">
            A modern collaborative workspace that helps pharmacy teams organize needed products, manage
            orders, and streamline inventory in one secure platform.
          </p>

          <div className="mt-14 space-y-5">
            <div className="flex items-center gap-4 text-slate-200">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/15">
                <Package className="h-5 w-5 text-cyan-400" />
              </div>
              <div>
                <h3 className="font-semibold">Product Tracking</h3>
                <p className="text-sm text-slate-400">Organize needed and ordered products effortlessly.</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-slate-200">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/15">
                <ShieldCheck className="h-5 w-5 text-emerald-400" />
              </div>
              <div>
                <h3 className="font-semibold">Secure Access</h3>
                <p className="text-sm text-slate-400">Protected authentication with role-based permissions.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= Login Card ================= */}
      <div className="relative z-10 flex w-full items-center justify-center px-6 py-12 lg:w-[42%]">
        <div className="animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-500 w-full max-w-md">
          <div className="overflow-hidden rounded-4xl border border-white/10 bg-white/90 shadow-[0_30px_80px_rgba(15,23,42,.28)] backdrop-blur-2xl">
            <div className="h-2 w-full bg-linear-to-r from-cyan-500 via-sky-500 to-blue-600" />

            <div className="p-8 sm:p-10">
              {/* Mobile Logo */}
              <div className="mb-8 flex flex-col items-center xl:hidden">
                <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-[1.6rem] bg-linear-to-br from-cyan-500 to-sky-600 shadow-xl">
                  <Pill className="h-10 w-10 text-white" />
                </div>
                <h1 className="text-3xl font-black tracking-tight text-slate-900">PharmaFlow</h1>
                <p className="mt-2 text-center text-sm text-slate-500">Pharmacy Product Management Platform</p>
              </div>

              {/* Desktop Title */}
              <div className="mb-8 hidden xl:block">
                <span className="inline-flex items-center rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-700">
                  Welcome Back
                </span>
                <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-900">Sign In</h2>
                <p className="mt-3 text-slate-500">
                  Enter your credentials to continue managing your pharmacy.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="font-semibold text-slate-700">
                    Email Address
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
                    className="h-12 rounded-xl border-slate-200 bg-white transition-all focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                  />
                  {errors.email && (
                    <p className="animate-in fade-in slide-in-from-top-1 text-sm font-medium text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="font-semibold text-slate-700">
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
                      className="h-12 rounded-xl border-slate-200 pr-12 transition-all focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-4 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-lg p-1 text-slate-400 transition hover:bg-slate-100 hover:text-cyan-600"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="animate-in fade-in slide-in-from-top-1 text-sm font-medium text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {serverError && (
                  <div className="animate-in fade-in slide-in-from-top-1 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                    {serverError}
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={!isValid || isSubmitting}
                  className="group h-13 w-full rounded-2xl bg-linear-to-r from-cyan-600 via-sky-600 to-blue-600 text-base font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-cyan-500/30"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Signing In...
                    </>
                  ) : (
                    <>
                      Sign In
                      <span className="ml-2 inline-block transition-transform duration-150 group-hover:translate-x-1">
                        →
                      </span>
                    </>
                  )}
                </Button>
              </form>

              {/* Divider */}
              <div className="my-8 flex items-center">
                <div className="h-px flex-1 bg-slate-200" />
                <span className="px-4 text-xs font-semibold uppercase tracking-widest text-slate-400">
                  Secure Authentication
                </span>
                <div className="h-px flex-1 bg-slate-200" />
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-2xl bg-slate-50 p-4 text-center transition-colors hover:bg-cyan-50">
                  <ShieldCheck className="mx-auto mb-2 h-6 w-6 text-cyan-600" />
                  <p className="text-xs font-semibold text-slate-600">Protected</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4 text-center transition-colors hover:bg-cyan-50">
                  <Package className="mx-auto mb-2 h-6 w-6 text-cyan-600" />
                  <p className="text-xs font-semibold text-slate-600">Inventory</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4 text-center transition-colors hover:bg-cyan-50">
                  <Sparkles className="mx-auto mb-2 h-6 w-6 text-cyan-600" />
                  <p className="text-xs font-semibold text-slate-600">Modern UI</p>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-10 border-t border-slate-200 pt-6">
                <p className="text-center text-sm text-slate-500">
                  PharmaFlow
                  <span className="mx-2 text-slate-300">•</span>
                  Pharmacy Product Management Platform
                </p>
                <p className="mt-2 text-center text-xs text-slate-400">
                  Built for fast and collaborative pharmacy teams.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}