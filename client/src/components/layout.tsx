import { ReactNode } from "react";
import { Dog, ShieldAlert } from "lucide-react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [location] = useLocation();
  const isHome = location === "/";

  return (
    <div className="min-h-screen flex flex-col relative z-0">
      {/* Background radial gradient for depth */}
      <div className="pointer-events-none fixed inset-0 flex justify-center items-center z-[-1]">
        <div className="absolute w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] opacity-50" />
      </div>

      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/60 backdrop-blur-xl supports-[backdrop-filter]:bg-background/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group cursor-pointer">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 group-hover:border-primary/60 group-hover:bg-primary/20 transition-all duration-300 overflow-hidden box-glow-primary">
              <motion.div
                animate={{ 
                  y: ["-100%", "100%"],
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 2,
                  ease: "linear"
                }}
                className="absolute inset-0 w-full h-[2px] bg-primary/50 blur-[1px]"
              />
              <Dog className="w-5 h-5 text-primary relative z-10" />
            </div>
            <div>
              <h1 className="font-bold text-xl tracking-wider text-foreground group-hover:text-glow-primary transition-all duration-300">
                TRAC<span className="text-primary">-Sniffer</span>
              </h1>
            </div>
          </Link>

          <nav className="flex items-center gap-6">
            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-muted-foreground border border-border/50 bg-secondary/50 px-3 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_hsl(var(--primary))]" />
              SYSTEM ONLINE
            </div>
          </nav>
        </div>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <motion.div
          key={location}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </main>

      <footer className="border-t border-border/40 bg-background/80 backdrop-blur-sm py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Dog className="w-4 h-4 text-primary" />
            <span>© {new Date().getFullYear()} TRAC-Sniffer. Stay safe in the mempool.</span>
          </div>
          <div className="flex items-center gap-1 text-xs font-mono text-muted-foreground">
            <ShieldAlert className="w-3 h-3" />
            Not financial advice. DYOR.
          </div>
        </div>
      </footer>
    </div>
  );
}
