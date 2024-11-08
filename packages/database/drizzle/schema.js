import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const table = pgTable("User", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 64 }),
  password: varchar("password", { length: 64 }),
  name: varchar("name", { length: 150 }),
});
