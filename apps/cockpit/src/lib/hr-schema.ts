import z from "zod";

export const employeePersonalFormSchema = z.object({
  employeeId: z.number(),
  sirName: z
    .string()
    .min(1, { error: "Der Nachname ist ein Pflichtfeld" })
    .max(75, { error: "Der Nachname darf maximal 75 Zeichen lang sein." }),
  firstName: z
    .string()
    .min(1, { error: "Der Vorname ist ein Pflichtfeld" })
    .max(75, { error: "Der Vorname darf maximal 75 Zeichen lang sein." }),
  sex: z.string().min(1, { error: "Bitte wähle ein Geschlecht." }),
  birthday: z.date().nullable(),
  street: z
    .string()
    .max(100, { error: "Die Straße darf maximal 100 Zeichen lang sein." })
    .nullable(),
  zipcode: z.string().nullable(),
  city: z.string().nullable(),
  meritalStatus: z
    .string()
    .min(1, { error: "Bitte wähle einen Familienstand." }),
  religion: z
    .string()
    .min(1, { error: "Bitte wähle eine Religionszugehörigkeit." }),
  taxClass: z.string().min(1, { error: "Bitte wähle eine Steuerklasse." }),
  taxKids: z.number(),
  mailWork: z
    .email({ error: "Dies ist keine gültige E-Mail-Adresse" })
    .min(1, { error: "Die E-Mail-Adresse ist ein Pflichtfeld." })
    .max(200, {
      error: "Die E-Mail-Adresse darf maximal 200 Zeichen lang sein.",
    }),
  phoneWork: z
    .string()
    .regex(/^0[1-9]\d{3,4} [1-9]\d{0,8}(-\d{1,4})?$/, {
      error:
        "Bitte geben Sie eine gültige Telefonnummer ein (Muster 06421 123456 oder 06421 123456-789)",
    })
    .min(1, { error: "Die Telefonnummer ist ein Pflichtfeld." })
    .max(50, { error: "Die Telefonnummer darf maximal 50 Zeichen lang sein." }),
});

export type TEmployeePersonalFormSchema = z.infer<
  typeof employeePersonalFormSchema
>;

export const updateEmploymentFormSchema = z.object({
  position: z.string(),
  department: z.number().nullable(),
  employer: z.number().nullable(),
  contractStart: z.date(),
  contractEnd: z.date().nullable(),
  paygrade: z.string(),
  educationStage: z.number(),
  experienceLevel: z.string(),
});

export type TUpdateEmploymentFormSchema = z.infer<
  typeof updateEmploymentFormSchema
>;
