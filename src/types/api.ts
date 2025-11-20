import { z } from "zod";

/**
 * API Response types
 */
export interface ApiResponse<T = unknown> {
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
}

export interface PaginatedResponse<T> {
  items: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

/**
 * Product API types
 */
export const CreateProductSchema = z.object({
  name: z.string().min(1).max(255),
  slug: z.string().min(1).max(255),
  description: z.string().optional(),
  categoryId: z.string().optional(),
  basePrice: z.string().regex(/^\d+(\.\d{1,2})?$/),
  compareAtPrice: z.string().regex(/^\d+(\.\d{1,2})?$/).optional(),
  taxRate: z.string().regex(/^\d+(\.\d{1,2})?$/).optional(),
  brand: z.string().optional(),
  status: z.enum(["draft", "active", "archived"]).default("draft"),
  isFeatured: z.boolean().default(false),
  seoTitle: z.string().max(60).optional(),
  seoDescription: z.string().max(160).optional(),
});

export type CreateProductInput = z.infer<typeof CreateProductSchema>;

export const UpdateProductSchema = CreateProductSchema.partial();
export type UpdateProductInput = z.infer<typeof UpdateProductSchema>;

export const ProductQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(20),
  search: z.string().optional(),
  category: z.string().optional(),
  status: z.enum(["draft", "active", "archived"]).optional(),
  featured: z.coerce.boolean().optional(),
  sortBy: z.enum(["name", "price", "createdAt", "updatedAt"]).default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export type ProductQuery = z.infer<typeof ProductQuerySchema>;
