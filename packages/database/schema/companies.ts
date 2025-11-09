import { relations } from "drizzle-orm";
import { pgTable, smallint, varchar } from "drizzle-orm/pg-core";
import { departmentsTable } from "./departments";
import { employeesWorkerTable } from "./hr-employees";

export const companiesTable = pgTable("companiesTable", {
  companyId: smallint().primaryKey().notNull(),
  companyName: varchar({ length: 200 }).notNull(),
  street: varchar({ length: 100 }),
  streetNumber: smallint(),
  zipcode: smallint(),
  city: varchar({ length: 50 }),
  phone: varchar({ length: 50 }),
  fax: varchar({ length: 50 }),
  mail: varchar({ length: 100 }),
  website: varchar({ length: 75 }),
  hrEntry: varchar({ length: 15 }),
  hrCourt: varchar({ length: 50 }),
  // directors: varchar(),
  ustIdNr: varchar({ length: 15 }),
  taxNumber: varchar({ length: 15 }),
  // bank accounts
  // logo
});

export const companiesRelations = relations(companiesTable, ({ many }) => ({
  departments: many(departmentsTable),
  employeesWorkerTable: many(employeesWorkerTable),
}));
