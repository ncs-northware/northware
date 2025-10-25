import { db } from "@northware/database/connection";
import { employeesPersonalTable } from "@northware/database/schema/hr-employees";
import { eq } from "drizzle-orm";

type BasicEmployee = {
  employeeId: number;
  sirName: string;
  firstName: string;
};

export async function getBasicEmployee(
  id: number
): Promise<
  { success: true; employee: BasicEmployee } | { success: false; error: Error }
> {
  try {
    const result = await db
      .select({
        employeeId: employeesPersonalTable.employeeId,
        firstName: employeesPersonalTable.firstName,
        sirName: employeesPersonalTable.sirName,
      })
      .from(employeesPersonalTable)
      .where(eq(employeesPersonalTable.employeeId, id));

    return {
      success: true,
      employee: result[0],
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error
          : new Error("Es ist ein unerwarteter Fehler aufgetreten."),
    };
  }
}

export type EmployeePersonal = {
  employeeId: number;
  sirName: string;
  firstName: string;
  sex: string;
  birthday: Date | null;
  street: string | null;
  zipcode: number | null;
  city: string | null;
  meritalStatus: string;
  religion: string;
  taxClass: string;
  taxKids: number;
};

export async function getEmployeePersonal(
  id: number
): Promise<
  | { success: true; employee: EmployeePersonal }
  | { success: false; error: Error }
> {
  try {
    const result = await db
      .select()
      .from(employeesPersonalTable)
      .where(eq(employeesPersonalTable.employeeId, id));

    return {
      success: true,
      employee: result[0],
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error
          : new Error("Es ist ein unerwarteter Fehler aufgetreten."),
    };
  }
}
