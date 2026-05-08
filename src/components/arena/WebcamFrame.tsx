"use client";

import { useEffect, useRef, useState } from "react";
import { useFaceTracking } from "@/hooks/useFaceTracking";
import { FaceHUD } from "./FaceHUD";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Shield, Target } from "lucide-react";

interface WebcamFrameProps {
  isLocal?: boolean;
  stream?: MediaStream | null;
  username: string;
  rank: string;
  isAnalyzing?: boolean;
}

export function WebcamFrame({ isLocal, stream, username, rank, isAnalyzing }: WebcamFrameProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { results, processVideo } = useFaceTracking();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  const onMetadata = () => {
    if (videoRef.current) {
      setDimensions({
        width: videoRef.current.videoWidth,
        height: videoRef.current.videoHeight,
      });
    }
  };

  useEffect(() => {
    let frame: number;
    const loop = async () => {
      if (videoRef.current && videoRef.current.readyState === 4) {
        await processVideo(videoRef.current);
      }
      frame = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(frame);
  }, [processVideo]);

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl border-2 border-white/5 bg-black/40 glass">
      <video
        ref={videoRef}
        autoPlay
        muted={isLocal}
        onLoadedMetadata={onMetadata}
        className="h-full w-full object-cover grayscale-[0.2] brightness-110"
      />

      <FaceHUD 
        results={results} 
        width={dimensions.width} 
        height={dimensions.height} 
        isAnalyzing={isAnalyzing}
      />

      {/* Overlay HUD */}
      <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none">
        <div className="flex justify-between items-start">
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="flex items-center gap-3 bg-black/60 px-4 py-2 rounded-lg border border-white/10 glass"
          >
            <div className="h-2 w-2 rounded-full bg-accent-green animate-pulse" />
            <div className="text-xs font-black tracking-widest text-white uppercase">
              {username} <span className="text-slate-500 ml-2">[{rank}]</span>
            </div>
          </motion.div>

          {isAnalyzing && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center gap-2 bg-accent-blue/20 px-3 py-1.5 rounded-md border border-accent-blue/30 text-accent-blue text-[10px] font-black uppercase tracking-tighter"
            >
              <Activity className="h-3 w-3 animate-spin" />
              ANALYZING BIOMETRICS...
            </motion.div>
          )}
        </div>

        <div className="flex justify-between items-end">
          <div className="space-y-1">
             <HUDMetric label="SYMMETRY" value="87.4%" />
             <HUDMetric label="JAWLINE" value="OPTIMAL" />
             <HUDMetric label="CANTHAL" value="+3.2°" />
          </div>

          <div className="flex gap-2">
            <div className="p-2 rounded-lg bg-black/40 border border-white/5 glass">
               <Target className="h-4 w-4 text-accent-pink" />
            </div>
            <div className="p-2 rounded-lg bg-black/40 border border-white/5 glass">
               <Shield className="h-4 w-4 text-accent-blue" />
            </div>
          </div>
        </div>
      </div>

      {/* Aesthetic Corners */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-accent-blue/40 rounded-tl-2xl" />
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-accent-blue/40 rounded-tr-2xl" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-accent-blue/40 rounded-bl-2xl" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-accent-blue/40 rounded-br-2xl" />
    </div>
  );
}

function HUDMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-2 bg-black/40 px-2 py-1 rounded border border-white/5 glass">
      <span className="text-[8px] font-bold text-slate-500 tracking-widest">{label}</span>
      <span className="text-[10px] font-black text-white">{value}</span>
    </div>
  );
}
