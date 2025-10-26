ALTER TABLE "employeesWorkerTable" RENAME COLUMN "contractSince" TO "contractStart";--> statement-breakpoint
ALTER TABLE "employeesWorkerTable" ADD COLUMN "contractEnd" date;