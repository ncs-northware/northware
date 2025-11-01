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

export const employeesPersonalTable = pgTable("employeesPersonalTable", {
  employeeId: serial().primaryKey().notNull(),
  sirName: varchar({ length: 75 }).notNull(),
  firstName: varchar({ length: 75 }).notNull(),
  sex: varchar({ length: 10 }).notNull(),
  birthday: date({ mode: "date" }),
  street: varchar({ length: 100 }),
  zipcode: varchar({ length: 10 }),
  city: varchar({ length: 100 }),
  phoneWork: varchar({ length: 50 }).notNull(),
  mailWork: varchar({ length: 200 }).notNull(),
  meritalStatus: varchar({ length: 15 }).notNull(),
  religion: varchar({ length: 10 }).notNull(),
  taxClass: varchar({ length: 3 }).notNull(),
  taxKids: smallint().notNull(),
});

export const employeesPersonalRelations = relations(
  employeesPersonalTable,
  ({ many }) => ({
    employeesWorkerTable: many(employeesWorkerTable),
  })
);

export const employeesWorkerTable = pgTable("employeesWorkerTable", {
  recordId: serial().primaryKey().notNull(),
  employeeId: integer()
    .notNull()
    .references(() => employeesPersonalTable.employeeId, {
      onDelete: "cascade",
    }),
  position: varchar({ length: 100 }).notNull(),
  department: smallint().references(() => departmentsTable.recordId, {
    onDelete: "set null",
  }),
  employer: smallint().references(() => companiesTable.companyId, {
    onDelete: "set null",
  }),
  contractStart: date({ mode: "date" }).notNull(),
  contractEnd: date({ mode: "date" }),
  paygrade: varchar({ length: 5 }).notNull(),
  educationStage: smallint().notNull(),
  experienceLevel: varchar({ length: 3 }).notNull(),
});

export const employeesWorkerRelations = relations(
  employeesWorkerTable,
  ({ one }) => ({
    employee: one(employeesPersonalTable, {
      fields: [employeesWorkerTable.employeeId],
      references: [employeesPersonalTable.employeeId],
    }),
    department: one(departmentsTable, {
      fields: [employeesWorkerTable.department],
      references: [departmentsTable.recordId],
    }),
    company: one(companiesTable, {
      fields: [employeesWorkerTable.employer],
      references: [companiesTable.companyId],
    }),
  })
);
