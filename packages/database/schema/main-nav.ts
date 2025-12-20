import { relations } from "drizzle-orm";
import {
  type AnyPgColumn,
  pgTable,
  serial,
  smallint,
  varchar,
} from "drizzle-orm/pg-core";
import { permissionsTable } from "./users";

export const mainNavTable = pgTable("main_nav", {
  recordId: serial("record_id").primaryKey().notNull(),
  itemId: varchar("item_id").unique().notNull(),
  title: varchar("title").notNull(),
  href: varchar("href").notNull(),
  app: varchar("app").notNull(),
  order: smallint("order"),
  childOf: varchar("child_of").references((): AnyPgColumn => mainNavTable.itemId),
  permissionKey: varchar("permission_key").references(() => permissionsTable.permissionKey),
});

export const mainNavRelations = relations(mainNavTable, ({ one }) => ({
  childOf: one(mainNavTable, {
    fields: [mainNavTable.childOf],
    references: [mainNavTable.itemId],
  }),
  permissionKey: one(permissionsTable, {
    fields: [mainNavTable.permissionKey],
    references: [permissionsTable.permissionKey],
  }),
}));
