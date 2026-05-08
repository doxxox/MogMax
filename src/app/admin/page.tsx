"use client";

import { CinematicBackground } from "@/components/landing/CinematicBackground";
import { motion } from "framer-motion";
import { Shield, AlertTriangle, Users, Settings, Activity } from "lucide-react";

export default function AdminDashboard() {
  return (
    <main className="relative min-h-screen p-8">
      <CinematicBackground />

      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex justify-between items-end border-b border-white/10 pb-8">
           <div>
              <div className="text-accent-blue font-black tracking-widest text-xs uppercase mb-2 flex items-center gap-2">
                 <Shield className="h-4 w-4" /> SECURE ADMIN PROTOCOL
              </div>
              <h1 className="text-4xl font-black tracking-tighter text-white uppercase italic">SYSTEM <span className="text-glow">CONTROL</span></h1>
           </div>
           <div className="flex gap-4">
              <div className="px-4 py-2 bg-accent-red/20 border border-accent-red/30 rounded-lg text-accent-red text-xs font-black uppercase tracking-widest animate-pulse">
                 MAINTENANCE: OFF
              </div>
           </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
           <AdminStatCard label="TOTAL USERS" value="48,291" icon={Users} color="text-accent-blue" />
           <AdminStatCard label="SERVER LOAD" value="12%" icon={Activity} color="text-accent-green" />
           <AdminStatCard label="REPORTED MATCHES" value="14" icon={AlertTriangle} color="text-accent-red" />
           <AdminStatCard label="ACTIVE DEPLOY" value="v1.0.4" icon={Settings} color="text-slate-500" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 glass rounded-3xl p-8 border border-white/5 space-y-6">
              <h3 className="text-xl font-black text-white uppercase tracking-widest flex items-center gap-2">
                 <Activity className="h-5 w-5 text-accent-blue" /> LIVE NETWORK TRAFFIC
              </h3>
              <div className="h-64 flex items-end justify-between gap-2 px-4 pb-4 border-b border-white/5">
                 {[40, 70, 45, 90, 65, 30, 80, 55, 95, 40].map((h, i) => (
                    <motion.div 
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      className="w-full bg-accent-blue/20 border-t-2 border-accent-blue/40 rounded-t"
                    />
                 ))}
              </div>
              <div className="flex justify-between text-[10px] font-bold text-slate-600 tracking-widest">
                 <span>12:00PM</span>
                 <span>12:30PM</span>
                 <span>01:00PM</span>
              </div>
           </div>

           <div className="glass rounded-3xl p-8 border border-white/5 space-y-6">
              <h3 className="text-xl font-black text-white uppercase tracking-widest flex items-center gap-2">
                 <AlertTriangle className="h-5 w-5 text-accent-red" /> RECENT FLAGS
              </h3>
              <div className="space-y-4">
                 <FlagItem user="BotUser_42" reason="Potential AI Bypass" time="2m ago" />
                 <FlagItem user="ToxicMogger" reason="Harassment" time="15m ago" />
                 <FlagItem user="DeepfakeTest" reason="Static Image Detected" time="1h ago" />
              </div>
              <button className="w-full py-4 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/10 transition-all">
                 VIEW ALL MODERATION LOGS
              </button>
           </div>
        </div>
      </div>
    </main>
  );
}

function AdminStatCard({ label, value, icon: Icon, color }: any) {
  return (
    <div className="glass rounded-2xl p-6 border border-white/5">
       <Icon className={`h-6 w-6 ${color} mb-4`} />
       <div className="text-3xl font-black text-white tabular-nums">{value}</div>
       <div className="text-[10px] font-bold text-slate-500 tracking-widest uppercase mt-1">{label}</div>
    </div>
  );
}

function FlagItem({ user, reason, time }: any) {
  return (
    <div className="flex justify-between items-center p-3 rounded-lg bg-black/40 border border-white/5">
       <div>
          <div className="text-xs font-black text-white uppercase">{user}</div>
          <div className="text-[10px] text-slate-500 font-bold">{reason}</div>
       </div>
       <div className="text-[10px] text-accent-red font-black uppercase">{time}</div>
    </div>
  );
}
