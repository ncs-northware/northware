"use server";

import { db } from "@northware/database/connection";
import { handleNeonError } from "@northware/database/neon-error-handling";
import { companiesTable } from "@northware/database/schema/companies";
import { departmentsTable } from "@northware/database/schema/departments";
import {
  employeesTable,
  employmentsTable,
} from "@northware/database/schema/hr-employees";
import { and, desc, eq, gte, isNull, lte, or } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import type {
  TEmployeePersonalFormSchema,
  TUpdateEmploymentFormSchema,
} from "@/lib/hr-schema";

/**** Liste persönlicher Mitarbeiterdaten *****************************************/

export interface EmployeeItem {
  activeContracts: number;
  employeeId: number | null;
  firstName: string | null;
  sirName: string | null;
  terminatedContracts: number;
}

export async function getEmployeeList(): Promise<
  | { success: true; employees: EmployeeItem[] }
  | { success: false; error: Error }
> {
  try {
    const result = await db
      .select({
        activeContracts: db.$count(
          employmentsTable,
          and(
            eq(employmentsTable.employeeId, employeesTable.employeeId),
            or(
              gte(employmentsTable.contractEnd, new Date()),
              isNull(employmentsTable.contractEnd)
            )
          )
        ),
        employeeId: employeesTable.employeeId,
        firstName: employeesTable.firstName,
        sirName: employeesTable.sirName,
        terminatedContracts: db.$count(
          employmentsTable,
          and(
            eq(employmentsTable.employeeId, employeesTable.employeeId),
            lte(employmentsTable.contractEnd, new Date())
          )
        ),
      })
      .from(employeesTable)
      .orderBy(employeesTable.sirName, employeesTable.firstName);

    return {
      employees: result,
      success: true,
    };
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error
          : new Error("Es ist ein unerwarteter Fehler aufgetreten."),
      success: false,
    };
  }
}

/**** Liste von Arbeitsverhältnissen zu einem einzelnen Mitarbeiter *************************/

export interface EmploymentListItem {
  contractEnd: Date | null;
  contractStart: Date;
  departmentName: string | null;
  employer: string | null;
  position: string;
  recordId: number;
}

export async function getEmploymentsList(
  id: number
): Promise<
  | { success: true; employments: EmploymentListItem[] }
  | { success: false; error: Error }
> {
  try {
    const result = await db
      .select({
        contractEnd: employmentsTable.contractEnd,
        contractStart: employmentsTable.contractStart,
        departmentName: departmentsTable.departmentName,
        employer: companiesTable.companyName,
        position: employmentsTable.position,
        recordId: employmentsTable.recordId,
      })
      .from(employmentsTable)
      .leftJoin(
        departmentsTable,
        eq(employmentsTable.department, departmentsTable.recordId)
      )
      .leftJoin(
        companiesTable,
        eq(employmentsTable.employer, companiesTable.companyId)
      )
      .where(eq(employmentsTable.employeeId, id))
      .orderBy(
        employmentsTable.contractStart,
        desc(employmentsTable.contractEnd)
      );

    return {
      employments: result,
      success: true,
    };
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error
          : new Error("Es ist ein unerwarteter Fehler aufgetreten."),
      success: false,
    };
  }
}

/**** Einzelne persönliche Mitarbeiterdaten **********************************************/

interface BasicEmployee {
  employeeId: number;
  firstName: string;
  sirName: string;
}

export async function getBasicEmployee(
  id: number
): Promise<
  { success: true; employee: BasicEmployee } | { success: false; error: Error }
> {
  try {
    const result = await db
      .select({
        employeeId: employeesTable.employeeId,
        firstName: employeesTable.firstName,
        sirName: employeesTable.sirName,
      })
      .from(employeesTable)
      .where(eq(employeesTable.employeeId, id));

    return {
      employee: result[0],
      success: true,
    };
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error
          : new Error("Es ist ein unerwarteter Fehler aufgetreten."),
      success: false,
    };
  }
}

export interface EmployeePersonal {
  birthday: Date | null;
  city: string | null;
  employeeId: number;
  firstName: string;
  mailWork: string;
  meritalStatus: string;
  phoneWork: string;
  religion: string;
  sex: string;
  sirName: string;
  street: string | null;
  taxClass: string;
  taxKids: number;
  zipcode: string | null;
}

export async function getEmployeePersonal(
  id: number
): Promise<
  | { success: true; employee: EmployeePersonal }
  | { success: false; error: Error }
> {
  try {
    const result = await db
      .select()
      .from(employeesTable)
      .where(eq(employeesTable.employeeId, id));

    return {
      employee: result[0],
      success: true,
    };
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error
          : new Error("Es ist ein unerwarteter Fehler aufgetreten."),
      success: false,
    };
  }
}

export async function updateEmployeePersonal(
  formData: TEmployeePersonalFormSchema
) {
  try {
    await db
      .update(employeesTable)
      .set({
        birthday: formData.birthday,
        city: formData.city,
        firstName: formData.firstName,
        mailWork: formData.mailWork,
        meritalStatus: formData.meritalStatus,
        phoneWork: formData.phoneWork,
        religion: formData.religion,
        sex: formData.sex,
        sirName: formData.sirName,
        street: formData.street,
        taxClass: formData.taxClass,
        taxKids: formData.taxKids,
        zipcode: formData.zipcode,
      })
      .where(eq(employeesTable.employeeId, formData.employeeId));
    revalidatePath("hr/management");
  } catch (error) {
    handleNeonError(error);
  }
}

/*** Einzelne Arbeitsverhältnisse ***********************************************************/

export interface EmploymentItem {
  contractEnd: Date | null;
  contractStart: Date;
  department: string | null;
  departmentId: number | null;
  educationStage: number;
  employeeId: number;
  employer: string | null;
  employerId: number | null;
  experienceLevel: string;
  paygrade: string;
  position: string;
}

export async function getEmployment(
  id: number
): Promise<
  | { success: true; employment: EmploymentItem }
  | { success: false; error: Error }
> {
  try {
    const result = await db
      .select({
        contractEnd: employmentsTable.contractEnd,
        contractStart: employmentsTable.contractStart,
        department: departmentsTable.departmentName,
        departmentId: departmentsTable.recordId,
        educationStage: employmentsTable.educationStage,
        employeeId: employmentsTable.employeeId,
        employer: companiesTable.companyName,
        employerId: companiesTable.companyId,
        experienceLevel: employmentsTable.experienceLevel,
        paygrade: employmentsTable.paygrade,
        position: employmentsTable.position,
      })
      .from(employmentsTable)
      .leftJoin(
        departmentsTable,
        eq(employmentsTable.department, departmentsTable.recordId)
      )
      .leftJoin(
        companiesTable,
        eq(employmentsTable.employer, companiesTable.companyId)
      )
      .where(eq(employmentsTable.recordId, id));
    return {
      employment: result[0],
      success: true,
    };
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error
          : new Error("Es ist ein unerwarteter Fehler aufgetreten."),
      success: false,
    };
  }
}

export interface BasicDepartment {
  departmentName: string;
  recordId: number;
}

export interface BasicCompany {
  companyId: number;
  companyName: string;
}

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
        departmentName: departmentsTable.departmentName,
        recordId: departmentsTable.recordId,
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
      companies: companyResult,
      departments: departmentResult,
      success: true,
    };
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error
          : new Error("Es ist ein unerwarteter Fehler aufgetreten."),
      success: false,
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
      .update(employmentsTable)
      .set({
        contractEnd: formData.contractEnd,
        contractStart: formData.contractStart,
        department: Number(formData.department),
        educationStage: Number(formData.educationStage),
        employeeId: employee,
        employer: Number(formData.employer),
        experienceLevel: formData.experienceLevel,
        paygrade: formData.paygrade,
        position: formData.position,
      })
      .where(eq(employmentsTable.recordId, recordId));
    revalidatePath("hr/management");
  } catch (error) {
    handleNeonError(error);
  }
}
