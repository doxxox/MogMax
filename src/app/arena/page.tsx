"use client";

import { useState, useEffect } from "react";
import { WebcamFrame } from "@/components/arena/WebcamFrame";
import { useMatchmaking } from "@/hooks/useMatchmaking";
import { CinematicBackground } from "@/components/landing/CinematicBackground";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Swords, Trophy, X } from "lucide-react";

export default function ArenaPage() {
  const { status, matchId, opponent, startSearch, cancelSearch } = useMatchmaking();
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    async function getStream() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setLocalStream(stream);
      } catch (err) {
        console.error("Webcam access denied", err);
      }
    }
    getStream();
  }, []);

  return (
    <main className="relative min-h-screen p-4 md:p-8 flex flex-col items-center justify-center">
      <CinematicBackground />

      {/* Top Bar Stats */}
      <div className="fixed top-0 left-0 right-0 p-6 flex justify-between items-center pointer-events-none">
        <div className="flex items-center gap-6">
           <div className="bg-black/60 px-4 py-2 rounded-lg border border-white/10 glass pointer-events-auto">
              <div className="text-[10px] font-black text-slate-500 tracking-widest uppercase">CURRENT RANK</div>
              <div className="text-xl font-black text-white tracking-tighter uppercase italic">CHADLITE</div>
           </div>
           <div className="bg-black/60 px-4 py-2 rounded-lg border border-white/10 glass pointer-events-auto">
              <div className="text-[10px] font-black text-slate-500 tracking-widest uppercase">ELO</div>
              <div className="text-xl font-black text-accent-blue tracking-tighter">2,450</div>
           </div>
        </div>
        
        <div className="bg-black/60 px-4 py-2 rounded-lg border border-white/10 glass pointer-events-auto">
            <div className="text-[10px] font-black text-slate-500 tracking-widest uppercase">REGION</div>
            <div className="text-sm font-black text-white tracking-widest">US-EAST-1</div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {status === "idle" && (
          <motion.div
            key="idle"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="text-center space-y-8"
          >
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase italic">
              ARE YOU READY TO <span className="text-accent-blue">MOG?</span>
            </h2>
            <button
              onClick={startSearch}
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl bg-white px-12 py-6 text-xl font-black uppercase tracking-widest text-black hover:bg-accent-blue hover:text-white transition-all neon-blue"
            >
              <Swords className="h-6 w-6" />
              START MATCHMAKING
            </button>
          </motion.div>
        )}

        {status === "searching" && (
          <motion.div
            key="searching"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-6"
          >
            <div className="relative">
              <Loader2 className="h-24 w-24 text-accent-blue animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Swords className="h-8 w-8 text-white" />
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-black text-white uppercase tracking-widest">FINDING OPPONENT...</h3>
              <p className="text-slate-500 text-sm font-bold mt-2">SEARCHING FOR EQUAL ELO PLAYERS</p>
            </div>
            <button
              onClick={cancelSearch}
              className="mt-8 text-xs font-black text-slate-500 hover:text-white uppercase tracking-[0.3em] flex items-center gap-2 transition-colors"
            >
              <X className="h-4 w-4" /> CANCEL QUEUE
            </button>
          </motion.div>
        )}

        {status === "matched" && (
          <motion.div
            key="matched"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-8"
          >
            <div className="space-y-4">
              <WebcamFrame 
                isLocal 
                stream={localStream} 
                username="YOU" 
                rank="CHADLITE" 
                isAnalyzing={isAnalyzing}
              />
            </div>

            <div className="flex flex-col items-center gap-6">
               <div className="relative">
                  <motion.div 
                    animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="bg-accent-red px-8 py-4 rounded-xl text-4xl font-black italic tracking-tighter skew-x-[-12deg] neon-pink"
                  >
                    VS
                  </motion.div>
               </div>
               <div className="text-center space-y-2">
                  <div className="text-4xl font-black text-white tabular-nums">00:45</div>
                  <div className="text-[10px] font-bold text-slate-500 tracking-[0.4em] uppercase">TIME REMAINING</div>
               </div>
            </div>

            <div className="space-y-4">
              <WebcamFrame 
                username={opponent?.username || "SLAYER69"} 
                rank="SLAYER" 
                isAnalyzing={isAnalyzing}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Match Controls */}
      {status === "matched" && (
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed bottom-10 flex gap-4"
        >
           <button 
             onClick={() => setIsAnalyzing(!isAnalyzing)}
             className="px-8 py-4 bg-accent-blue rounded-xl font-black uppercase tracking-widest text-xs hover:scale-105 transition-all"
           >
              INITIATE AI SCAN
           </button>
           <button className="px-8 py-4 bg-white/5 border border-white/10 glass rounded-xl font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-all">
              GIVE UP
           </button>
        </motion.div>
      )}
    </main>
  );
}
