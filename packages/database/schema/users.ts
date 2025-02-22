import { relations } from 'drizzle-orm';
import {
  integer,
  pgTable,
  primaryKey,
  serial,
  varchar,
} from 'drizzle-orm/pg-core';

export const permissionsTable = pgTable('PermissionsTable', {
  recordId: serial().primaryKey().notNull(),
  permissionKey: varchar().unique().notNull(),
  permissionName: varchar(),
});

export const permissionsRelations = relations(permissionsTable, ({ many }) => ({
  permissionsToRoles: many(permissionsToRoles),
  permissionsToAccounts: many(permissionsToAccounts),
}));

export const rolesTable = pgTable('RolesTable', {
  recordId: serial().primaryKey().notNull(),
  roleKey: varchar().unique().notNull(),
  roleName: varchar(),
});

export const rolesRelations = relations(rolesTable, ({ many }) => ({
  permissionsToRoles: many(permissionsToRoles),
  rolesToAccounts: many(rolesToAccounts),
}));

export const accountsTable = pgTable('AccountsTable', {
  recordId: serial().primaryKey().notNull(),
  clerkUserId: varchar(),
  clerkUserName: varchar(),
});

export const accountsRelations = relations(accountsTable, ({ many }) => ({
  permissionsToAccounts: many(permissionsToAccounts),
  rolesToAccounts: many(rolesToAccounts),
}));

export const permissionsToRoles = pgTable(
  'PermissionsToRoles',
  {
    permissionId: integer()
      .notNull()
      .references(() => permissionsTable.recordId),
    roleId: integer()
      .notNull()
      .references(() => rolesTable.recordId),
  },
  (t) => [primaryKey({ columns: [t.permissionId, t.roleId] })]
);

export const permissionsToRolesRelations = relations(
  permissionsToRoles,
  ({ one }) => ({
    permisson: one(permissionsTable, {
      fields: [permissionsToRoles.permissionId],
      references: [permissionsTable.recordId],
    }),
    role: one(rolesTable, {
      fields: [permissionsToRoles.roleId],
      references: [rolesTable.recordId],
    }),
  })
);

export const permissionsToAccounts = pgTable(
  'PermissionsToAccounts',
  {
    permissionId: integer()
      .notNull()
      .references(() => permissionsTable.recordId),
    accountId: integer()
      .notNull()
      .references(() => accountsTable.recordId),
  },
  (t) => [primaryKey({ columns: [t.permissionId, t.accountId] })]
);

export const permissionsToAccountsRelations = relations(
  permissionsToAccounts,
  ({ one }) => ({
    permission: one(permissionsTable, {
      fields: [permissionsToAccounts.permissionId],
      references: [permissionsTable.recordId],
    }),
    account: one(accountsTable, {
      fields: [permissionsToAccounts.accountId],
      references: [accountsTable.recordId],
    }),
  })
);

export const rolesToAccounts = pgTable(
  'RolesToAccounts',
  {
    roleId: integer()
      .notNull()
      .references(() => rolesTable.recordId),
    accountId: integer()
      .notNull()
      .references(() => accountsTable.recordId),
  },
  (t) => [primaryKey({ columns: [t.roleId, t.accountId] })]
);

export const rolesToAccountsRelations = relations(
  rolesToAccounts,
  ({ one }) => ({
    role: one(rolesTable, {
      fields: [rolesToAccounts.roleId],
      references: [rolesTable.recordId],
    }),
    account: one(accountsTable, {
      fields: [rolesToAccounts.accountId],
      references: [accountsTable.recordId],
    }),
  })
);
