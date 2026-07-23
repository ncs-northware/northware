import { relations } from "drizzle-orm";
import { pgTable, smallint, varchar } from "drizzle-orm/pg-core";
import { departmentsTable } from "./departments";
import { employmentsTable } from "./hr-employees";

export const companiesTable = pgTable("companies", {
  city: varchar("city", { length: 50 }),
  companyId: smallint("company_id").primaryKey().notNull(),
  companyName: varchar("company_name", { length: 200 }).notNull(),
  fax: varchar("fax", { length: 50 }),
  hrCourt: varchar("hr_court", { length: 50 }),
  hrEntry: varchar("hr_entry", { length: 15 }),
  mail: varchar("mail", { length: 100 }),
  phone: varchar("phone", { length: 50 }),
  street: varchar("street", { length: 100 }),
  streetNumber: smallint("street_number"),
  taxNumber: varchar("tax_number", { length: 15 }),
  // directors: varchar(),
  ustIdNr: varchar("ust_id_nr", { length: 15 }),
  website: varchar("website", { length: 75 }),
  zipcode: smallint("zip_code"),
  // bank accounts
  // logo
});

export const companiesRelations = relations(companiesTable, ({ many }) => ({
  departments: many(departmentsTable),
  employeesWorkerTable: many(employmentsTable),
}));
