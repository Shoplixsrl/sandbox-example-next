import Link from "next/link";
import { getFeaturedProducts } from "@/lib/products";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";

export const metadata = {
  title: "Home | Your E-Commerce Store",
  description: "Discover our curated collection of premium products",
};

export const revalidate = 3600; // 1 hour

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts(8);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-muted/50 to-background py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            Welcome to Your Store
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover premium products curated just for you. Quality, style, and sophistication in
            every item.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/products">Shop Now</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold mb-2">Featured Products</h2>
                <p className="text-muted-foreground">
                  Handpicked selections from our latest collection
                </p>
              </div>
              <Button variant="ghost" asChild>
                <Link href="/products">View All →</Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <Link key={product.id} href={`/products/${product.slug}`}>
                  <Card className="overflow-hidden hover:shadow-lg transition-all hover:scale-[1.02] h-full">
                    <div className="relative aspect-square bg-muted">
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        No image
                      </div>
                      <div className="absolute top-2 right-2">
                        <Badge>Featured</Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      {product.brand && (
                        <p className="text-xs text-muted-foreground mb-1">{product.brand}</p>
                      )}
                      <h3 className="font-semibold mb-2 line-clamp-2 h-12">{product.name}</h3>
                      <div className="flex items-center justify-between">
                        <p className="text-lg font-bold">
                          {formatCurrency(parseFloat(product.basePrice))}
                        </p>
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
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Shop With Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🚚</span>
                </div>
                <h3 className="font-semibold mb-2">Free Shipping</h3>
                <p className="text-sm text-muted-foreground">
                  On orders over $100. Fast and reliable delivery to your doorstep.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔒</span>
                </div>
                <h3 className="font-semibold mb-2">Secure Payment</h3>
                <p className="text-sm text-muted-foreground">
                  100% secure payments powered by Stripe. Your data is always protected.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">↩️</span>
                </div>
                <h3 className="font-semibold mb-2">Easy Returns</h3>
                <p className="text-sm text-muted-foreground">
                  30-day return policy. Shop with confidence, hassle-free returns.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Shopping?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of happy customers and experience the best online shopping.
          </p>
          <Button size="lg" asChild>
            <Link href="/products">Browse All Products</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
