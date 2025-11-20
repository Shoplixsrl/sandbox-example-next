import { products, productVariants, productImages } from "@/db/schema";

export type Product = typeof products.$inferSelect;
export type ProductVariant = typeof productVariants.$inferSelect;
export type ProductImage = typeof productImages.$inferSelect;

export type ProductWithDetails = Product & {
  variants: ProductVariant[];
  images: ProductImage[];
};
