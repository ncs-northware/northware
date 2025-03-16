-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE "MainNavTable" (
	"recordId" serial PRIMARY KEY NOT NULL,
	"itemId" varchar NOT NULL,
	"title" varchar NOT NULL,
	"href" varchar NOT NULL,
	"app" varchar,
	"order" smallint,
	"childOf" varchar,
	"permissionKey" varchar,
	CONSTRAINT "MainNavTable_itemId_unique" UNIQUE("itemId")
);
--> statement-breakpoint
CREATE TABLE "PermissionsTable" (
	"recordId" serial PRIMARY KEY NOT NULL,
	"permissionKey" varchar NOT NULL,
	"permissionName" varchar,
	CONSTRAINT "PermissionsTable_permissionKey_unique" UNIQUE("permissionKey")
);
--> statement-breakpoint
CREATE TABLE "AccountsTable" (
	"clerkUserId" varchar PRIMARY KEY NOT NULL,
	"clerkUserName" varchar
);
--> statement-breakpoint
CREATE TABLE "RolesTable" (
	"recordId" serial PRIMARY KEY NOT NULL,
	"roleKey" varchar NOT NULL,
	"roleName" varchar,
	CONSTRAINT "RolesTable_roleKey_unique" UNIQUE("roleKey")
);
--> statement-breakpoint
CREATE TABLE "PermissionsToRoles" (
	"permissionKey" varchar NOT NULL,
	"roleKey" varchar NOT NULL,
	CONSTRAINT "PermissionsToRoles_permissionKey_roleKey_pk" PRIMARY KEY("permissionKey","roleKey")
);
--> statement-breakpoint
CREATE TABLE "PermissionsToAccounts" (
	"permissionKey" varchar NOT NULL,
	"accountUserId" varchar NOT NULL,
	CONSTRAINT "PermissionsToAccounts_permissionKey_accountUserId_pk" PRIMARY KEY("permissionKey","accountUserId")
);
--> statement-breakpoint
CREATE TABLE "RolesToAccounts" (
	"roleKey" varchar NOT NULL,
	"accountUserId" varchar NOT NULL,
	CONSTRAINT "RolesToAccounts_roleKey_accountUserId_pk" PRIMARY KEY("roleKey","accountUserId")
);
--> statement-breakpoint
ALTER TABLE "MainNavTable" ADD CONSTRAINT "MainNavTable_childOf_MainNavTable_itemId_fk" FOREIGN KEY ("childOf") REFERENCES "public"."MainNavTable"("itemId") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "MainNavTable" ADD CONSTRAINT "MainNavTable_permissionKey_PermissionsTable_permissionKey_fk" FOREIGN KEY ("permissionKey") REFERENCES "public"."PermissionsTable"("permissionKey") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "PermissionsToRoles" ADD CONSTRAINT "PermissionsToRoles_roleKey_RolesTable_roleKey_fk" FOREIGN KEY ("roleKey") REFERENCES "public"."RolesTable"("roleKey") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "PermissionsToRoles" ADD CONSTRAINT "PermissionsToRoles_permissionKey_PermissionsTable_permissionKey" FOREIGN KEY ("permissionKey") REFERENCES "public"."PermissionsTable"("permissionKey") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "PermissionsToAccounts" ADD CONSTRAINT "PermissionsToAccounts_permissionKey_PermissionsTable_permission" FOREIGN KEY ("permissionKey") REFERENCES "public"."PermissionsTable"("permissionKey") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "PermissionsToAccounts" ADD CONSTRAINT "PermissionsToAccounts_accountUserId_AccountsTable_clerkUserId_f" FOREIGN KEY ("accountUserId") REFERENCES "public"."AccountsTable"("clerkUserId") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "RolesToAccounts" ADD CONSTRAINT "RolesToAccounts_roleKey_RolesTable_roleKey_fk" FOREIGN KEY ("roleKey") REFERENCES "public"."RolesTable"("roleKey") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "RolesToAccounts" ADD CONSTRAINT "RolesToAccounts_accountUserId_AccountsTable_clerkUserId_fk" FOREIGN KEY ("accountUserId") REFERENCES "public"."AccountsTable"("clerkUserId") ON DELETE no action ON UPDATE no action;
*/