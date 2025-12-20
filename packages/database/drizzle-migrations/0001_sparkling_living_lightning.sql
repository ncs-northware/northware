ALTER TABLE "main_nav" RENAME COLUMN "recordId" TO "record_id";--> statement-breakpoint
ALTER TABLE "main_nav" RENAME COLUMN "itemId" TO "item_id";--> statement-breakpoint
ALTER TABLE "main_nav" RENAME COLUMN "childOf" TO "child_of";--> statement-breakpoint
ALTER TABLE "main_nav" RENAME COLUMN "permissionKey" TO "permission_key";--> statement-breakpoint
ALTER TABLE "permissions" RENAME COLUMN "recordId" TO "record_id";--> statement-breakpoint
ALTER TABLE "permissions" RENAME COLUMN "permissionKey" TO "permission_key";--> statement-breakpoint
ALTER TABLE "permissions" RENAME COLUMN "permissionName" TO "permission_name";--> statement-breakpoint
ALTER TABLE "permissions_to_accounts" RENAME COLUMN "recordId" TO "record_id";--> statement-breakpoint
ALTER TABLE "permissions_to_accounts" RENAME COLUMN "permissionKey" TO "permission_key";--> statement-breakpoint
ALTER TABLE "permissions_to_accounts" RENAME COLUMN "accountUserId" TO "account_user_id";--> statement-breakpoint
ALTER TABLE "permissions_to_roles" RENAME COLUMN "permissionKey" TO "permission_key";--> statement-breakpoint
ALTER TABLE "permissions_to_roles" RENAME COLUMN "roleKey" TO "role_key";--> statement-breakpoint
ALTER TABLE "roles" RENAME COLUMN "recordId" TO "record_id";--> statement-breakpoint
ALTER TABLE "roles" RENAME COLUMN "roleKey" TO "role_key";--> statement-breakpoint
ALTER TABLE "roles" RENAME COLUMN "roleName" TO "role_name";--> statement-breakpoint
ALTER TABLE "roles_to_accounts" RENAME COLUMN "recordId" TO "record_id";--> statement-breakpoint
ALTER TABLE "roles_to_accounts" RENAME COLUMN "roleKey" TO "role_key";--> statement-breakpoint
ALTER TABLE "roles_to_accounts" RENAME COLUMN "accountUserId" TO "account_user_id";--> statement-breakpoint
ALTER TABLE "main_nav" DROP CONSTRAINT "main_nav_childOf_main_nav_itemId_fk";
--> statement-breakpoint
ALTER TABLE "main_nav" DROP CONSTRAINT "main_nav_permissionKey_permissions_permissionKey_fk";
--> statement-breakpoint
ALTER TABLE "permissions_to_accounts" DROP CONSTRAINT "permissions_to_accounts_permissionKey_permissions_permissionKey_fk";
--> statement-breakpoint
ALTER TABLE "permissions_to_roles" DROP CONSTRAINT "permissions_to_roles_permissionKey_permissions_permissionKey_fk";
--> statement-breakpoint
ALTER TABLE "permissions_to_roles" DROP CONSTRAINT "permissions_to_roles_roleKey_roles_roleKey_fk";
--> statement-breakpoint
ALTER TABLE "roles_to_accounts" DROP CONSTRAINT "roles_to_accounts_roleKey_roles_roleKey_fk";
--> statement-breakpoint
ALTER TABLE "main_nav" DROP CONSTRAINT "main_nav_itemId_unique";--> statement-breakpoint
ALTER TABLE "permissions" DROP CONSTRAINT "permissions_permissionKey_unique";--> statement-breakpoint
ALTER TABLE "roles" DROP CONSTRAINT "roles_roleKey_unique";--> statement-breakpoint
ALTER TABLE "permissions_to_roles" DROP CONSTRAINT "permissions_to_roles_permissionKey_roleKey_pk";--> statement-breakpoint
ALTER TABLE "permissions_to_roles" ADD CONSTRAINT "permissions_to_roles_permission_key_role_key_pk" PRIMARY KEY("permission_key","role_key");--> statement-breakpoint
ALTER TABLE "main_nav" ADD CONSTRAINT "main_nav_item_id_unique" UNIQUE("item_id");--> statement-breakpoint
ALTER TABLE "permissions" ADD CONSTRAINT "permissions_permission_key_unique" UNIQUE("permission_key");--> statement-breakpoint
ALTER TABLE "roles" ADD CONSTRAINT "roles_role_key_unique" UNIQUE("role_key");--> statement-breakpoint
ALTER TABLE "main_nav" ADD CONSTRAINT "main_nav_child_of_main_nav_item_id_fk" FOREIGN KEY ("child_of") REFERENCES "public"."main_nav"("item_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "main_nav" ADD CONSTRAINT "main_nav_permission_key_permissions_permission_key_fk" FOREIGN KEY ("permission_key") REFERENCES "public"."permissions"("permission_key") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "permissions_to_accounts" ADD CONSTRAINT "permissions_to_accounts_permission_key_permissions_permission_key_fk" FOREIGN KEY ("permission_key") REFERENCES "public"."permissions"("permission_key") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "permissions_to_roles" ADD CONSTRAINT "permissions_to_roles_permission_key_permissions_permission_key_fk" FOREIGN KEY ("permission_key") REFERENCES "public"."permissions"("permission_key") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "permissions_to_roles" ADD CONSTRAINT "permissions_to_roles_role_key_roles_role_key_fk" FOREIGN KEY ("role_key") REFERENCES "public"."roles"("role_key") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "roles_to_accounts" ADD CONSTRAINT "roles_to_accounts_role_key_roles_role_key_fk" FOREIGN KEY ("role_key") REFERENCES "public"."roles"("role_key") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
