import { db } from "@/db";
import { carts, cartItems, productVariants, products } from "@/db/schema";
import { eq } from "drizzle-orm";
import { cache } from "react";
import { cartCache } from "./redis";

export interface CartItemWithProduct {
  id: string;
  quantity: number;
  price: string;
  variant: {
    id: string;
    name: string;
    sku: string;
    size: string | null;
    color: string | null;
    price: string;
    stockQuantity: number;
  };
  product: {
    id: string;
    name: string;
    slug: string;
    brand: string | null;
  };
}

export interface CartWithItems {
  id: string;
  items: CartItemWithProduct[];
  subtotal: number;
  total: number;
  itemCount: number;
}

/**
 * Get cart by ID with all items
 */
export const getCart = cache(async (cartId: string): Promise<CartWithItems | null> => {
  // Try cache first
  const cached = await cartCache.get(cartId);
  if (cached) return cached as CartWithItems;

  // Get cart
  const [cart] = await db.select().from(carts).where(eq(carts.id, cartId)).limit(1);

  if (!cart) return null;

  // Get cart items with product details
  const items = await db
    .select({
      id: cartItems.id,
      quantity: cartItems.quantity,
      price: cartItems.price,
      variant: {
        id: productVariants.id,
        name: productVariants.name,
        sku: productVariants.sku,
        size: productVariants.size,
        color: productVariants.color,
        price: productVariants.price,
        stockQuantity: productVariants.stockQuantity,
      },
      product: {
        id: products.id,
        name: products.name,
        slug: products.slug,
        brand: products.brand,
      },
    })
    .from(cartItems)
    .innerJoin(productVariants, eq(cartItems.variantId, productVariants.id))
    .innerJoin(products, eq(productVariants.productId, products.id))
    .where(eq(cartItems.cartId, cartId));

  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);

  const cartWithItems: CartWithItems = {
    id: cart.id,
    items: items as CartItemWithProduct[],
    subtotal,
    total: subtotal, // Add tax/shipping later
    itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
  };

  // Cache for 5 minutes
  await cartCache.set(cartId, cartWithItems, 300);

  return cartWithItems;
});

/**
 * Get cart by session ID
 */
export const getCartBySession = cache(async (sessionId: string): Promise<CartWithItems | null> => {
  const [cart] = await db.select().from(carts).where(eq(carts.sessionId, sessionId)).limit(1);

  if (!cart) return null;

  return getCart(cart.id);
});
