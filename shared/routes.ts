import { z } from 'zod';
import { 
  insertPilotStatsSchema, 
  insertEndowmentStatsSchema, 
  insertTimelineEventSchema,
  insertFinancialMetricsSchema,
  insertClimateMetricsSchema,
  pilotStats,
  endowmentStats,
  timelineEvents,
  financialMetrics,
  climateMetrics,
  slideDeck,
  historicalFinancials
} from './schema';

export const errorSchemas = {
  validation: z.object({ message: z.string(), field: z.string().optional() }),
  notFound: z.object({ message: z.string() }),
  internal: z.object({ message: z.string() }),
};

export const api = {
  pilot: {
    get: { method: 'GET' as const, path: '/api/pilot', responses: { 200: z.custom<typeof pilotStats.$inferSelect>(), 404: errorSchemas.notFound } },
  },
  endowment: {
    get: { method: 'GET' as const, path: '/api/endowment', responses: { 200: z.custom<typeof endowmentStats.$inferSelect>(), 404: errorSchemas.notFound } },
  },
  timeline: {
    list: { method: 'GET' as const, path: '/api/timeline', responses: { 200: z.array(z.custom<typeof timelineEvents.$inferSelect>()) } },
  },
  financials: {
    get: { method: 'GET' as const, path: '/api/financials', responses: { 200: z.custom<typeof financialMetrics.$inferSelect>(), 404: errorSchemas.notFound } },
  },
  climate: {
    get: { method: 'GET' as const, path: '/api/climate', responses: { 200: z.custom<typeof climateMetrics.$inferSelect>(), 404: errorSchemas.notFound } },
  },
  slides: {
    list: { method: 'GET' as const, path: '/api/slides', responses: { 200: z.array(z.custom<typeof slideDeck.$inferSelect>()) } },
  },
  historicalFinancials: {
    list: { method: 'GET' as const, path: '/api/historical-financials', responses: { 200: z.array(z.custom<typeof historicalFinancials.$inferSelect>()) } },
  },
  health: {
    get: { method: 'GET' as const, path: '/health', responses: { 200: z.object({ status: z.string(), version: z.string(), service: z.string() }) } },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) url = url.replace(`:${key}`, String(value));
    });
  }
  return url;
}
