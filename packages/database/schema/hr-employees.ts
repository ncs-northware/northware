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
  employeeId: serial("employee_id").primaryKey().notNull(),
  sirName: varchar("sir_name", { length: 75 }).notNull(),
  firstName: varchar("first_name", { length: 75 }).notNull(),
  sex: varchar("sex", { length: 10 }).notNull(),
  birthday: date("birthday", { mode: "date" }),
  street: varchar("street", { length: 100 }),
  zipcode: varchar("zip_code", { length: 10 }),
  city: varchar("city", { length: 100 }),
  phoneWork: varchar("phone_work", { length: 50 }).notNull(),
  mailWork: varchar("mail_work", { length: 200 }).notNull(),
  meritalStatus: varchar("merital_status", { length: 15 }).notNull(),
  religion: varchar("religion", { length: 10 }).notNull(),
  taxClass: varchar("tax_class", { length: 3 }).notNull(),
  taxKids: smallint("tax_kids").notNull(),
});

export const employeesRelations = relations(employeesTable, ({ many }) => ({
  employeesWorkerTable: many(employmentsTable),
}));

export const employmentsTable = pgTable("employments", {
  recordId: serial("record_id").primaryKey().notNull(),
  employeeId: integer("employee_id")
    .notNull()
    .references(() => employeesTable.employeeId, {
      onDelete: "cascade",
    }),
  position: varchar("position", { length: 100 }).notNull(),
  department: smallint("department").references(() => departmentsTable.recordId, {
    onDelete: "set null",
  }),
  employer: smallint("employer").references(() => companiesTable.companyId, {
    onDelete: "set null",
  }),
  contractStart: date("contract_start", { mode: "date" }).notNull(),
  contractEnd: date("contract_end", { mode: "date" }),
  paygrade: varchar("paygrade", { length: 5 }).notNull(),
  educationStage: smallint("education_stage").notNull(),
  experienceLevel: varchar("experience_level", { length: 3 }).notNull(),
});

export const employmentsRelations = relations(employmentsTable, ({ one }) => ({
  employee: one(employeesTable, {
    fields: [employmentsTable.employeeId],
    references: [employeesTable.employeeId],
  }),
  department: one(departmentsTable, {
    fields: [employmentsTable.department],
    references: [departmentsTable.recordId],
  }),
  company: one(companiesTable, {
    fields: [employmentsTable.employer],
    references: [companiesTable.companyId],
  }),
}));
