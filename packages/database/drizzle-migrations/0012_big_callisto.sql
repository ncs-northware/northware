ALTER TABLE "DepartmentsTable" RENAME COLUMN "departmentPhone" TO "phone";--> statement-breakpoint
ALTER TABLE "DepartmentsTable" RENAME COLUMN "departmentMail" TO "mail";--> statement-breakpoint
ALTER TABLE "EmployeesWorkerTable" RENAME COLUMN "company" TO "employer";--> statement-breakpoint
ALTER TABLE "EmployeesWorkerTable" DROP CONSTRAINT "EmployeesWorkerTable_company_CompaniesTable_companyId_fk";
--> statement-breakpoint
ALTER TABLE "EmployeesWorkerTable" ADD CONSTRAINT "EmployeesWorkerTable_employer_CompaniesTable_companyId_fk" FOREIGN KEY ("employer") REFERENCES "public"."CompaniesTable"("companyId") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "EmployeesPersonalTable" DROP COLUMN "fullName";