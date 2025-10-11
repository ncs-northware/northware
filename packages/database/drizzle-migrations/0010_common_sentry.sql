CREATE TABLE "CompaniesTable" (
	"companyId" smallint PRIMARY KEY NOT NULL,
	"companyName" varchar(200),
	"street" varchar(100),
	"streetNumber" smallint,
	"zipcode" smallint,
	"city" varchar(50),
	"phone" varchar(50),
	"fax" varchar(50),
	"mail" varchar(100),
	"website" varchar(75),
	"hrEntry" varchar(15),
	"hrCourt" varchar(50),
	"ustIdNr" varchar(15),
	"taxNumber" varchar(15)
);
--> statement-breakpoint
CREATE TABLE "DepartmentsTable" (
	"recordId" serial PRIMARY KEY NOT NULL,
	"departmentName" varchar(50) NOT NULL,
	"companyId" smallint NOT NULL,
	"departmentPhone" varchar(50) NOT NULL,
	"departmentMail" varchar(100) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "EmployeesPersonalTable" (
	"employeeId" serial PRIMARY KEY NOT NULL,
	"sirName" varchar(75) NOT NULL,
	"firstName" varchar(75) NOT NULL,
	"fullName" varchar(150),
	"sex" varchar(10) NOT NULL,
	"birthday" date,
	"street" varchar(100),
	"zipcode" smallint,
	"city" varchar(100),
	"meritalStatus" varchar(15) NOT NULL,
	"religion" varchar(10) NOT NULL,
	"taxClass" smallint,
	"taxKids" smallint
);
--> statement-breakpoint
CREATE TABLE "EmployeesWorkerTable" (
	"recordId" serial PRIMARY KEY NOT NULL,
	"employeeId" smallint,
	"position" varchar(100) NOT NULL,
	"phoneWork" varchar(50) NOT NULL,
	"mailWork" varchar(200) NOT NULL,
	"department" smallint,
	"company" smallint,
	"contractSince" date NOT NULL,
	"paygrade" varchar(5) NOT NULL,
	"educationStage" smallint NOT NULL,
	"experienceLevel" varchar(3) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "DepartmentsTable" ADD CONSTRAINT "DepartmentsTable_companyId_CompaniesTable_companyId_fk" FOREIGN KEY ("companyId") REFERENCES "public"."CompaniesTable"("companyId") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "EmployeesWorkerTable" ADD CONSTRAINT "EmployeesWorkerTable_department_DepartmentsTable_recordId_fk" FOREIGN KEY ("department") REFERENCES "public"."DepartmentsTable"("recordId") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "EmployeesWorkerTable" ADD CONSTRAINT "EmployeesWorkerTable_company_CompaniesTable_companyId_fk" FOREIGN KEY ("company") REFERENCES "public"."CompaniesTable"("companyId") ON DELETE set null ON UPDATE no action;