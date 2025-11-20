import { NextRequest } from "next/server";
import { db } from "@/db";
import { products, productVariants, productImages } from "@/db/schema";
import { eq } from "drizzle-orm";
import {
  successResponse,
  errorResponse,
  notFoundResponse,
  validationError,
  parseRequestBody,
} from "@/lib/api-utils";
import { UpdateProductSchema } from "@/types/api";
import { productCache } from "@/lib/redis";

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/products/[id]
 * Get a single product with variants and images
 */
export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    // Try to get from cache first
    const cached = await productCache.get(id);
    if (cached) {
      return successResponse(cached);
    }

    // Get product
    const [product] = await db
      .select()
      .from(products)
      .where(eq(products.id, id))
      .limit(1);

    if (!product) {
      return notFoundResponse("Product not found");
    }

    // Get variants
    const variants = await db
      .select()
      .from(productVariants)
      .where(eq(productVariants.productId, id));

    // Get images
    const images = await db
      .select()
      .from(productImages)
      .where(eq(productImages.productId, id))
      .orderBy(productImages.position);

    const result = {
      ...product,
      variants,
      images,
    };

    // Cache for 1 hour
    await productCache.set(id, result, 3600);

    return successResponse(result);
  } catch (error) {
    console.error("Error fetching product:", error);
    return errorResponse("INTERNAL_ERROR", "Failed to fetch product", 500);
  }
}

/**
 * PATCH /api/products/[id]
 * Update a product
 */
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    // TODO: Add authentication and authorization check
    const { id } = await params;

    const body = await parseRequestBody(request);

    // Validate input
    const validationResult = UpdateProductSchema.safeParse(body);
    if (!validationResult.success) {
      return validationError("Invalid product data", validationResult.error.format());
    }

    const data = validationResult.data;

    // Check if product exists
    const [existingProduct] = await db
      .select({ id: products.id })
      .from(products)
      .where(eq(products.id, id))
      .limit(1);

    if (!existingProduct) {
      return notFoundResponse("Product not found");
    }

    // Check for duplicate slug (if changing slug)
    if (data.slug) {
      const [duplicateSlug] = await db
        .select({ id: products.id })
        .from(products)
        .where(eq(products.slug, data.slug))
        .limit(1);

      if (duplicateSlug && duplicateSlug.id !== id) {
        return errorResponse("DUPLICATE_SLUG", "Product with this slug already exists", 409);
      }
    }

    // Update product
    const [updatedProduct] = await db
      .update(products)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(products.id, id))
      .returning();

    // Invalidate cache
    await productCache.invalidate(id);
    await productCache.invalidateAll();

    return successResponse(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);

    if (error instanceof Error && error.message === "Invalid JSON body") {
      return validationError("Invalid JSON body");
    }

    return errorResponse("INTERNAL_ERROR", "Failed to update product", 500);
  }
}

/**
 * DELETE /api/products/[id]
 * Delete a product
 */
export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  try {
    // TODO: Add authentication and authorization check
    const { id } = await params;

    // Check if product exists
    const [existingProduct] = await db
      .select({ id: products.id })
      .from(products)
      .where(eq(products.id, id))
      .limit(1);

    if (!existingProduct) {
      return notFoundResponse("Product not found");
    }

    // Delete product (cascades to variants and images)
    await db.delete(products).where(eq(products.id, id));

    // Invalidate cache
    await productCache.invalidate(id);
    await productCache.invalidateAll();

    return successResponse({ success: true }, 204);
  } catch (error) {
    console.error("Error deleting product:", error);
    return errorResponse("INTERNAL_ERROR", "Failed to delete product", 500);
  }
}
