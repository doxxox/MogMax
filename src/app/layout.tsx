import type { Metadata } from "next";
import { Inter, Geist_Mono, Geist } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Swords, Trophy, User, Shield } from "lucide-react";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });

export const metadata: Metadata = {
  title: "MOG ARENA | THE AI FACE BATTLE PLATFORM",
  description: "Face strangers. Get scanned. Climb the leaderboard. The internet's first AI-powered live mog arena.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${geist.variable} font-sans antialiased bg-[#050507] text-white`}>
        {/* Cinematic Navbar */}
        <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
           <div className="max-w-7xl mx-auto flex items-center justify-between glass rounded-2xl border border-white/5 px-6 py-3">
              <Link href="/" className="flex items-center gap-2 group">
                 <div className="h-8 w-8 rounded-full border-2 border-accent-blue flex items-center justify-center group-hover:neon-blue transition-all">
                    <div className="h-4 w-4 rounded-full bg-accent-blue" />
                 </div>
                 <span className="text-xl font-black tracking-tighter italic">MOG<span className="text-accent-blue">ARENA</span></span>
              </Link>

              <div className="hidden md:flex items-center gap-8">
                 <NavLink href="/arena" icon={<Swords className="h-4 w-4" />} label="ARENA" />
                 <NavLink href="/leaderboard" icon={<Trophy className="h-4 w-4" />} label="LADDER" />
                 <NavLink href="/admin" icon={<Shield className="h-4 w-4" />} label="ADMIN" />
              </div>

              <div className="flex items-center gap-4">
                 <Link href="/profile" className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl border border-white/10 transition-all group">
                    <User className="h-4 w-4 text-accent-blue group-hover:text-white" />
                    <span className="text-[10px] font-black tracking-widest uppercase">GIGACHAD_99</span>
                 </Link>
              </div>
           </div>
        </nav>

        {children}
      </body>
    </html>
  );
}

function NavLink({ href, icon, label }: { href: string; icon: any; label: string }) {
  return (
    <Link href={href} className="flex items-center gap-2 text-[10px] font-black tracking-[0.2em] text-slate-400 hover:text-white transition-colors group">
       <span className="text-slate-600 group-hover:text-accent-blue transition-colors">{icon}</span>
       {label}
    </Link>
  );
}
