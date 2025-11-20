"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/lib/utils";
import { updateCartItem, removeFromCart } from "@/actions/cart";
import type { CartItemWithProduct } from "@/lib/cart";
import { Trash2, Minus, Plus } from "lucide-react";

interface CartItemRowProps {
  item: CartItemWithProduct;
}

export function CartItemRow({ item }: CartItemRowProps) {
  const [quantity, setQuantity] = useState(item.quantity);
  const [loading, setLoading] = useState(false);

  const handleUpdateQuantity = async (newQuantity: number) => {
    if (newQuantity < 1 || newQuantity > item.variant.stockQuantity) return;

    setLoading(true);
    setQuantity(newQuantity);

    const result = await updateCartItem(item.id, newQuantity);

    if (!result.success) {
      setQuantity(item.quantity);
      alert(result.error);
    }

    setLoading(false);
  };

  const handleRemove = async () => {
    if (!confirm("Remove this item from cart?")) return;

    setLoading(true);
    const result = await removeFromCart(item.id);

    if (!result.success) {
      alert(result.error);
      setLoading(false);
    }
  };

  const itemTotal = parseFloat(item.price) * quantity;

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex gap-4">
          {/* Product Image Placeholder */}
          <div className="w-24 h-24 bg-muted rounded-lg flex-shrink-0" />

          {/* Product Info */}
          <div className="flex-1 min-w-0">
            <Link
              href={`/products/${item.product.slug}`}
              className="font-semibold hover:underline line-clamp-2"
            >
              {item.product.name}
            </Link>
            {item.product.brand && (
              <p className="text-sm text-muted-foreground mt-1">{item.product.brand}</p>
            )}
            <div className="flex gap-2 mt-2 text-sm text-muted-foreground">
              {item.variant.size && <span>Size: {item.variant.size}</span>}
              {item.variant.color && <span>Color: {item.variant.color}</span>}
            </div>
            <p className="text-sm text-muted-foreground mt-1">SKU: {item.variant.sku}</p>
          </div>

          {/* Price & Actions */}
          <div className="flex flex-col items-end gap-4">
            <div className="text-right">
              <p className="font-semibold">{formatCurrency(itemTotal)}</p>
              <p className="text-sm text-muted-foreground">
                {formatCurrency(parseFloat(item.price))} each
              </p>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => handleUpdateQuantity(quantity - 1)}
                disabled={loading || quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>

              <Input
                type="number"
                min="1"
                max={item.variant.stockQuantity}
                value={quantity}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  if (!isNaN(val)) handleUpdateQuantity(val);
                }}
                className="w-16 text-center"
                disabled={loading}
              />

              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => handleUpdateQuantity(quantity + 1)}
                disabled={loading || quantity >= item.variant.stockQuantity}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {/* Stock Info */}
            {item.variant.stockQuantity <= 5 && (
              <p className="text-xs text-orange-600">
                Only {item.variant.stockQuantity} left in stock
              </p>
            )}

            {/* Remove Button */}
            <Button
              variant="ghost"
              size="sm"
              className="text-destructive hover:text-destructive"
              onClick={handleRemove}
              disabled={loading}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Remove
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
