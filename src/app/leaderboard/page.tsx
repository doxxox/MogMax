"use client";

import { CinematicBackground } from "@/components/landing/CinematicBackground";
import { motion } from "framer-motion";
import { Trophy, TrendingUp, TrendingDown, Hash } from "lucide-react";

const LEADERBOARD_DATA = [
  { rank: 1, name: "GigaChad_99", elo: 3240, winrate: "88%", streak: 12, trend: "up" },
  { rank: 2, name: "MogMaster", elo: 3120, winrate: "82%", streak: 5, trend: "neutral" },
  { rank: 3, name: "JawlineKing", elo: 2980, winrate: "79%", streak: 3, trend: "down" },
  { rank: 4, name: "PSL_God", elo: 2850, winrate: "75%", streak: 0, trend: "up" },
  { rank: 5, name: "ShadowSlayer", elo: 2790, winrate: "74%", streak: 8, trend: "up" },
  { rank: 6, name: "CanthalTilt", elo: 2650, winrate: "71%", streak: 2, trend: "neutral" },
  { rank: 7, name: "Sub3_Enjoyer", elo: 2540, winrate: "68%", streak: 1, trend: "down" },
];

export default function LeaderboardPage() {
  return (
    <main className="relative min-h-screen p-8 md:p-20">
      <CinematicBackground />

      <div className="max-w-6xl mx-auto space-y-12">
        <header className="text-center space-y-4">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white uppercase italic italic">
             GLOBAL <span className="text-accent-purple text-glow">LADDER</span>
          </h1>
          <p className="text-slate-500 font-bold tracking-widest text-xs uppercase">
            SEASON 01 • REAL-TIME RANKINGS • WORLDWIDE
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {LEADERBOARD_DATA.slice(0, 3).map((player, i) => (
             <motion.div
               key={player.name}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
               className={`relative glass rounded-3xl p-8 border-t-4 ${
                 i === 0 ? "border-accent-blue" : i === 1 ? "border-accent-purple" : "border-accent-pink"
               }`}
             >
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black/80 px-4 py-2 rounded-xl border border-white/10 text-2xl font-black italic">
                   #{player.rank}
                </div>
                <div className="text-center space-y-4 mt-4">
                   <div className="h-20 w-20 mx-auto rounded-full bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center">
                      <Trophy className={`h-10 w-10 ${i === 0 ? "text-accent-blue" : "text-white"}`} />
                   </div>
                   <div>
                      <div className="text-2xl font-black text-white">{player.name}</div>
                      <div className="text-accent-blue font-mono font-bold">{player.elo} ELO</div>
                   </div>
                   <div className="flex justify-center gap-4 text-[10px] font-bold text-slate-500 uppercase">
                      <div>WR: {player.winrate}</div>
                      <div>STREAK: {player.streak}</div>
                   </div>
                </div>
             </motion.div>
           ))}
        </div>

        <div className="glass rounded-3xl overflow-hidden border border-white/5">
           <table className="w-full text-left border-collapse">
              <thead>
                 <tr className="bg-white/5 border-b border-white/10">
                    <th className="px-8 py-6 text-[10px] font-black text-slate-500 tracking-[0.3em] uppercase">RANK</th>
                    <th className="px-8 py-6 text-[10px] font-black text-slate-500 tracking-[0.3em] uppercase">MOGGER</th>
                    <th className="px-8 py-6 text-[10px] font-black text-slate-500 tracking-[0.3em] uppercase">ELO</th>
                    <th className="px-8 py-6 text-[10px] font-black text-slate-500 tracking-[0.3em] uppercase">STREAK</th>
                    <th className="px-8 py-6 text-[10px] font-black text-slate-500 tracking-[0.3em] uppercase text-right">TREND</th>
                 </tr>
              </thead>
              <tbody>
                 {LEADERBOARD_DATA.map((player, i) => (
                   <motion.tr 
                     key={player.name}
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     transition={{ delay: i * 0.05 }}
                     className="group hover:bg-white/5 transition-colors cursor-pointer border-b border-white/5 last:border-0"
                   >
                      <td className="px-8 py-6 font-black italic text-slate-500 group-hover:text-white transition-colors">#{player.rank}</td>
                      <td className="px-8 py-6">
                         <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-white/5 border border-white/10" />
                            <span className="font-black text-white uppercase">{player.name}</span>
                         </div>
                      </td>
                      <td className="px-8 py-6 font-mono font-bold text-accent-blue">{player.elo}</td>
                      <td className="px-8 py-6">
                         {player.streak > 0 && (
                            <span className="bg-accent-red/20 text-accent-red px-2 py-1 rounded text-[10px] font-black italic">
                               🔥 {player.streak}
                            </span>
                         )}
                      </td>
                      <td className="px-8 py-6 text-right">
                         {player.trend === "up" && <TrendingUp className="h-4 w-4 text-accent-green inline" />}
                         {player.trend === "down" && <TrendingDown className="h-4 w-4 text-accent-red inline" />}
                         {player.trend === "neutral" && <Hash className="h-4 w-4 text-slate-600 inline" />}
                      </td>
                   </motion.tr>
                 ))}
              </tbody>
           </table>
        </div>
      </div>
    </main>
  );
}
