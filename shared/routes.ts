import { z } from 'zod';
import { 
  insertPilotStatsSchema, 
  insertEndowmentStatsSchema, 
  insertTimelineEventSchema,
  pilotStats,
  endowmentStats,
  timelineEvents
} from './schema';

// ============================================
// SHARED ERROR SCHEMAS
// ============================================
export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

// ============================================
// API CONTRACT
// ============================================
export const api = {
  pilot: {
    get: {
      method: 'GET' as const,
      path: '/api/pilot',
      responses: {
        200: z.custom<typeof pilotStats.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
    update: {
      method: 'PUT' as const,
      path: '/api/pilot',
      input: insertPilotStatsSchema,
      responses: {
        200: z.custom<typeof pilotStats.$inferSelect>(),
        400: errorSchemas.validation,
      },
    }
  },
  endowment: {
    get: {
      method: 'GET' as const,
      path: '/api/endowment',
      responses: {
        200: z.custom<typeof endowmentStats.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
    update: {
      method: 'PUT' as const,
      path: '/api/endowment',
      input: insertEndowmentStatsSchema,
      responses: {
        200: z.custom<typeof endowmentStats.$inferSelect>(),
        400: errorSchemas.validation,
      },
    }
  },
  timeline: {
    list: {
      method: 'GET' as const,
      path: '/api/timeline',
      responses: {
        200: z.array(z.custom<typeof timelineEvents.$inferSelect>()),
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/timeline',
      input: insertTimelineEventSchema,
      responses: {
        201: z.custom<typeof timelineEvents.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
    delete: {
      method: 'DELETE' as const,
      path: '/api/timeline/:id',
      responses: {
        204: z.void(),
        404: errorSchemas.notFound,
      },
    },
  },
  health: {
    get: {
      method: 'GET' as const,
      path: '/health',
      responses: {
        200: z.object({
          status: z.string(),
          version: z.string(),
          service: z.string(),
        }),
      },
    },
  },
  docs: {
    get: {
      method: 'GET' as const,
      path: '/api/docs',
      responses: {
        200: z.object({
          endpoints: z.array(z.string()),
          description: z.string(),
        }),
      },
    },
  }
};

// ============================================
// HELPER
// ============================================
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
