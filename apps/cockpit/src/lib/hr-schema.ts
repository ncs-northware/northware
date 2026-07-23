import z from "zod";

export const employeePersonalFormSchema = z.object({
  birthday: z.date().nullable(),
  city: z.string().nullable(),
  employeeId: z.number(),
  firstName: z
    .string()
    .min(1, { error: "Der Vorname ist ein Pflichtfeld" })
    .max(75, { error: "Der Vorname darf maximal 75 Zeichen lang sein." }),
  mailWork: z
    .email({ error: "Dies ist keine gültige E-Mail-Adresse" })
    .min(1, { error: "Die E-Mail-Adresse ist ein Pflichtfeld." })
    .max(200, {
      error: "Die E-Mail-Adresse darf maximal 200 Zeichen lang sein.",
    }),
  meritalStatus: z
    .string()
    .min(1, { error: "Bitte wähle einen Familienstand." }),
  phoneWork: z
    .string()
    .regex(/^0[1-9]\d{2,4} [1-9]\d{0,8}(-\d{1,4})?$/, {
      error:
        "Bitte geben Sie eine gültige Telefonnummer ein (Muster 06421 123456 oder 06421 123456-789)",
    })
    .min(1, { error: "Die Telefonnummer ist ein Pflichtfeld." })
    .max(50, { error: "Die Telefonnummer darf maximal 50 Zeichen lang sein." }),
  religion: z
    .string()
    .min(1, { error: "Bitte wähle eine Religionszugehörigkeit." }),
  sex: z.string().min(1, { error: "Bitte wähle ein Geschlecht." }),
  sirName: z
    .string()
    .min(1, { error: "Der Nachname ist ein Pflichtfeld" })
    .max(75, { error: "Der Nachname darf maximal 75 Zeichen lang sein." }),
  street: z
    .string()
    .max(100, { error: "Die Straße darf maximal 100 Zeichen lang sein." })
    .nullable(),
  taxClass: z.string().min(1, { error: "Bitte wähle eine Steuerklasse." }),
  taxKids: z.number(),
  zipcode: z.string().nullable(),
});

export type TEmployeePersonalFormSchema = z.infer<
  typeof employeePersonalFormSchema
>;

export const updateEmploymentFormSchema = z.object({
  contractEnd: z.date().nullable(),
  contractStart: z.date({ error: "Der Vertragsbeginn ist ein Pflichtfeld." }),
  department: z
    .string()
    .min(1, { error: "Bitte wählen Sie eine Abteilung." })
    .nullable(),
  educationStage: z
    .string()
    .min(1, { error: "Bitte wählen Sie eine Vorbildungsstufe." }),
  employer: z
    .string()
    .min(1, { error: "Bitte wählen Sie einen Arbeitgeber." })
    .nullable(),
  experienceLevel: z
    .string()
    .min(1, { error: "Bitte wählen Sie eine Erfahrungsstufe." }),
  paygrade: z.string().min(1, { error: "Bitte wählen Sie eine Tarifgruppe." }),
  position: z
    .string()
    .min(1, { error: "Die Position ist ein Pflichtfeld." })
    .max(100, { error: "Die Position darf maximal 100 Zeichen lang sein." }),
});

export type TUpdateEmploymentFormSchema = z.infer<
  typeof updateEmploymentFormSchema
>;
