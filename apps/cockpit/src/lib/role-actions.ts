"use server";

import { db } from "@northware/database/connection";
import { handleNeonError } from "@northware/database/neon-error-handling";
import { rolesTable } from "@northware/database/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function deleteRole(recordId: number) {
  try {
    await db.delete(rolesTable).where(eq(rolesTable.recordId, recordId));
    revalidatePath("/admin/role");
  } catch (error) {
    handleNeonError(error);
  }
}
