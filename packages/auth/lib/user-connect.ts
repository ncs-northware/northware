import { db } from "@northware/database/connection";
import { SelectUser, userTable } from "@northware/database/schema";
import { eq } from "drizzle-orm";

export async function getUser(
  email: SelectUser["email"],
): Promise<
  Array<{ id: number; name: string | null; email: string; password: string }>
> {
  return await db.select().from(userTable).where(eq(userTable.email, email));
}
