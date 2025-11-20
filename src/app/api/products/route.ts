import { NextRequest } from "next/server";
import { db } from "@/db";
import { products } from "@/db/schema";
import { and, desc, asc, ilike, eq, count } from "drizzle-orm";
import {
  successResponse,
  errorResponse,
  validationError,
  parseRequestBody,
  parseSearchParams,
} from "@/lib/api-utils";
import { CreateProductSchema, ProductQuerySchema } from "@/types/api";
import type { PaginatedResponse } from "@/types/api";
import { productCache } from "@/lib/redis";

/**
 * GET /api/products
 * List products with filtering, search, and pagination
 */
export async function GET(request: NextRequest) {
  try {
    const url = request.nextUrl;
    const params = parseSearchParams(url);

    // Validate and parse query params
    const queryResult = ProductQuerySchema.safeParse(params);
    if (!queryResult.success) {
      return validationError("Invalid query parameters", queryResult.error.format());
    }

    const query = queryResult.data;
    const { page, limit, search, category, status, featured, sortBy, sortOrder } = query;

    // Build where conditions
    const conditions = [];

    if (search) {
      conditions.push(ilike(products.name, `%${search}%`));
    }

    if (category) {
      conditions.push(eq(products.categoryId, category));
    }

    if (status) {
      conditions.push(eq(products.status, status));
    }

    if (featured !== undefined) {
      conditions.push(eq(products.isFeatured, featured));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    // Get total count
    const totalResult = await db
      .select({ total: count() })
      .from(products)
      .where(whereClause);

    const total = totalResult[0]?.total ?? 0;

    // Build sort order
    const sortColumn = {
      name: products.name,
      price: products.basePrice,
      createdAt: products.createdAt,
      updatedAt: products.updatedAt,
    }[sortBy];

    const orderBy = sortOrder === "asc" ? asc(sortColumn) : desc(sortColumn);

    // Get paginated products
    const items = await db
      .select({
        id: products.id,
        name: products.name,
        slug: products.slug,
        description: products.description,
        basePrice: products.basePrice,
        compareAtPrice: products.compareAtPrice,
        brand: products.brand,
        status: products.status,
        isFeatured: products.isFeatured,
        createdAt: products.createdAt,
        updatedAt: products.updatedAt,
      })
      .from(products)
      .where(whereClause)
      .orderBy(orderBy)
      .limit(limit)
      .offset((page - 1) * limit);

    const response: PaginatedResponse<typeof items[0]> = {
      items,
      pagination: {
        page,
        limit,
        total: Number(total),
        totalPages: Math.ceil(Number(total) / limit),
      },
    };

    return successResponse(response);
  } catch (error) {
    console.error("Error fetching products:", error);
    return errorResponse("INTERNAL_ERROR", "Failed to fetch products", 500);
  }
}

/**
 * POST /api/products
 * Create a new product
 */
export async function POST(request: NextRequest) {
  try {
    // TODO: Add authentication check
    // For now, allow creation for testing

    const body = await parseRequestBody(request);

    // Validate input
    const validationResult = CreateProductSchema.safeParse(body);
    if (!validationResult.success) {
      return validationError("Invalid product data", validationResult.error.format());
    }

    const data = validationResult.data;

    // Check for duplicate slug
    const existingProduct = await db
      .select({ id: products.id })
      .from(products)
      .where(eq(products.slug, data.slug))
      .limit(1);

    if (existingProduct.length > 0) {
      return errorResponse("DUPLICATE_SLUG", "Product with this slug already exists", 409);
    }

    // Create product
    const [newProduct] = await db
      .insert(products)
      .values({
        name: data.name,
        slug: data.slug,
        description: data.description,
        categoryId: data.categoryId,
        basePrice: data.basePrice,
        compareAtPrice: data.compareAtPrice,
        taxRate: data.taxRate || "0.00",
        brand: data.brand,
        status: data.status,
        isFeatured: data.isFeatured,
        seoTitle: data.seoTitle,
        seoDescription: data.seoDescription,
      })
      .returning();

    // Invalidate cache
    await productCache.invalidateAll();

    return successResponse(newProduct, 201);
  } catch (error) {
    console.error("Error creating product:", error);

    if (error instanceof Error && error.message === "Invalid JSON body") {
      return validationError("Invalid JSON body");
    }

    return errorResponse("INTERNAL_ERROR", "Failed to create product", 500);
  }
}
