ALTER TABLE "PermissionsToAccounts" ADD COLUMN "recordId" serial PRIMARY KEY NOT NULL;--> statement-breakpoint
ALTER TABLE "RolesToAccounts" ADD COLUMN "recordId" serial PRIMARY KEY NOT NULL;