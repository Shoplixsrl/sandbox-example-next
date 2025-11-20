import { db } from "@/db";
import { products, productVariants, productImages, categories } from "@/db/schema";
import { eq, desc, and, ilike } from "drizzle-orm";
import { cache } from "react";
import { productCache } from "./redis";
import type { ProductWithDetails } from "@/types/product";

/**
 * Get product by ID or slug (cached)
 * Uses React cache() for request deduplication
 */
export const getProduct = cache(async (idOrSlug: string): Promise<ProductWithDetails | null> => {
  // Try Redis cache first
  const cached = await productCache.get(idOrSlug);
  if (cached) return cached as ProductWithDetails;

  // Query by ID or slug
  const [product] = await db
    .select()
    .from(products)
    .where(eq(products.id, idOrSlug))
    .limit(1);

  if (!product) {
    // Try by slug
    const [productBySlug] = await db
      .select()
      .from(products)
      .where(eq(products.slug, idOrSlug))
      .limit(1);

    if (!productBySlug) return null;

    // Get variants and images
    const variants = await db
      .select()
      .from(productVariants)
      .where(eq(productVariants.productId, productBySlug.id))
      .orderBy(productVariants.position);

    const images = await db
      .select()
      .from(productImages)
      .where(eq(productImages.productId, productBySlug.id))
      .orderBy(productImages.position);

    const result = {
      ...productBySlug,
      variants,
      images,
    };

    // Cache for 1 hour
    await productCache.set(idOrSlug, result, 3600);
    await productCache.set(productBySlug.id, result, 3600);

    return result;
  }

  // Get variants and images
  const variants = await db
    .select()
    .from(productVariants)
    .where(eq(productVariants.productId, product.id))
    .orderBy(productVariants.position);

  const images = await db
    .select()
    .from(productImages)
    .where(eq(productImages.productId, product.id))
    .orderBy(productImages.position);

  const result = {
    ...product,
    variants,
    images,
  };

  // Cache for 1 hour
  await productCache.set(idOrSlug, result, 3600);

  return result;
});

/**
 * Get all products (for static generation)
 */
export const getAllProducts = cache(async () => {
  return db.select({ slug: products.slug }).from(products).where(eq(products.status, "active"));
});

/**
 * Get featured products
 */
export const getFeaturedProducts = cache(async (limit = 8) => {
  return db
    .select()
    .from(products)
    .where(and(eq(products.status, "active"), eq(products.isFeatured, true)))
    .orderBy(desc(products.createdAt))
    .limit(limit);
});

/**
 * Get products by category
 */
export const getProductsByCategory = cache(async (categorySlug: string, limit = 20) => {
  // Get category first
  const [category] = await db
    .select()
    .from(categories)
    .where(eq(categories.slug, categorySlug))
    .limit(1);

  if (!category) return [];

  return db
    .select()
    .from(products)
    .where(and(eq(products.categoryId, category.id), eq(products.status, "active")))
    .orderBy(desc(products.createdAt))
    .limit(limit);
});

/**
 * Search products
 */
export const searchProducts = cache(async (query: string, limit = 20) => {
  return db
    .select()
    .from(products)
    .where(and(ilike(products.name, `%${query}%`), eq(products.status, "active")))
    .orderBy(desc(products.createdAt))
    .limit(limit);
});

/**
 * Get related products
 */
export const getRelatedProducts = cache(async (productId: string, categoryId: string | null, limit = 4) => {
  if (!categoryId) return [];

  return db
    .select()
    .from(products)
    .where(
      and(
        eq(products.categoryId, categoryId),
        eq(products.status, "active"),
        // Exclude current product
        // @ts-expect-error - Drizzle types
        products.id !== productId
      )
    )
    .orderBy(desc(products.createdAt))
    .limit(limit);
});
