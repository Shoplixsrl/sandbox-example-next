import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getProduct, getAllProducts, getRelatedProducts } from "@/lib/products";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * Generate metadata for product page (SEO)
 */
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: product.seoTitle || `${product.name} | Your Store`,
    description: product.seoDescription || product.description || `Buy ${product.name}`,
    openGraph: {
      title: product.name,
      description: product.description || undefined,
      images: product.images[0]?.url ? [product.images[0].url] : [],
    },
  };
}

/**
 * Generate static paths for ISR
 * Regenerate every 1 hour
 */
export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

/**
 * Product Detail Page (Server Component)
 * Uses ISR with 1 hour revalidation
 */
export const revalidate = 3600; // 1 hour

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product.id, product.categoryId, 4);

  // Calculate price range from variants
  const prices = product.variants.map((v) => parseFloat(v.price));
  const minPrice = Math.min(...prices, parseFloat(product.basePrice));
  const maxPrice = Math.max(...prices, parseFloat(product.basePrice));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Product Images */}
        <div className="space-y-4">
          {product.images.length > 0 ? (
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted">
              <Image
                src={product.images[0]!.url}
                alt={product.images[0]!.alt || product.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          ) : (
            <div className="aspect-square rounded-2xl bg-muted flex items-center justify-center">
              <span className="text-muted-foreground">No image available</span>
            </div>
          )}

          {/* Thumbnail gallery */}
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {product.images.slice(1, 5).map((image) => (
                <div key={image.id} className="relative aspect-square rounded-lg overflow-hidden">
                  <Image
                    src={image.url}
                    alt={image.alt || product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 25vw, 12.5vw"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Title and badges */}
          <div>
            {product.brand && <p className="text-sm text-muted-foreground mb-2">{product.brand}</p>}
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            <div className="flex gap-2 mb-4">
              {product.isFeatured && <Badge>Featured</Badge>}
              <Badge variant="outline">{product.status}</Badge>
            </div>
          </div>

          {/* Price */}
          <div className="space-y-2">
            {minPrice === maxPrice ? (
              <p className="text-3xl font-bold">{formatCurrency(minPrice)}</p>
            ) : (
              <p className="text-3xl font-bold">
                {formatCurrency(minPrice)} - {formatCurrency(maxPrice)}
              </p>
            )}
            {product.compareAtPrice && parseFloat(product.compareAtPrice) > minPrice && (
              <p className="text-lg text-muted-foreground line-through">
                {formatCurrency(parseFloat(product.compareAtPrice))}
              </p>
            )}
          </div>

          {/* Description */}
          {product.description && (
            <div>
              <h2 className="text-lg font-semibold mb-2">Description</h2>
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            </div>
          )}

          {/* Variants */}
          {product.variants.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-4">Available Options</h2>
              <div className="space-y-4">
                {/* Size selection */}
                {product.variants.some((v) => v.size) && (
                  <div>
                    <p className="text-sm font-medium mb-2">Size</p>
                    <div className="flex flex-wrap gap-2">
                      {[...new Set(product.variants.map((v) => v.size))].map((size) => (
                        <Button key={size} variant="outline" size="sm">
                          {size}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Color selection */}
                {product.variants.some((v) => v.color) && (
                  <div>
                    <p className="text-sm font-medium mb-2">Color</p>
                    <div className="flex flex-wrap gap-2">
                      {[...new Set(product.variants.map((v) => v.color))].map((color) => (
                        <Button key={color} variant="outline" size="sm">
                          {color}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Add to cart */}
          <div className="space-y-4 pt-4 border-t">
            <Button size="lg" className="w-full">
              Add to Cart
            </Button>
            <Button size="lg" variant="outline" className="w-full">
              Add to Wishlist
            </Button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Card key={relatedProduct.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative aspect-square bg-muted">
                  {/* Placeholder for related product image */}
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    No image
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2 line-clamp-2">{relatedProduct.name}</h3>
                  <p className="text-lg font-bold">{formatCurrency(parseFloat(relatedProduct.basePrice))}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
