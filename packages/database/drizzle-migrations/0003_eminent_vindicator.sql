ALTER TABLE "AccountsTable" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "AccountsTable" CASCADE;--> statement-breakpoint
--> statement-breakpoint
--> statement-breakpoint
ALTER TABLE "PermissionsToAccounts" DROP CONSTRAINT "PermissionsToAccounts_permissionKey_accountUserId_pk";--> statement-breakpoint
ALTER TABLE "RolesToAccounts" DROP CONSTRAINT "RolesToAccounts_roleKey_accountUserId_pk";--> statement-breakpoint
ALTER TABLE "PermissionsToAccounts" ADD CONSTRAINT "PermissionsToAccounts_permissionKey_pk" PRIMARY KEY("permissionKey");--> statement-breakpoint
ALTER TABLE "RolesToAccounts" ADD CONSTRAINT "RolesToAccounts_roleKey_pk" PRIMARY KEY("roleKey");