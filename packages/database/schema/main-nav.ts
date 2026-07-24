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
  app: varchar("app").notNull(),
  childOf: varchar("child_of").references(
    (): AnyPgColumn => mainNavTable.itemId
  ),
  href: varchar("href").notNull(),
  itemId: varchar("item_id").unique().notNull(),
  order: smallint("order"),
  permissionKey: varchar("permission_key").references(
    () => permissionsTable.permissionKey
  ),
  recordId: serial("record_id").primaryKey().notNull(),
  title: varchar("title").notNull(),
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
