import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { io } from "socket.io-client";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.get(api.searches.list.path, async (req, res) => {
    try {
      const recent = await storage.getRecentSearches();
      res.json(recent);
    } catch (e) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get(api.scan.get.path, async (req, res) => {
    try {
      const ticker = req.params.ticker.toLowerCase();
      
      const deployment = await new Promise<any>((resolve, reject) => {
        const trac = io("https://tap.trac.network", { 
          autoConnect: true, 
          reconnection: false,
          timeout: 10000 
        });

        const callId = `deploy-${ticker}-${Date.now()}`;
        
        const timeoutId = setTimeout(() => {
          trac.disconnect();
          reject(new Error("Timeout fetching from Trac API"));
        }, 10000);

        trac.on('response', (msg) => {
          if (msg && msg.call_id === callId) {
            clearTimeout(timeoutId);
            trac.disconnect();
            if (msg.error) {
              reject(new Error(msg.error));
            } else {
              resolve(msg.result);
            }
          }
        });

        trac.on('connect_error', (err) => {
          clearTimeout(timeoutId);
          trac.disconnect();
          reject(err);
        });

        trac.emit('get', { 
          func: 'deployment',
          args: [ticker],
          call_id: callId
        });
      });
      
      if (!deployment) {
        return res.status(404).json({ message: "Deployment not found" });
      }
      
      const isSafe = !deployment.auth;
      const authAddress = deployment.auth || null;
      
      // Calculate basic stats if available
      // Note: Trac API returns values in base units (satoshis/decimals)
      const price = deployment.price || "N/A";
      const marketCap = deployment.mcap || "N/A";
      const deployer = deployment.addr || "Unknown";
      const deployedAt = deployment.ts ? new Date(deployment.ts * 1000).toLocaleString() : "Unknown";
      
      const result = {
        ticker: req.params.ticker.toUpperCase(),
        isSafe,
        authAddress,
        marketCap: marketCap.toString(),
        price: price.toString(),
        deployer,
        deployedAt,
        rawData: deployment
      };
      
      await storage.logSearch({
        ticker: req.params.ticker.toUpperCase(),
        isSafe
      });
      
      res.json(result);
    } catch (e: any) {
      console.error("Scan error:", e);
      if (e.message && e.message.includes("Timeout")) {
        return res.status(500).json({ message: "Timeout connecting to Trac network" });
      }
      return res.status(404).json({ message: e.message || "Deployment not found" });
    }
  });

  return httpServer;
}