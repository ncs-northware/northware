ALTER TABLE "PermissionsToRoles" DROP CONSTRAINT "PermissionsToRoles_permissionKey_PermissionsTable_permissionKey";
--> statement-breakpoint
ALTER TABLE "PermissionsToAccounts" DROP CONSTRAINT "PermissionsToAccounts_permissionKey_PermissionsTable_permission";
--> statement-breakpoint
ALTER TABLE "PermissionsToAccounts" DROP CONSTRAINT "PermissionsToAccounts_accountUserId_AccountsTable_clerkUserId_f";
--> statement-breakpoint
ALTER TABLE "MainNavTable" ALTER COLUMN "app" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "PermissionsToRoles" ADD CONSTRAINT "PermissionsToRoles_permissionKey_PermissionsTable_permissionKey_fk" FOREIGN KEY ("permissionKey") REFERENCES "public"."PermissionsTable"("permissionKey") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "PermissionsToAccounts" ADD CONSTRAINT "PermissionsToAccounts_permissionKey_PermissionsTable_permissionKey_fk" FOREIGN KEY ("permissionKey") REFERENCES "public"."PermissionsTable"("permissionKey") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "PermissionsToAccounts" ADD CONSTRAINT "PermissionsToAccounts_accountUserId_AccountsTable_clerkUserId_fk" FOREIGN KEY ("accountUserId") REFERENCES "public"."AccountsTable"("clerkUserId") ON DELETE no action ON UPDATE no action;