import { useState } from "react";
import { useLocation, Link } from "wouter";
import { Search as SearchIcon, ShieldCheck, Zap, Activity, Clock, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import { useRecentSearches } from "@/hooks/use-scan";

export default function Home() {
  const [, setLocation] = useLocation();
  const [ticker, setTicker] = useState("");
  const { data: recentSearches, isLoading } = useRecentSearches();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (ticker.trim()) {
      setLocation(`/scan/${ticker.trim().toLowerCase()}`);
    }
  };

  return (
    <div className="flex flex-col gap-16 md:gap-24 items-center">
      {/* Hero Section */}
      <section className="w-full flex flex-col items-center text-center mt-8 md:mt-16 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
        
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
          className="mb-6 p-4 rounded-2xl bg-secondary/30 border border-primary/20 backdrop-blur-sm box-glow-primary"
        >
          <ShieldCheck className="w-16 h-16 text-primary" />
        </motion.div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-6">
          Security Scanner for <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-300 text-glow-primary">
            TAP Protocol Tokens
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 font-mono">
          Detect malicious contracts, hidden token authorities, and honeypots instantly. Enter a ticker to sniff out the truth.
        </p>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="w-full max-w-xl relative z-10">
          <div className="relative flex items-center group">
            <div className="absolute left-4 text-primary font-mono font-bold text-xl select-none">
              $&nbsp;
            </div>
            <input
              type="text"
              value={ticker}
              onChange={(e) => setTicker(e.target.value)}
              placeholder="ENTER TICKER (e.g. TRAC)"
              className="w-full bg-secondary/80 border-2 border-border rounded-xl py-5 pl-12 pr-36 text-lg font-mono uppercase text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300 shadow-lg group-hover:border-primary/50"
              autoComplete="off"
              spellCheck="false"
            />
            <button
              type="submit"
              disabled={!ticker.trim()}
              className="absolute right-2 top-2 bottom-2 px-6 rounded-lg font-bold bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2 shadow-[0_0_15px_rgba(0,255,65,0.4)] hover:shadow-[0_0_25px_rgba(0,255,65,0.6)]"
            >
              <SearchIcon className="w-4 h-4" />
              SCAN
            </button>
          </div>
          <div className="mt-3 flex items-center justify-center gap-4 text-xs font-mono text-muted-foreground">
            <span className="flex items-center gap-1"><Zap className="w-3 h-3 text-primary" /> Lightning Fast</span>
            <span className="flex items-center gap-1"><Activity className="w-3 h-3 text-primary" /> On-Chain Data</span>
          </div>
        </form>
      </section>

      {/* Recent Scans Section */}
      <section className="w-full max-w-4xl flex flex-col gap-6">
        <div className="flex items-center justify-between border-b border-border/50 pb-4">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            Recent Scans
          </h3>
          <div className="text-xs font-mono text-muted-foreground flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Live Feed
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-20 bg-secondary/50 rounded-xl animate-pulse border border-border/50" />
            ))}
          </div>
        ) : recentSearches?.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {recentSearches.slice(0, 6).map((search) => (
              <Link 
                key={search.id} 
                href={`/scan/${search.ticker}`}
                className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-300 hover:-translate-y-1 glass-panel
                  ${search.isSafe 
                    ? 'border-primary/20 hover:border-primary/50 hover:bg-primary/5' 
                    : 'border-destructive/20 hover:border-destructive/50 hover:bg-destructive/5'
                  }`}
              >
                <div className="flex flex-col gap-1">
                  <span className="font-mono font-bold text-lg uppercase flex items-center gap-2">
                    ${search.ticker}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {search.timestamp ? formatDistanceToNow(new Date(search.timestamp), { addSuffix: true }) : 'Just now'}
                  </span>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1
                  ${search.isSafe 
                    ? 'bg-primary/10 text-primary border border-primary/20' 
                    : 'bg-destructive/10 text-destructive border border-destructive/20'
                  }`}
                >
                  {search.isSafe ? <ShieldCheck className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                  {search.isSafe ? 'SAFE' : 'RISK DETECTED'}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground font-mono border border-dashed border-border/50 rounded-xl glass-panel">
            No recent scans found in the mempool. Be the first!
          </div>
        )}
      </section>
    </div>
  );
}
