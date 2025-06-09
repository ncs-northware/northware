ALTER TABLE "RolesToAccounts" DROP CONSTRAINT "RolesToAccounts_roleKey_RolesTable_roleKey_fk";
--> statement-breakpoint
ALTER TABLE "RolesToAccounts" ADD CONSTRAINT "RolesToAccounts_roleKey_RolesTable_roleKey_fk" FOREIGN KEY ("roleKey") REFERENCES "public"."RolesTable"("roleKey") ON DELETE cascade ON UPDATE no action;