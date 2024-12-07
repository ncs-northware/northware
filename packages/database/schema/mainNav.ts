import {
  pgTable,
  varchar,
  smallint,
  serial,
  foreignKey,
  unique,
  pgEnum,
} from "drizzle-orm/pg-core";

export const appEnum = pgEnum("app", ["cockpit", "finance", "trader", "admin"]);

export const mainNav = pgTable(
  "MainNav",
  {
    recordId: serial().primaryKey().notNull(),
    itemId: varchar().unique().notNull(),
    title: varchar().notNull(),
    href: varchar().notNull(),
    app: appEnum(),
    order: smallint(),
    childOf: varchar(),
    permissionKey: varchar("permission_key"),
  },
  (table) => {
    return {
      mainNavChildOfMainNavIdFk: foreignKey({
        columns: [table.childOf],
        foreignColumns: [table.itemId],
        name: "MainNav_childOf_MainNav_itemId_fk",
      }),
      mainNavPermissionKeyUnique: unique("MainNav_permission_key_unique").on(
        table.permissionKey,
      ),
    };
  },
);

export type InsertNavItem = typeof mainNav.$inferInsert;
export type SelectNavItem = typeof mainNav.$inferSelect;
