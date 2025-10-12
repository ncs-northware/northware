ALTER TABLE "employeesWorkerTable" DROP CONSTRAINT "employeesWorkerTable_employeeId_employeesPersonalTable_employee";
--> statement-breakpoint
ALTER TABLE "permissionsToAccounts" DROP CONSTRAINT "permissionsToAccounts_permissionKey_permissionsTable_permission";
--> statement-breakpoint
ALTER TABLE "permissionsToRoles" DROP CONSTRAINT "permissionsToRoles_permissionKey_permissionsTable_permissionKey";
--> statement-breakpoint
ALTER TABLE "employeesWorkerTable" ADD CONSTRAINT "employeesWorkerTable_employeeId_employeesPersonalTable_employeeId_fk" FOREIGN KEY ("employeeId") REFERENCES "public"."employeesPersonalTable"("employeeId") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "permissionsToAccounts" ADD CONSTRAINT "permissionsToAccounts_permissionKey_permissionsTable_permissionKey_fk" FOREIGN KEY ("permissionKey") REFERENCES "public"."permissionsTable"("permissionKey") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "permissionsToRoles" ADD CONSTRAINT "permissionsToRoles_permissionKey_permissionsTable_permissionKey_fk" FOREIGN KEY ("permissionKey") REFERENCES "public"."permissionsTable"("permissionKey") ON DELETE cascade ON UPDATE cascade;