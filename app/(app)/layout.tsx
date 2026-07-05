'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Loader2, Pill } from 'lucide-react';

import { useAuth } from '@/lib/auth-context';
import { Navigation } from '@/components/Navigation';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const {
    user,
    isLoading,
  } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/login');
    }
  }, [isLoading, user, router]);

  if (isLoading) {
    return (
      <div
        className="
          relative
          flex
          min-h-screen
          items-center
          justify-center
          overflow-hidden
          bg-gradient-to-br
          from-slate-50
          via-white
          to-cyan-50
        "
      >
        {/* Background */}

        <div className="absolute inset-0">

          <div
            className="
              absolute
              left-0
              top-0
              h-80
              w-80
              rounded-full
              bg-cyan-200/20
              blur-3xl
            "
          />

          <div
            className="
              absolute
              bottom-0
              right-0
              h-80
              w-80
              rounded-full
              bg-blue-200/20
              blur-3xl
            "
          />

        </div>

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.95,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.3,
          }}
          className="
            relative
            z-10
            flex
            flex-col
            items-center
          "
        >
          <div
            className="
              mb-5
              flex
              h-18
              w-18
              items-center
              justify-center
              rounded-3xl
              bg-cyan-600
              text-white
              shadow-xl
            "
          >
            <Pill size={34} />
          </div>

          <Loader2 className="h-8 w-8 animate-spin text-cyan-600" />

          <p className="mt-4 text-sm font-medium text-slate-500">
            Loading PharmaFlow...
          </p>
        </motion.div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div
      className="
        min-h-screen
        bg-gradient-to-br
        from-slate-50
        via-white
        to-cyan-50
      "
    >
      <Navigation />

      <main
        className="
          flex-1
          md:ml-72
          pb-24
          md:pb-10
        "
      >
        <motion.div
          initial={{
            opacity: 0,
            y: 18,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.25,
          }}
          className="
            mx-auto
            w-full
            max-w-7xl
            px-4
            py-6
            sm:px-6
            lg:px-8
          "
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}