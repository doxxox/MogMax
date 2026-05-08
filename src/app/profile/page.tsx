"use client";

import { CinematicBackground } from "@/components/landing/CinematicBackground";
import { motion } from "framer-motion";
import { Trophy, Swords, Target, Calendar, Share2, Award } from "lucide-react";

export default function ProfilePage() {
  return (
    <main className="relative min-h-screen p-8 md:p-20">
      <CinematicBackground />

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12">
        {/* Left: User Card */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
           <div className="glass rounded-[40px] p-10 border border-white/5 text-center space-y-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink" />
              
              <div className="relative inline-block">
                 <div className="h-32 w-32 rounded-full bg-gradient-to-br from-white/10 to-white/5 border-2 border-accent-blue p-1">
                    <div className="h-full w-full rounded-full bg-black/40 flex items-center justify-center">
                       <Trophy className="h-12 w-12 text-accent-blue" />
                    </div>
                 </div>
                 <div className="absolute -bottom-2 -right-2 bg-accent-blue text-white p-2 rounded-lg neon-blue">
                    <Award className="h-5 w-5" />
                 </div>
              </div>

              <div>
                 <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic">GIGACHAD_99</h2>
                 <p className="text-accent-blue font-bold tracking-widest text-[10px] uppercase mt-1">MEMBER SINCE MAY 2026</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                    <div className="text-2xl font-black text-white tabular-nums">3,240</div>
                    <div className="text-[8px] font-bold text-slate-500 tracking-widest uppercase">ELO RATING</div>
                 </div>
                 <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                    <div className="text-2xl font-black text-white tabular-nums">#1</div>
                    <div className="text-[8px] font-bold text-slate-500 tracking-widest uppercase">WORLD RANK</div>
                 </div>
              </div>

              <button className="w-full py-4 bg-accent-blue rounded-xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:scale-105 transition-all">
                 <Share2 className="h-4 w-4" /> SHARE PROGRESS
              </button>
           </div>

           <div className="glass rounded-3xl p-6 border border-white/5">
              <h4 className="text-xs font-black text-slate-500 tracking-widest uppercase mb-4">CONNECTED ACCOUNTS</h4>
              <div className="flex items-center gap-3 bg-indigo-600/10 border border-indigo-600/20 p-3 rounded-xl">
                 <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">D</span>
                 </div>
                 <div className="text-left">
                    <div className="text-xs font-black text-white uppercase">GigaChad#0001</div>
                    <div className="text-[9px] text-indigo-400 font-bold">DISCORD VERIFIED</div>
                 </div>
              </div>
           </div>
        </motion.div>

        {/* Right: Stats & History */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <StatBox label="WIN RATE" value="88.2%" icon={Target} color="text-accent-green" />
              <StatBox label="TOTAL MATCHES" value="1,240" icon={Swords} color="text-accent-blue" />
              <StatBox label="PEAK ELO" value="3,450" icon={Trophy} color="text-accent-purple" />
              <StatBox label="WIN STREAK" value="12" icon={Calendar} color="text-accent-pink" />
           </div>

           <div className="glass rounded-3xl p-8 border border-white/5 space-y-6">
              <h3 className="text-xl font-black text-white uppercase tracking-widest">MATCH HISTORY</h3>
              <div className="space-y-4">
                 <MatchItem opponent="MogMaster" result="WIN" elo="+24" psl="9.2" />
                 <MatchItem opponent="JawlineKing" result="WIN" elo="+18" psl="8.9" />
                 <MatchItem opponent="ShadowSlayer" result="LOSS" elo="-12" psl="8.5" />
                 <MatchItem opponent="PSL_God" result="WIN" elo="+20" psl="9.0" />
              </div>
           </div>
        </motion.div>
      </div>
    </main>
  );
}

function StatBox({ label, value, icon: Icon, color }: any) {
  return (
    <div className="glass rounded-2xl p-6 border border-white/5 flex items-center gap-6">
       <div className={`p-4 rounded-xl bg-white/5 border border-white/10 ${color}`}>
          <Icon className="h-6 w-6" />
       </div>
       <div>
          <div className="text-2xl font-black text-white tabular-nums">{value}</div>
          <div className="text-[10px] font-bold text-slate-500 tracking-widest uppercase">{label}</div>
       </div>
    </div>
  );
}

function MatchItem({ opponent, result, elo, psl }: any) {
  return (
    <div className="flex justify-between items-center p-4 rounded-2xl bg-white/5 border border-white/5 group hover:bg-white/10 transition-all">
       <div className="flex items-center gap-4">
          <div className={`w-2 h-2 rounded-full ${result === 'WIN' ? 'bg-accent-green' : 'bg-accent-red'}`} />
          <div>
             <div className="text-xs font-black text-white uppercase">VS {opponent}</div>
             <div className="text-[10px] text-slate-500 font-bold uppercase">{result} • PSL: {psl}</div>
          </div>
       </div>
       <div className={`text-sm font-black italic ${result === 'WIN' ? 'text-accent-green' : 'text-accent-red'}`}>
          {elo}
       </div>
    </div>
  );
}
