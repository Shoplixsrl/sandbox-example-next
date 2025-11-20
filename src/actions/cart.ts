"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { carts, cartItems, productVariants } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { cartCache } from "@/lib/redis";
import { nanoid } from "nanoid";

/**
 * Server Action: Add item to cart
 */
export async function addToCart(variantId: string, quantity: number = 1) {
  try {
    // TODO: Get user from session
    // For now, use session-based cart
    const sessionId = nanoid();

    // Verify variant exists and is available
    const [variant] = await db
      .select()
      .from(productVariants)
      .where(eq(productVariants.id, variantId))
      .limit(1);

    if (!variant || !variant.isAvailable) {
      return {
        success: false,
        error: "Product variant not available",
      };
    }

    // Check stock
    if (variant.stockQuantity < quantity) {
      return {
        success: false,
        error: `Only ${variant.stockQuantity} items available in stock`,
      };
    }

    // Get or create cart
    let [cart] = await db.select().from(carts).where(eq(carts.sessionId, sessionId)).limit(1);

    if (!cart) {
      [cart] = await db
        .insert(carts)
        .values({
          sessionId,
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        })
        .returning();
    }

    if (!cart) {
      return {
        success: false,
        error: "Failed to create cart",
      };
    }

    // Check if item already in cart
    const [existingItem] = await db
      .select()
      .from(cartItems)
      .where(and(eq(cartItems.cartId, cart.id), eq(cartItems.variantId, variantId)))
      .limit(1);

    if (existingItem) {
      // Update quantity
      const newQuantity = existingItem.quantity + quantity;

      if (newQuantity > variant.stockQuantity) {
        return {
          success: false,
          error: `Only ${variant.stockQuantity} items available in stock`,
        };
      }

      await db
        .update(cartItems)
        .set({
          quantity: newQuantity,
          updatedAt: new Date(),
        })
        .where(eq(cartItems.id, existingItem.id));
    } else {
      // Add new item
      await db.insert(cartItems).values({
        cartId: cart.id,
        variantId,
        quantity,
        price: variant.price,
      });
    }

    // Invalidate cache
    await cartCache.delete(cart.id);

    revalidatePath("/cart");

    return {
      success: true,
      message: "Item added to cart",
    };
  } catch (error) {
    console.error("Error adding to cart:", error);
    return {
      success: false,
      error: "Failed to add item to cart",
    };
  }
}

/**
 * Server Action: Update cart item quantity
 */
export async function updateCartItem(itemId: string, quantity: number) {
  try {
    if (quantity < 1) {
      return {
        success: false,
        error: "Quantity must be at least 1",
      };
    }

    // Get cart item with variant
    const [item] = await db
      .select({
        item: cartItems,
        variant: productVariants,
      })
      .from(cartItems)
      .innerJoin(productVariants, eq(cartItems.variantId, productVariants.id))
      .where(eq(cartItems.id, itemId))
      .limit(1);

    if (!item) {
      return {
        success: false,
        error: "Cart item not found",
      };
    }

    // Check stock
    if (quantity > item.variant.stockQuantity) {
      return {
        success: false,
        error: `Only ${item.variant.stockQuantity} items available in stock`,
      };
    }

    // Update quantity
    await db
      .update(cartItems)
      .set({
        quantity,
        updatedAt: new Date(),
      })
      .where(eq(cartItems.id, itemId));

    // Invalidate cache
    await cartCache.delete(item.item.cartId);

    revalidatePath("/cart");

    return {
      success: true,
      message: "Cart updated",
    };
  } catch (error) {
    console.error("Error updating cart item:", error);
    return {
      success: false,
      error: "Failed to update cart item",
    };
  }
}

/**
 * Server Action: Remove item from cart
 */
export async function removeFromCart(itemId: string) {
  try {
    const [item] = await db.select().from(cartItems).where(eq(cartItems.id, itemId)).limit(1);

    if (!item) {
      return {
        success: false,
        error: "Cart item not found",
      };
    }

    await db.delete(cartItems).where(eq(cartItems.id, itemId));

    // Invalidate cache
    await cartCache.delete(item.cartId);

    revalidatePath("/cart");

    return {
      success: true,
      message: "Item removed from cart",
    };
  } catch (error) {
    console.error("Error removing from cart:", error);
    return {
      success: false,
      error: "Failed to remove item from cart",
    };
  }
}

/**
 * Server Action: Clear cart
 */
export async function clearCart(cartId: string) {
  try {
    await db.delete(cartItems).where(eq(cartItems.cartId, cartId));

    // Invalidate cache
    await cartCache.delete(cartId);

    revalidatePath("/cart");

    return {
      success: true,
      message: "Cart cleared",
    };
  } catch (error) {
    console.error("Error clearing cart:", error);
    return {
      success: false,
      error: "Failed to clear cart",
    };
  }
}
