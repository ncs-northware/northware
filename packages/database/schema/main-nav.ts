import { relations } from 'drizzle-orm';
import {
  type AnyPgColumn,
  pgEnum,
  pgTable,
  serial,
  smallint,
  varchar,
} from 'drizzle-orm/pg-core';
import { permissionsTable } from './users';
export const app = pgEnum('app', ['cockpit', 'finance', 'trader', 'admin']);

export const mainNavTable = pgTable('MainNavTable', {
  recordId: serial().primaryKey().notNull(),
  itemId: varchar().unique().notNull(),
  title: varchar().notNull(),
  href: varchar().notNull(),
  app: app(),
  order: smallint(),
  childOf: varchar().references((): AnyPgColumn => mainNavTable.itemId),
  permissionKey: varchar().references(() => permissionsTable.permissionKey),
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

export type InsertNavItem = typeof mainNavTable.$inferInsert;
export type SelectNavItem = typeof mainNavTable.$inferSelect;
