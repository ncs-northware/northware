import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const user = pgTable("User", {
  id: serial().primaryKey().notNull(),
  email: varchar({ length: 64 }),
  password: varchar({ length: 64 }),
  name: varchar({ length: 150 }),
});
