import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const userTable = pgTable("User", {
  id: serial().primaryKey().notNull(),
  email: varchar({ length: 64 }),
  password: varchar({ length: 64 }),
  name: varchar({ length: 150 }),
});

export type InsertUser = typeof userTable.$inferInsert;
export type SelectUser = typeof userTable.$inferSelect;