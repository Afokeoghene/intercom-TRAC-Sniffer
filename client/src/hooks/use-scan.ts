import { useQuery } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import type { ScanResponse, Search } from "@shared/schema";

export function useScan(ticker: string | null) {
  return useQuery({
    queryKey: [api.scan.get.path, ticker],
    queryFn: async () => {
      if (!ticker) throw new Error("No ticker provided");
      
      const url = buildUrl(api.scan.get.path, { ticker });
      const res = await fetch(url, { credentials: "include" });
      
      if (!res.ok) {
        if (res.status === 404) {
          throw new Error(`Token '${ticker}' not found on the TAP protocol.`);
        }
        throw new Error("Failed to scan token. System error.");
      }
      
      const data = await res.json();
      return api.scan.get.responses[200].parse(data);
    },
    enabled: !!ticker,
    retry: false,
  });
}

export function useRecentSearches() {
  return useQuery({
    queryKey: [api.searches.list.path],
    queryFn: async () => {
      const res = await fetch(api.searches.list.path, { credentials: "include" });
      if (!res.ok) {
        throw new Error("Failed to fetch recent searches");
      }
      const data = await res.json();
      return api.searches.list.responses[200].parse(data);
    },
    refetchInterval: 10000, // Refresh recent searches every 10s
  });
}
