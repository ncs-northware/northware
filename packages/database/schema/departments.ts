import { relations } from "drizzle-orm";
import { pgTable, serial, smallint, varchar } from "drizzle-orm/pg-core";
import { companiesTable } from "./companies";
import { employmentsTable } from "./hr-employees";

export const departmentsTable = pgTable("departments", {
  recordId: serial("record_id").primaryKey().notNull(),
  departmentName: varchar("department_name", { length: 50 }).notNull(),
  companyId: smallint("company_id")
    .notNull()
    .references(() => companiesTable.companyId, { onDelete: "cascade" }),
  phone: varchar("phone", { length: 50 }).notNull(),
  mail: varchar("mail", { length: 100 }).notNull(),
});

export const departmentsRelations = relations(
  departmentsTable,
  ({ many, one }) => ({
    employeesWorkerTable: many(employmentsTable),
    company: one(companiesTable, {
      fields: [departmentsTable.companyId],
      references: [companiesTable.companyId],
    }),
  })
);
