import { Metadata } from "next";
import Link from "next/link";
import { db } from "@/db";
import { products } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";

export const metadata: Metadata = {
  title: "All Products | Your Store",
  description: "Browse our collection of products",
};

export const revalidate = 3600; // 1 hour

export default async function ProductsPage() {
  const allProducts = await db
    .select()
    .from(products)
    .where(eq(products.status, "active"))
    .orderBy(desc(products.createdAt))
    .limit(50);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">All Products</h1>
        <p className="text-muted-foreground">
          Discover our entire collection of {allProducts.length} products
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {allProducts.map((product) => (
          <Link key={product.id} href={`/products/${product.slug}`}>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
              <div className="relative aspect-square bg-muted">
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  No image
                </div>
                {product.isFeatured && (
                  <div className="absolute top-2 right-2">
                    <Badge>Featured</Badge>
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                {product.brand && (
                  <p className="text-xs text-muted-foreground mb-1">{product.brand}</p>
                )}
                <h3 className="font-semibold mb-2 line-clamp-2 h-12">{product.name}</h3>
                <div className="flex items-center justify-between">
                  <p className="text-lg font-bold">{formatCurrency(parseFloat(product.basePrice))}</p>
                  {product.compareAtPrice && parseFloat(product.compareAtPrice) > parseFloat(product.basePrice) && (
                    <p className="text-sm text-muted-foreground line-through">
                      {formatCurrency(parseFloat(product.compareAtPrice))}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {allProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No products available yet.</p>
        </div>
      )}
    </div>
  );
}
