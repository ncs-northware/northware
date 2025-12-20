import { relations } from "drizzle-orm";
import { pgTable, smallint, varchar } from "drizzle-orm/pg-core";
import { departmentsTable } from "./departments";
import { employmentsTable } from "./hr-employees";

export const companiesTable = pgTable("companies", {
  companyId: smallint("company_id").primaryKey().notNull(),
  companyName: varchar("company_name", { length: 200 }).notNull(),
  street: varchar("street", { length: 100 }),
  streetNumber: smallint("street_number"),
  zipcode: smallint("zip_code"),
  city: varchar("city", { length: 50 }),
  phone: varchar("phone", { length: 50 }),
  fax: varchar("fax", { length: 50 }),
  mail: varchar("mail", { length: 100 }),
  website: varchar("website", { length: 75 }),
  hrEntry: varchar("hr_entry", { length: 15 }),
  hrCourt: varchar("hr_court", { length: 50 }),
  // directors: varchar(),
  ustIdNr: varchar("ust_id_nr", { length: 15 }),
  taxNumber: varchar("tax_number", { length: 15 }),
  // bank accounts
  // logo
});

export const companiesRelations = relations(companiesTable, ({ many }) => ({
  departments: many(departmentsTable),
  employeesWorkerTable: many(employmentsTable),
}));
