ALTER TABLE "employeesPersonalTable" ALTER COLUMN "taxClass" SET DATA TYPE varchar(3);--> statement-breakpoint
ALTER TABLE "employeesPersonalTable" ALTER COLUMN "taxClass" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "employeesPersonalTable" ALTER COLUMN "taxKids" SET NOT NULL;