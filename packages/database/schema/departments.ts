import { relations } from "drizzle-orm";
import { pgTable, serial, smallint, varchar } from "drizzle-orm/pg-core";
import { companiesTable } from "./companies";
import { employeesWorkerTable } from "./hr-employees";

export const departmentsTable = pgTable("DepartmentsTable", {
  recordId: serial().primaryKey().notNull(),
  departmentName: varchar({ length: 50 }).notNull(),
  companyId: smallint()
    .notNull()
    .references(() => companiesTable.companyId, { onDelete: "cascade" }),
  phone: varchar({ length: 50 }).notNull(),
  mail: varchar({ length: 100 }).notNull(),
});

export const departmentsRelations = relations(
  departmentsTable,
  ({ many, one }) => ({
    employeesWorkerTable: many(employeesWorkerTable),
    company: one(companiesTable, {
      fields: [departmentsTable.companyId],
      references: [companiesTable.companyId],
    }),
  })
);
