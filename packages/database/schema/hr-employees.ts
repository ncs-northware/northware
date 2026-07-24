import { relations } from "drizzle-orm";
import {
  date,
  integer,
  pgTable,
  serial,
  smallint,
  varchar,
} from "drizzle-orm/pg-core";
import { companiesTable } from "./companies";
import { departmentsTable } from "./departments";

export const employeesTable = pgTable("employees", {
  birthday: date("birthday", { mode: "date" }),
  city: varchar("city", { length: 100 }),
  employeeId: serial("employee_id").primaryKey().notNull(),
  firstName: varchar("first_name", { length: 75 }).notNull(),
  mailWork: varchar("mail_work", { length: 200 }).notNull(),
  meritalStatus: varchar("merital_status", { length: 15 }).notNull(),
  phoneWork: varchar("phone_work", { length: 50 }).notNull(),
  religion: varchar("religion", { length: 10 }).notNull(),
  sex: varchar("sex", { length: 10 }).notNull(),
  sirName: varchar("sir_name", { length: 75 }).notNull(),
  street: varchar("street", { length: 100 }),
  taxClass: varchar("tax_class", { length: 3 }).notNull(),
  taxKids: smallint("tax_kids").notNull(),
  zipcode: varchar("zip_code", { length: 10 }),
});

export const employeesRelations = relations(employeesTable, ({ many }) => ({
  employeesWorkerTable: many(employmentsTable),
}));

export const employmentsTable = pgTable("employments", {
  contractEnd: date("contract_end", { mode: "date" }),
  contractStart: date("contract_start", { mode: "date" }).notNull(),
  department: smallint("department").references(
    () => departmentsTable.recordId,
    {
      onDelete: "set null",
    }
  ),
  educationStage: smallint("education_stage").notNull(),
  employeeId: integer("employee_id")
    .notNull()
    .references(() => employeesTable.employeeId, {
      onDelete: "cascade",
    }),
  employer: smallint("employer").references(() => companiesTable.companyId, {
    onDelete: "set null",
  }),
  experienceLevel: varchar("experience_level", { length: 3 }).notNull(),
  paygrade: varchar("paygrade", { length: 5 }).notNull(),
  position: varchar("position", { length: 100 }).notNull(),
  recordId: serial("record_id").primaryKey().notNull(),
});

export const employmentsRelations = relations(employmentsTable, ({ one }) => ({
  company: one(companiesTable, {
    fields: [employmentsTable.employer],
    references: [companiesTable.companyId],
  }),
  department: one(departmentsTable, {
    fields: [employmentsTable.department],
    references: [departmentsTable.recordId],
  }),
  employee: one(employeesTable, {
    fields: [employmentsTable.employeeId],
    references: [employeesTable.employeeId],
  }),
}));
