ALTER TABLE "employeesPersonalTable" ADD COLUMN "phoneWork" varchar(50);--> statement-breakpoint
ALTER TABLE "employeesPersonalTable" ADD COLUMN "mailWork" varchar(200);--> statement-breakpoint
ALTER TABLE "employeesWorkerTable" DROP COLUMN "phoneWork";--> statement-breakpoint
ALTER TABLE "employeesWorkerTable" DROP COLUMN "mailWork";