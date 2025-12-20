import { relations } from "drizzle-orm";
import { pgTable, primaryKey, serial, varchar } from "drizzle-orm/pg-core";

export const permissionsTable = pgTable("permissions", {
  recordId: serial().primaryKey().notNull(),
  permissionKey: varchar().unique().notNull(),
  permissionName: varchar(),
});

export const permissionsRelations = relations(permissionsTable, ({ many }) => ({
  permissionsToRoles: many(permissionsToRoles),
  permissionsToAccounts: many(permissionsToAccounts),
}));

export const rolesTable = pgTable("roles", {
  recordId: serial().primaryKey().notNull(),
  roleKey: varchar().unique().notNull(),
  roleName: varchar(),
});

export const rolesRelations = relations(rolesTable, ({ many }) => ({
  permissionsToRoles: many(permissionsToRoles),
  rolesToAccounts: many(rolesToAccounts),
}));

export const permissionsToRoles = pgTable(
  "permissions_to_roles",
  {
    permissionKey: varchar()
      .notNull()
      .references(() => permissionsTable.permissionKey, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    roleKey: varchar()
      .notNull()
      .references(() => rolesTable.roleKey, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
  },
  (t) => [primaryKey({ columns: [t.permissionKey, t.roleKey] })]
);

export const permissionsToRolesRelations = relations(
  permissionsToRoles,
  ({ one }) => ({
    permisson: one(permissionsTable, {
      fields: [permissionsToRoles.permissionKey],
      references: [permissionsTable.permissionKey],
    }),
    role: one(rolesTable, {
      fields: [permissionsToRoles.roleKey],
      references: [rolesTable.roleKey],
    }),
  })
);

export const permissionsToAccounts = pgTable("permissions_to_accounts", {
  recordId: serial().primaryKey().notNull(),
  permissionKey: varchar()
    .notNull()
    .references(() => permissionsTable.permissionKey, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  accountUserId: varchar().notNull(),
});

export const permissionsToAccountsRelations = relations(
  permissionsToAccounts,
  ({ one }) => ({
    permission: one(permissionsTable, {
      fields: [permissionsToAccounts.permissionKey],
      references: [permissionsTable.permissionKey],
    }),
  })
);

export const rolesToAccounts = pgTable("roles_to_accounts", {
  recordId: serial().primaryKey().notNull(),
  roleKey: varchar()
    .notNull()
    .references(() => rolesTable.roleKey, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  accountUserId: varchar().notNull(),
});

export const rolesToAccountsRelations = relations(
  rolesToAccounts,
  ({ one }) => ({
    role: one(rolesTable, {
      fields: [rolesToAccounts.roleKey],
      references: [rolesTable.roleKey],
    }),
  })
);
