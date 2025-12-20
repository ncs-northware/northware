CREATE TABLE "companies" (
	"companyId" smallint PRIMARY KEY NOT NULL,
	"companyName" varchar(200) NOT NULL,
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
CREATE TABLE "departments" (
	"recordId" serial PRIMARY KEY NOT NULL,
	"departmentName" varchar(50) NOT NULL,
	"companyId" smallint NOT NULL,
	"phone" varchar(50) NOT NULL,
	"mail" varchar(100) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "employees" (
	"employeeId" serial PRIMARY KEY NOT NULL,
	"sirName" varchar(75) NOT NULL,
	"firstName" varchar(75) NOT NULL,
	"sex" varchar(10) NOT NULL,
	"birthday" date,
	"street" varchar(100),
	"zipcode" varchar(10),
	"city" varchar(100),
	"phoneWork" varchar(50) NOT NULL,
	"mailWork" varchar(200) NOT NULL,
	"meritalStatus" varchar(15) NOT NULL,
	"religion" varchar(10) NOT NULL,
	"taxClass" varchar(3) NOT NULL,
	"taxKids" smallint NOT NULL
);
--> statement-breakpoint
CREATE TABLE "employments" (
	"recordId" serial PRIMARY KEY NOT NULL,
	"employeeId" integer NOT NULL,
	"position" varchar(100) NOT NULL,
	"department" smallint,
	"employer" smallint,
	"contractStart" date NOT NULL,
	"contractEnd" date,
	"paygrade" varchar(5) NOT NULL,
	"educationStage" smallint NOT NULL,
	"experienceLevel" varchar(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "main_nav" (
	"recordId" serial PRIMARY KEY NOT NULL,
	"itemId" varchar NOT NULL,
	"title" varchar NOT NULL,
	"href" varchar NOT NULL,
	"app" varchar NOT NULL,
	"order" smallint,
	"childOf" varchar,
	"permissionKey" varchar,
	CONSTRAINT "main_nav_itemId_unique" UNIQUE("itemId")
);
--> statement-breakpoint
CREATE TABLE "permissions" (
	"recordId" serial PRIMARY KEY NOT NULL,
	"permissionKey" varchar NOT NULL,
	"permissionName" varchar,
	CONSTRAINT "permissions_permissionKey_unique" UNIQUE("permissionKey")
);
--> statement-breakpoint
CREATE TABLE "permissions_to_accounts" (
	"recordId" serial PRIMARY KEY NOT NULL,
	"permissionKey" varchar NOT NULL,
	"accountUserId" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "permissions_to_roles" (
	"permissionKey" varchar NOT NULL,
	"roleKey" varchar NOT NULL,
	CONSTRAINT "permissions_to_roles_permissionKey_roleKey_pk" PRIMARY KEY("permissionKey","roleKey")
);
--> statement-breakpoint
CREATE TABLE "roles" (
	"recordId" serial PRIMARY KEY NOT NULL,
	"roleKey" varchar NOT NULL,
	"roleName" varchar,
	CONSTRAINT "roles_roleKey_unique" UNIQUE("roleKey")
);
--> statement-breakpoint
CREATE TABLE "roles_to_accounts" (
	"recordId" serial PRIMARY KEY NOT NULL,
	"roleKey" varchar NOT NULL,
	"accountUserId" varchar NOT NULL
);
--> statement-breakpoint
ALTER TABLE "departments" ADD CONSTRAINT "departments_companyId_companies_companyId_fk" FOREIGN KEY ("companyId") REFERENCES "public"."companies"("companyId") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "employments" ADD CONSTRAINT "employments_employeeId_employees_employeeId_fk" FOREIGN KEY ("employeeId") REFERENCES "public"."employees"("employeeId") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "employments" ADD CONSTRAINT "employments_department_departments_recordId_fk" FOREIGN KEY ("department") REFERENCES "public"."departments"("recordId") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "employments" ADD CONSTRAINT "employments_employer_companies_companyId_fk" FOREIGN KEY ("employer") REFERENCES "public"."companies"("companyId") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "main_nav" ADD CONSTRAINT "main_nav_childOf_main_nav_itemId_fk" FOREIGN KEY ("childOf") REFERENCES "public"."main_nav"("itemId") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "main_nav" ADD CONSTRAINT "main_nav_permissionKey_permissions_permissionKey_fk" FOREIGN KEY ("permissionKey") REFERENCES "public"."permissions"("permissionKey") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "permissions_to_accounts" ADD CONSTRAINT "permissions_to_accounts_permissionKey_permissions_permissionKey_fk" FOREIGN KEY ("permissionKey") REFERENCES "public"."permissions"("permissionKey") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "permissions_to_roles" ADD CONSTRAINT "permissions_to_roles_permissionKey_permissions_permissionKey_fk" FOREIGN KEY ("permissionKey") REFERENCES "public"."permissions"("permissionKey") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "permissions_to_roles" ADD CONSTRAINT "permissions_to_roles_roleKey_roles_roleKey_fk" FOREIGN KEY ("roleKey") REFERENCES "public"."roles"("roleKey") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "roles_to_accounts" ADD CONSTRAINT "roles_to_accounts_roleKey_roles_roleKey_fk" FOREIGN KEY ("roleKey") REFERENCES "public"."roles"("roleKey") ON DELETE cascade ON UPDATE cascade;