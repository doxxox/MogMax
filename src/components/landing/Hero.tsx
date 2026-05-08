"use client";

import { motion } from "framer-motion";
import { ChevronRight, Shield, Swords, TrendingUp, Users } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-4 pt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent-blue/20 bg-accent-blue/5 px-4 py-1.5 text-xs font-bold tracking-widest text-accent-blue uppercase glass">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-blue opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-blue"></span>
          </span>
          SEASON 01 ACTIVE
        </div>

        <h1 className="max-w-4xl text-5xl md:text-8xl font-black tracking-tighter text-white sm:text-7xl">
          THE INTERNET'S FIRST <br />
          <span className="text-glow bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink bg-clip-text text-transparent">
            AI MOG ARENA
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-slate-400 font-medium md:text-xl mx-auto">
          Face strangers. Get scanned. Climb the leaderboard. <br className="hidden md:block" />
          The most competitive AI facial analysis platform ever built.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/arena">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group relative flex items-center gap-2 overflow-hidden rounded-xl bg-accent-blue px-8 py-4 text-sm font-black uppercase tracking-widest text-white neon-blue transition-all"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
              <Swords className="h-5 w-5" />
              JOIN MATCH
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </Link>

          <Link href="/scan">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-8 py-4 text-sm font-black uppercase tracking-widest text-white glass hover:bg-white/10 transition-all"
            >
              <Shield className="h-5 w-5" />
              SOLO PSL SCAN
            </motion.button>
          </Link>
        </div>
      </motion.div>

      {/* Live Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="mt-24 grid w-full max-w-5xl grid-cols-2 gap-4 md:grid-cols-4"
      >
        {[
          { label: "USERS ONLINE", value: "1,284", icon: Users, color: "text-accent-blue" },
          { label: "ACTIVE MATCHES", value: "432", icon: Swords, color: "text-accent-purple" },
          { label: "TOP ELO", value: "2,940", icon: TrendingUp, color: "text-accent-pink" },
          { label: "QUEUED", value: "87", icon: Shield, color: "text-accent-green" },
        ].map((stat, i) => (
          <div key={i} className="glass flex flex-col items-center justify-center rounded-2xl p-6 text-center border-white/5">
            <stat.icon className={`mb-3 h-6 w-6 ${stat.color}`} />
            <div className="text-2xl font-black text-white tabular-nums tracking-tighter">
              {stat.value}
            </div>
            <div className="text-[10px] font-bold tracking-[0.2em] text-slate-500 uppercase">
              {stat.label}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
