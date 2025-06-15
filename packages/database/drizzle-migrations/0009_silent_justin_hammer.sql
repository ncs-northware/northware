ALTER TABLE "PermissionsToAccounts" DROP CONSTRAINT "PermissionsToAccounts_permissionKey_PermissionsTable_permissionKey_fk";
--> statement-breakpoint
ALTER TABLE "PermissionsToRoles" DROP CONSTRAINT "PermissionsToRoles_permissionKey_PermissionsTable_permissionKey_fk";
--> statement-breakpoint
ALTER TABLE "PermissionsToRoles" DROP CONSTRAINT "PermissionsToRoles_roleKey_RolesTable_roleKey_fk";
--> statement-breakpoint
ALTER TABLE "RolesToAccounts" DROP CONSTRAINT "RolesToAccounts_roleKey_RolesTable_roleKey_fk";
--> statement-breakpoint
ALTER TABLE "PermissionsToAccounts" ADD CONSTRAINT "PermissionsToAccounts_permissionKey_PermissionsTable_permissionKey_fk" FOREIGN KEY ("permissionKey") REFERENCES "public"."PermissionsTable"("permissionKey") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "PermissionsToRoles" ADD CONSTRAINT "PermissionsToRoles_permissionKey_PermissionsTable_permissionKey_fk" FOREIGN KEY ("permissionKey") REFERENCES "public"."PermissionsTable"("permissionKey") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "PermissionsToRoles" ADD CONSTRAINT "PermissionsToRoles_roleKey_RolesTable_roleKey_fk" FOREIGN KEY ("roleKey") REFERENCES "public"."RolesTable"("roleKey") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "RolesToAccounts" ADD CONSTRAINT "RolesToAccounts_roleKey_RolesTable_roleKey_fk" FOREIGN KEY ("roleKey") REFERENCES "public"."RolesTable"("roleKey") ON DELETE cascade ON UPDATE cascade;