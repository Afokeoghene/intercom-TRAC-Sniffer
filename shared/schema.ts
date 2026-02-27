import { pgTable, text, serial, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const searches = pgTable("searches", {
  id: serial("id").primaryKey(),
  ticker: text("ticker").notNull(),
  isSafe: boolean("is_safe").notNull(),
  timestamp: timestamp("timestamp").defaultNow(),
});

export const insertSearchSchema = createInsertSchema(searches).omit({ id: true, timestamp: true });

export type InsertSearch = z.infer<typeof insertSearchSchema>;
export type Search = typeof searches.$inferSelect;

export const scanResponseSchema = z.object({
  ticker: z.string(),
  isSafe: z.boolean(),
  authAddress: z.string().nullable(),
  marketCap: z.string().optional(),
  price: z.string().optional(),
  deployer: z.string().optional(),
  deployedAt: z.string().optional(),
  rawData: z.any(),
});

export type ScanResponse = z.infer<typeof scanResponseSchema>;
