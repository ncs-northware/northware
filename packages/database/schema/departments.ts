import { relations } from "drizzle-orm";
import { pgTable, serial, smallint, varchar } from "drizzle-orm/pg-core";
import { companiesTable } from "./companies";
import { employmentsTable } from "./hr-employees";

export const departmentsTable = pgTable("departments", {
  companyId: smallint("company_id")
    .notNull()
    .references(() => companiesTable.companyId, { onDelete: "cascade" }),
  departmentName: varchar("department_name", { length: 50 }).notNull(),
  mail: varchar("mail", { length: 100 }).notNull(),
  phone: varchar("phone", { length: 50 }).notNull(),
  recordId: serial("record_id").primaryKey().notNull(),
});

export const departmentsRelations = relations(
  departmentsTable,
  ({ many, one }) => ({
    company: one(companiesTable, {
      fields: [departmentsTable.companyId],
      references: [companiesTable.companyId],
    }),
    employeesWorkerTable: many(employmentsTable),
  })
);
