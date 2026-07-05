'use client';

import { motion } from 'framer-motion';
import {
  LucideIcon,
  TrendingUp,
} from 'lucide-react';

interface Stat {
  label: string;
  value: number | string;
  icon: LucideIcon;
  color: string;
  bg: string;
}

interface StatsCardsProps {
  stats: Stat[];
}

export function StatsCards({
  stats,
}: StatsCardsProps) {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.08,
          },
        },
      }}
      className="grid grid-cols-2 gap-4 lg:grid-cols-4"
    >
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <motion.div
            key={stat.label}
            variants={{
              hidden: {
                opacity: 0,
                y: 20,
              },
              show: {
                opacity: 1,
                y: 0,
              },
            }}
            whileHover={{
              y: -4,
            }}
            transition={{
              duration: 0.25,
            }}
            className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-lg"
          >
            {/* Decorative Gradient */}

            <div
              className={`absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${stat.bg}`}
            />

            <div className="relative">

              <div className="flex items-start justify-between">

                <div>

                  <p className="text-sm font-medium text-slate-500">
                    {stat.label}
                  </p>

                  <motion.h2
                    layout
                    className="mt-2 text-3xl font-black tracking-tight text-slate-900"
                  >
                    {stat.value}
                  </motion.h2>

                </div>

                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl ${stat.color}`}
                >
                  <Icon className="h-6 w-6" />
                </div>

              </div>

              <div className="mt-6 flex items-center gap-2 text-sm text-emerald-600">

                <TrendingUp className="h-4 w-4" />

                <span className="font-medium">
                  Live Data
                </span>

              </div>

            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}