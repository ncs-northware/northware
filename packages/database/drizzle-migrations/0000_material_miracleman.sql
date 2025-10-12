-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE "companiesTable" (
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
CREATE TABLE "mainNavTable" (
	"recordId" serial PRIMARY KEY NOT NULL,
	"itemId" varchar NOT NULL,
	"title" varchar NOT NULL,
	"href" varchar NOT NULL,
	"app" varchar NOT NULL,
	"order" smallint,
	"childOf" varchar,
	"permissionKey" varchar,
	CONSTRAINT "mainNavTable_itemId_unique" UNIQUE("itemId")
);
--> statement-breakpoint
CREATE TABLE "departmentsTable" (
	"recordId" serial PRIMARY KEY NOT NULL,
	"departmentName" varchar(50) NOT NULL,
	"companyId" smallint NOT NULL,
	"phone" varchar(50) NOT NULL,
	"mail" varchar(100) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "employeesPersonalTable" (
	"employeeId" serial PRIMARY KEY NOT NULL,
	"sirName" varchar(75) NOT NULL,
	"firstName" varchar(75) NOT NULL,
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
CREATE TABLE "employeesWorkerTable" (
	"recordId" serial PRIMARY KEY NOT NULL,
	"employeeId" integer NOT NULL,
	"position" varchar(100) NOT NULL,
	"phoneWork" varchar(50) NOT NULL,
	"mailWork" varchar(200) NOT NULL,
	"department" smallint,
	"employer" smallint,
	"contractSince" date NOT NULL,
	"paygrade" varchar(5) NOT NULL,
	"educationStage" smallint NOT NULL,
	"experienceLevel" varchar(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "permissionsTable" (
	"recordId" serial PRIMARY KEY NOT NULL,
	"permissionKey" varchar NOT NULL,
	"permissionName" varchar,
	CONSTRAINT "permissionsTable_permissionKey_unique" UNIQUE("permissionKey")
);
--> statement-breakpoint
CREATE TABLE "permissionsToAccounts" (
	"permissionKey" varchar NOT NULL,
	"accountUserId" varchar NOT NULL,
	"recordId" serial PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE "rolesTable" (
	"recordId" serial PRIMARY KEY NOT NULL,
	"roleKey" varchar NOT NULL,
	"roleName" varchar,
	CONSTRAINT "rolesTable_roleKey_unique" UNIQUE("roleKey")
);
--> statement-breakpoint
CREATE TABLE "rolesToAccounts" (
	"roleKey" varchar NOT NULL,
	"accountUserId" varchar NOT NULL,
	"recordId" serial PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE "permissionsToRoles" (
	"permissionKey" varchar NOT NULL,
	"roleKey" varchar NOT NULL,
	CONSTRAINT "permissionsToRoles_permissionKey_roleKey_pk" PRIMARY KEY("permissionKey","roleKey")
);
--> statement-breakpoint
ALTER TABLE "mainNavTable" ADD CONSTRAINT "mainNavTable_permissionKey_permissionsTable_permissionKey_fk" FOREIGN KEY ("permissionKey") REFERENCES "public"."permissionsTable"("permissionKey") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mainNavTable" ADD CONSTRAINT "mainNavTable_childOf_mainNavTable_itemId_fk" FOREIGN KEY ("childOf") REFERENCES "public"."mainNavTable"("itemId") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "departmentsTable" ADD CONSTRAINT "departmentsTable_companyId_companiesTable_companyId_fk" FOREIGN KEY ("companyId") REFERENCES "public"."companiesTable"("companyId") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "employeesWorkerTable" ADD CONSTRAINT "employeesWorkerTable_employeeId_employeesPersonalTable_employee" FOREIGN KEY ("employeeId") REFERENCES "public"."employeesPersonalTable"("employeeId") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "employeesWorkerTable" ADD CONSTRAINT "employeesWorkerTable_department_departmentsTable_recordId_fk" FOREIGN KEY ("department") REFERENCES "public"."departmentsTable"("recordId") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "employeesWorkerTable" ADD CONSTRAINT "employeesWorkerTable_employer_companiesTable_companyId_fk" FOREIGN KEY ("employer") REFERENCES "public"."companiesTable"("companyId") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "permissionsToAccounts" ADD CONSTRAINT "permissionsToAccounts_permissionKey_permissionsTable_permission" FOREIGN KEY ("permissionKey") REFERENCES "public"."permissionsTable"("permissionKey") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "rolesToAccounts" ADD CONSTRAINT "rolesToAccounts_roleKey_rolesTable_roleKey_fk" FOREIGN KEY ("roleKey") REFERENCES "public"."rolesTable"("roleKey") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "permissionsToRoles" ADD CONSTRAINT "permissionsToRoles_permissionKey_permissionsTable_permissionKey" FOREIGN KEY ("permissionKey") REFERENCES "public"."permissionsTable"("permissionKey") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "permissionsToRoles" ADD CONSTRAINT "permissionsToRoles_roleKey_rolesTable_roleKey_fk" FOREIGN KEY ("roleKey") REFERENCES "public"."rolesTable"("roleKey") ON DELETE cascade ON UPDATE cascade;
*/