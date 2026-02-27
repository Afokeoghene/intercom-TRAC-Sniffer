import { z } from 'zod';
import { scanResponseSchema, searches } from './schema';

export const errorSchemas = {
  notFound: z.object({ message: z.string() }),
  internal: z.object({ message: z.string() }),
};

export const api = {
  scan: {
    get: {
      method: 'GET' as const,
      path: '/api/scan/:ticker' as const,
      responses: {
        200: scanResponseSchema,
        404: errorSchemas.notFound,
        500: errorSchemas.internal,
      },
    },
  },
  searches: {
    list: {
      method: 'GET' as const,
      path: '/api/searches/recent' as const,
      responses: {
        200: z.array(z.custom<typeof searches.$inferSelect>()),
      },
    }
  }
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
