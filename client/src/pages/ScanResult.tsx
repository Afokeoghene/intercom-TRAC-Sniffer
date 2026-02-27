import { useState } from "react";
import { useParams, Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, ShieldAlert, ShieldCheck, Server, 
  ChevronDown, Code, CheckCircle2, AlertOctagon, Terminal
} from "lucide-react";
import { useScan } from "@/hooks/use-scan";

export default function ScanResult() {
  const { ticker } = useParams<{ ticker: string }>();
  const { data, isLoading, error } = useScan(ticker || null);
  const [showRaw, setShowRaw] = useState(false);

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-8">
      {/* Navigation */}
      <Link 
        href="/" 
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-mono w-fit"
      >
        <ArrowLeft className="w-4 h-4" />
        RETURN TO SCANNER
      </Link>

      <div className="flex flex-col gap-2">
        <h1 className="text-3xl md:text-5xl font-bold font-mono uppercase flex items-center gap-4">
          <span className="text-muted-foreground font-light">$</span>
          {ticker}
        </h1>
        <div className="flex items-center gap-2 text-sm text-muted-foreground font-mono">
          <Server className="w-4 h-4" />
          Querying TAP Protocol endpoints...
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="w-full p-8 md:p-12 rounded-2xl border-2 border-primary/20 bg-secondary/20 backdrop-blur-sm relative overflow-hidden flex flex-col items-center justify-center gap-6 min-h-[300px]"
        >
          {/* Scanning Line Animation */}
          <motion.div 
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-[2px] bg-primary/80 shadow-[0_0_15px_rgba(0,255,65,0.8)] z-10"
          />
          
          <div className="relative">
            <div className="absolute inset-0 border-4 border-primary/30 rounded-full animate-ping" />
            <div className="w-16 h-16 border-4 border-primary rounded-full border-t-transparent animate-spin" />
          </div>
          
          <div className="font-mono text-primary text-xl animate-pulse text-glow-primary">
            ANALYZING CONTRACT DATA...
          </div>
        </motion.div>
      )}

      {/* Error State */}
      {error && !isLoading && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="p-8 rounded-2xl border-2 border-destructive/50 bg-destructive/10 backdrop-blur-sm flex flex-col gap-4 box-glow-destructive"
        >
          <div className="flex items-center gap-3 text-destructive">
            <AlertOctagon className="w-8 h-8" />
            <h2 className="text-2xl font-bold font-mono">SCAN FAILED</h2>
          </div>
          <p className="text-lg text-foreground/80 font-mono">
            {error instanceof Error ? error.message : "An unknown error occurred"}
          </p>
          <div className="mt-4">
            <Link 
              href="/"
              className="px-6 py-3 bg-secondary hover:bg-secondary/80 text-foreground rounded-lg font-mono transition-colors inline-block"
            >
              Try Another Ticker
            </Link>
          </div>
        </motion.div>
      )}

      {/* Result State */}
      {data && !isLoading && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", bounce: 0.4 }}
          className="flex flex-col gap-8"
        >
          {data.isSafe ? (
            /* SAFE CARD */
            <div className="p-8 md:p-10 rounded-2xl border-2 border-primary shadow-[0_0_30px_rgba(0,255,65,0.15)] bg-primary/5 backdrop-blur-sm relative overflow-hidden group">
              <div className="absolute -right-10 -top-10 text-primary/10 group-hover:text-primary/20 transition-colors duration-500 pointer-events-none">
                <ShieldCheck className="w-64 h-64" />
              </div>
              
              <div className="relative z-10 flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/20 rounded-full border border-primary/50">
                    <CheckCircle2 className="w-10 h-10 text-primary" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-primary text-glow-primary font-mono tracking-tight">
                    SAFE
                  </h2>
                </div>
                
                <p className="text-xl text-foreground/90 leading-relaxed max-w-2xl font-medium">
                  No Token Authority found. This is a decentralized fair-launch token.
                </p>
                
                <div className="mt-2 flex items-center gap-3 text-sm text-primary/80 font-mono bg-primary/10 w-fit px-4 py-2 rounded-lg border border-primary/20">
                  <Terminal className="w-4 h-4" />
                  AUTH_ADDR === NULL
                </div>
              </div>
            </div>
          ) : (
            /* UNSAFE CARD */
            <div className="p-8 md:p-10 rounded-2xl border-2 border-destructive shadow-[0_0_30px_rgba(255,0,60,0.2)] bg-destructive/10 backdrop-blur-sm relative overflow-hidden group">
              <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,0,60,0.05)_10px,rgba(255,0,60,0.05)_20px)] pointer-events-none" />
              <div className="absolute -right-10 -top-10 text-destructive/10 group-hover:text-destructive/20 transition-colors duration-500 pointer-events-none">
                <ShieldAlert className="w-64 h-64" />
              </div>
              
              <div className="relative z-10 flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-destructive/20 rounded-full border border-destructive/50 animate-pulse">
                    <AlertTriangle className="w-10 h-10 text-destructive" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-destructive text-glow-destructive font-mono tracking-tight">
                    SECURITY ALERT
                  </h2>
                </div>
                
                <p className="text-xl text-foreground/90 leading-relaxed max-w-2xl font-medium">
                  This token has an active Token Authority. The owner can blacklist users, freeze transfers, or mint infinite supply.
                </p>
                
                <div className="mt-2 flex flex-col gap-2">
                  <span className="text-sm font-bold text-destructive/80 font-mono uppercase">Authority Address:</span>
                  <div className="flex items-center gap-3 text-sm text-destructive font-mono bg-destructive/10 w-fit px-4 py-3 rounded-lg border border-destructive/30 break-all">
                    <Terminal className="w-4 h-4 shrink-0" />
                    {data.authAddress || "UNKNOWN"}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Raw Data Accordion */}
          <div className="border border-border/60 rounded-xl bg-card overflow-hidden">
            <button 
              onClick={() => setShowRaw(!showRaw)}
              className="w-full flex items-center justify-between p-5 hover:bg-secondary/50 transition-colors"
            >
              <div className="flex items-center gap-3 font-mono font-bold">
                <Code className="w-5 h-5 text-primary" />
                RAW DEPLOYMENT DATA
              </div>
              <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${showRaw ? "rotate-180" : ""}`} />
            </button>
            
            <AnimatePresence>
              {showRaw && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-t border-border/60 bg-black/50"
                >
                  <pre className="p-6 text-sm text-muted-foreground font-mono overflow-x-auto">
                    <code className="text-green-400/80">
                      {JSON.stringify(data.rawData, null, 2)}
                    </code>
                  </pre>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Education Section */}
          <section className="mt-4 p-6 rounded-xl bg-secondary/30 border border-border/50">
            <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
              <ShieldAlert className="w-5 h-5 text-yellow-500" />
              Understanding Attack Vectors
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              <strong>Honeypot JSON Structure:</strong> Some TAP protocol tokens utilize an <code className="bg-secondary px-1.5 py-0.5 rounded text-primary">auth</code> field within their deployment inscription. This acts as a "God Mode" switch, granting the specified address overarching control over the token's smart contract logic. Always verify that a fair-launch token does not contain unexpected authorization addresses.
            </p>
          </section>
        </motion.div>
      )}
    </div>
  );
}
