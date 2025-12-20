ALTER TABLE "companies" RENAME COLUMN "companyId" TO "company_id";--> statement-breakpoint
ALTER TABLE "companies" RENAME COLUMN "companyName" TO "company_name";--> statement-breakpoint
ALTER TABLE "companies" RENAME COLUMN "streetNumber" TO "street_number";--> statement-breakpoint
ALTER TABLE "companies" RENAME COLUMN "zipcode" TO "zip_code";--> statement-breakpoint
ALTER TABLE "companies" RENAME COLUMN "hrEntry" TO "hr_entry";--> statement-breakpoint
ALTER TABLE "companies" RENAME COLUMN "hrCourt" TO "hr_court";--> statement-breakpoint
ALTER TABLE "companies" RENAME COLUMN "ustIdNr" TO "ust_id_nr";--> statement-breakpoint
ALTER TABLE "companies" RENAME COLUMN "taxNumber" TO "tax_number";--> statement-breakpoint
ALTER TABLE "departments" RENAME COLUMN "recordId" TO "record_id";--> statement-breakpoint
ALTER TABLE "departments" RENAME COLUMN "departmentName" TO "department_name";--> statement-breakpoint
ALTER TABLE "departments" RENAME COLUMN "companyId" TO "company_id";--> statement-breakpoint
ALTER TABLE "employees" RENAME COLUMN "employeeId" TO "employee_id";--> statement-breakpoint
ALTER TABLE "employees" RENAME COLUMN "sirName" TO "sir_name";--> statement-breakpoint
ALTER TABLE "employees" RENAME COLUMN "firstName" TO "first_name";--> statement-breakpoint
ALTER TABLE "employees" RENAME COLUMN "zipcode" TO "zip_code";--> statement-breakpoint
ALTER TABLE "employees" RENAME COLUMN "phoneWork" TO "phone_work";--> statement-breakpoint
ALTER TABLE "employees" RENAME COLUMN "mailWork" TO "mail_work";--> statement-breakpoint
ALTER TABLE "employees" RENAME COLUMN "meritalStatus" TO "merital_status";--> statement-breakpoint
ALTER TABLE "employees" RENAME COLUMN "taxClass" TO "tax_class";--> statement-breakpoint
ALTER TABLE "employees" RENAME COLUMN "taxKids" TO "tax_kids";--> statement-breakpoint
ALTER TABLE "employments" RENAME COLUMN "recordId" TO "record_id";--> statement-breakpoint
ALTER TABLE "employments" RENAME COLUMN "employeeId" TO "employee_id";--> statement-breakpoint
ALTER TABLE "employments" RENAME COLUMN "contractStart" TO "contract_start";--> statement-breakpoint
ALTER TABLE "employments" RENAME COLUMN "contractEnd" TO "contract_end";--> statement-breakpoint
ALTER TABLE "employments" RENAME COLUMN "educationStage" TO "education_stage";--> statement-breakpoint
ALTER TABLE "employments" RENAME COLUMN "experienceLevel" TO "experience_level";--> statement-breakpoint
ALTER TABLE "departments" DROP CONSTRAINT "departments_companyId_companies_companyId_fk";
--> statement-breakpoint
ALTER TABLE "employments" DROP CONSTRAINT "employments_employeeId_employees_employeeId_fk";
--> statement-breakpoint
ALTER TABLE "employments" DROP CONSTRAINT "employments_department_departments_recordId_fk";
--> statement-breakpoint
ALTER TABLE "employments" DROP CONSTRAINT "employments_employer_companies_companyId_fk";
--> statement-breakpoint
ALTER TABLE "departments" ADD CONSTRAINT "departments_company_id_companies_company_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("company_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "employments" ADD CONSTRAINT "employments_employee_id_employees_employee_id_fk" FOREIGN KEY ("employee_id") REFERENCES "public"."employees"("employee_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "employments" ADD CONSTRAINT "employments_department_departments_record_id_fk" FOREIGN KEY ("department") REFERENCES "public"."departments"("record_id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "employments" ADD CONSTRAINT "employments_employer_companies_company_id_fk" FOREIGN KEY ("employer") REFERENCES "public"."companies"("company_id") ON DELETE set null ON UPDATE no action;