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
});

export type TEmployeePersonalFormSchema = z.infer<
  typeof employeePersonalFormSchema
>;
