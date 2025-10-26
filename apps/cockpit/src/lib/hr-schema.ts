import z from "zod";

export const employeePersonalFormSchema = z.object({
  employeeId: z.number(),
  sirName: z.string().max(75),
  firstName: z.string().max(75),
  sex: z.string(),
  birthday: z.date().nullable(),
  street: z.string().max(100).nullable(),
  zipcode: z.string().nullable(),
  city: z.string().nullable(),
  meritalStatus: z.string(),
  religion: z.string(),
  taxClass: z.string(),
  taxKids: z.number(),
});

export type TEmployeePersonalFormSchema = z.infer<
  typeof employeePersonalFormSchema
>;
