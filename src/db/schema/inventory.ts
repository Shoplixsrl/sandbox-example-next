import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, integer, boolean } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";
import { productVariants } from "./products";

// Inventory movements/history
export const inventoryMovements = pgTable("inventory_movements", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  variantId: text("variant_id")
    .notNull()
    .references(() => productVariants.id, { onDelete: "cascade" }),

  type: text("type", {
    enum: [
      "purchase", // Stock received from supplier
      "sale", // Sold to customer
      "return", // Customer return
      "adjustment", // Manual adjustment
      "damage", // Damaged goods
      "theft", // Stolen inventory
    ],
  }).notNull(),

  quantity: integer("quantity").notNull(), // Positive for additions, negative for reductions
  previousQuantity: integer("previous_quantity").notNull(),
  newQuantity: integer("new_quantity").notNull(),

  // Reference to related entities
  orderId: text("order_id"),
  userId: text("user_id"), // User who made the adjustment

  reason: text("reason"),
  notes: text("notes"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Inventory alerts
export const inventoryAlerts = pgTable("inventory_alerts", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  variantId: text("variant_id")
    .notNull()
    .references(() => productVariants.id, { onDelete: "cascade" }),

  type: text("type", {
    enum: ["low_stock", "out_of_stock", "overstock"],
  }).notNull(),

  threshold: integer("threshold"),
  currentQuantity: integer("current_quantity").notNull(),

  isResolved: boolean("is_resolved").default(false).notNull(),
  resolvedAt: timestamp("resolved_at"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Relations
export const inventoryMovementsRelations = relations(inventoryMovements, ({ one }) => ({
  variant: one(productVariants, {
    fields: [inventoryMovements.variantId],
    references: [productVariants.id],
  }),
}));

export const inventoryAlertsRelations = relations(inventoryAlerts, ({ one }) => ({
  variant: one(productVariants, {
    fields: [inventoryAlerts.variantId],
    references: [productVariants.id],
  }),
}));
