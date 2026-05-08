import { CinematicBackground } from "@/components/landing/CinematicBackground";
import { Hero } from "@/components/landing/Hero";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <CinematicBackground />
      <Hero />
      
      {/* Decorative HUD Elements */}
      <div className="fixed top-10 left-10 hidden lg:block opacity-30 pointer-events-none">
        <div className="text-[10px] font-mono text-accent-blue space-y-1">
          <div>LATENCY: 12MS</div>
          <div>REGION: US-EAST-1</div>
          <div>PROTOCOL: AES-256</div>
        </div>
      </div>
      
      <div className="fixed bottom-10 right-10 hidden lg:block opacity-30 pointer-events-none">
        <div className="text-[10px] font-mono text-accent-pink text-right space-y-1">
          <div>AI_CORE: ACTIVE</div>
          <div>MESH_RENDER: 60FPS</div>
          <div>THREAT_LEVEL: NOMINAL</div>
        </div>
      </div>
    </main>
  );
}
