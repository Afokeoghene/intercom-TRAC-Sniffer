import { db } from "./db";
import { searches, type InsertSearch, type Search } from "@shared/schema";
import { desc } from "drizzle-orm";

export interface IStorage {
  logSearch(search: InsertSearch): Promise<Search>;
  getRecentSearches(): Promise<Search[]>;
}

export class DatabaseStorage implements IStorage {
  async logSearch(search: InsertSearch): Promise<Search> {
    const [inserted] = await db.insert(searches).values(search).returning();
    return inserted;
  }

  async getRecentSearches(): Promise<Search[]> {
    return await db.select().from(searches).orderBy(desc(searches.id)).limit(10);
  }
}

export const storage = new DatabaseStorage();