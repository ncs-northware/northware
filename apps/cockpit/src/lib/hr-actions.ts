"use server";

import { db } from "@northware/database/connection";
import { handleNeonError } from "@northware/database/neon-error-handling";
import { companiesTable } from "@northware/database/schema/companies";
import { departmentsTable } from "@northware/database/schema/departments";
import {
  employeesPersonalTable,
  employeesWorkerTable,
} from "@northware/database/schema/hr-employees";
import { and, desc, eq, gte, isNull, lte, or } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import type {
  TEmployeePersonalFormSchema,
  TUpdateEmploymentFormSchema,
} from "@/lib/hr-schema";

/**** Liste persönlicher Mitarbeiterdaten *****************************************/

export type EmployeeItem = {
  employeeId: number | null;
  firstName: string | null;
  sirName: string | null;
  activeContracts: number;
  terminatedContracts: number;
};

export async function getEmployeeList(): Promise<
  | { success: true; employees: EmployeeItem[] }
  | { success: false; error: Error }
> {
  try {
    const result = await db
      .select({
        employeeId: employeesPersonalTable.employeeId,
        firstName: employeesPersonalTable.firstName,
        sirName: employeesPersonalTable.sirName,
        activeContracts: db.$count(
          employeesWorkerTable,
          and(
            eq(
              employeesWorkerTable.employeeId,
              employeesPersonalTable.employeeId
            ),
            or(
              gte(employeesWorkerTable.contractEnd, new Date()),
              isNull(employeesWorkerTable.contractEnd)
            )
          )
        ),
        terminatedContracts: db.$count(
          employeesWorkerTable,
          and(
            eq(
              employeesWorkerTable.employeeId,
              employeesPersonalTable.employeeId
            ),
            lte(employeesWorkerTable.contractEnd, new Date())
          )
        ),
      })
      .from(employeesPersonalTable)
      .orderBy(
        employeesPersonalTable.sirName,
        employeesPersonalTable.firstName
      );

    return {
      success: true,
      employees: result,
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

/**** Liste von Arbeitsverhältnissen zu einem einzelnen Mitarbeiter *************************/

export type EmploymentListItem = {
  recordId: number;
  position: string;
  departmentName: string | null;
  employer: string | null;
  contractStart: Date;
  contractEnd: Date | null;
};

export async function getEmploymentsList(
  id: number
): Promise<
  | { success: true; employments: EmploymentListItem[] }
  | { success: false; error: Error }
> {
  try {
    const result = await db
      .select({
        recordId: employeesWorkerTable.recordId,
        position: employeesWorkerTable.position,
        departmentName: departmentsTable.departmentName,
        employer: companiesTable.companyName,
        contractStart: employeesWorkerTable.contractStart,
        contractEnd: employeesWorkerTable.contractEnd,
      })
      .from(employeesWorkerTable)
      .leftJoin(
        departmentsTable,
        eq(employeesWorkerTable.department, departmentsTable.recordId)
      )
      .leftJoin(
        companiesTable,
        eq(employeesWorkerTable.employer, companiesTable.companyId)
      )
      .where(eq(employeesWorkerTable.employeeId, id))
      .orderBy(
        employeesWorkerTable.contractStart,
        desc(employeesWorkerTable.contractEnd)
      );

    return {
      success: true,
      employments: result,
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

/**** Einzelne persönliche Mitarbeiterdaten **********************************************/

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
  zipcode: string | null;
  city: string | null;
  meritalStatus: string;
  religion: string;
  taxClass: string;
  taxKids: number;
  mailWork: string;
  phoneWork: string;
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

export async function updateEmployeePersonal(
  formData: TEmployeePersonalFormSchema
) {
  try {
    await db
      .update(employeesPersonalTable)
      .set({
        sirName: formData.sirName,
        firstName: formData.firstName,
        sex: formData.sex,
        birthday: formData.birthday,
        street: formData.street,
        zipcode: formData.zipcode,
        city: formData.city,
        meritalStatus: formData.meritalStatus,
        religion: formData.religion,
        taxClass: formData.taxClass,
        taxKids: formData.taxKids,
        phoneWork: formData.phoneWork,
        mailWork: formData.mailWork,
      })
      .where(eq(employeesPersonalTable.employeeId, formData.employeeId));
    revalidatePath("hr/management");
  } catch (error) {
    handleNeonError(error);
  }
}

/*** Einzelne Arbeitsverhältnisse ***********************************************************/

export type EmploymentItem = {
  employeeId: number;
  position: string;
  departmentId: number | null;
  department: string | null;
  employerId: number | null;
  employer: string | null;
  contractStart: Date;
  contractEnd: Date | null;
  paygrade: string;
  educationStage: number;
  experienceLevel: string;
};

export async function getEmployment(
  id: number
): Promise<
  | { success: true; employment: EmploymentItem }
  | { success: false; error: Error }
> {
  try {
    const result = await db
      .select({
        employeeId: employeesWorkerTable.employeeId,
        position: employeesWorkerTable.position,
        departmentId: departmentsTable.recordId,
        department: departmentsTable.departmentName,
        employerId: companiesTable.companyId,
        employer: companiesTable.companyName,
        contractStart: employeesWorkerTable.contractStart,
        contractEnd: employeesWorkerTable.contractEnd,
        paygrade: employeesWorkerTable.paygrade,
        educationStage: employeesWorkerTable.educationStage,
        experienceLevel: employeesWorkerTable.experienceLevel,
      })
      .from(employeesWorkerTable)
      .leftJoin(
        departmentsTable,
        eq(employeesWorkerTable.department, departmentsTable.recordId)
      )
      .leftJoin(
        companiesTable,
        eq(employeesWorkerTable.employer, companiesTable.companyId)
      )
      .where(eq(employeesWorkerTable.recordId, id));
    return {
      success: true,
      employment: result[0],
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

export type BasicDepartment = {
  recordId: number;
  departmentName: string;
};

export type BasicCompany = {
  companyId: number;
  companyName: string;
};

export async function getEmploymentContext(): Promise<
  | {
      success: true;
      departments: BasicDepartment[];
      companies: BasicCompany[];
    }
  | { success: false; error: Error }
> {
  try {
    const departmentResult = await db
      .select({
        recordId: departmentsTable.recordId,
        departmentName: departmentsTable.departmentName,
      })
      .from(departmentsTable)
      .orderBy(departmentsTable.recordId);
    const companyResult = await db
      .select({
        companyId: companiesTable.companyId,
        companyName: companiesTable.companyName,
      })
      .from(companiesTable)
      .orderBy(companiesTable.companyId);
    return {
      success: true,
      departments: departmentResult,
      companies: companyResult,
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

export async function updateEmployment(
  formData: TUpdateEmploymentFormSchema,
  employee: number,
  recordId: number
) {
  try {
    await db
      .update(employeesWorkerTable)
      .set({
        employeeId: employee,
        position: formData.position,
        department: Number(formData.department),
        employer: Number(formData.employer),
        contractStart: formData.contractStart,
        contractEnd: formData.contractEnd,
        paygrade: formData.paygrade,
        educationStage: Number(formData.educationStage),
        experienceLevel: formData.experienceLevel,
      })
      .where(eq(employeesWorkerTable.recordId, recordId));
    revalidatePath("hr/management");
  } catch (error) {
    handleNeonError(error);
  }
}
