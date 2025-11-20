import { pgTable, text, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";

// Audit log for tracking all important actions
export const auditLogs = pgTable("audit_logs", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),

  // Who did it
  userId: text("user_id"),
  userEmail: text("user_email"),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),

  // What happened
  action: text("action").notNull(), // e.g., "user.login", "product.create", "order.update"
  entityType: text("entity_type"), // e.g., "user", "product", "order"
  entityId: text("entity_id"),

  // Details
  changes: jsonb("changes").$type<{
    before?: Record<string, unknown>;
    after?: Record<string, unknown>;
  }>(),

  metadata: jsonb("metadata").$type<Record<string, unknown>>(),

  // Security
  severity: text("severity", { enum: ["low", "medium", "high", "critical"] })
    .notNull()
    .default("low"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});
