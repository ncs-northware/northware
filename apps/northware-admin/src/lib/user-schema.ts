import { z } from "zod";

export const createUserFormSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  emailAddress: z
    .string()
    .email("Bitte geben Sie eine gültige E-Mail Adresse an."),
  username: z
    .string()
    .min(4, {
      message: "Der Benutzername muss mindestens 4 Zeichen lang sein.",
    })
    .max(64, {
      message: "Der Benutzername darf maximal 64 Zeichen lang sein.",
    }),
  password: z
    .string()
    .min(8, { message: "Das Passwort muss mindestens 8 Zeichen lang sein." })
    .max(72, { message: "Das Passwort darf maximal 72 Zeichen lang sein." }),
});
export type TCreateUserFormSchema = z.infer<typeof createUserFormSchema>;

export const updateUserFromSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  username: z
    .string()
    .min(4, {
      message: "Der Benutzername muss mindestens 4 Zeichen lang sein.",
    })
    .max(64, {
      message: "Der Benutzername darf maximal 64 Zeichen lang sein.",
    }),
});
export type TUpdateUserFormSchema = z.infer<typeof updateUserFromSchema>;

export const createEMailAddressFormSchema = z.object({
  emailAddress: z.string(),
  verified: z.boolean().default(true).optional(),
  primary: z.boolean().default(false).optional(),
});
export type TCreateEMailAddressFormSchema = z.infer<
  typeof createEMailAddressFormSchema
>;

export const changePasswordFormSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, { message: "Das Passwort muss mindestens 8 Zeichen lang sein." })
      .max(72, { message: "Das Passwort darf maximal 72 Zeichen lang sein." }),
    confirmPassword: z.string(),
    signOutSessions: z.boolean(),
    skipChecks: z.boolean(),
  })
  .superRefine(({ newPassword, confirmPassword }, ctx) => {
    if (confirmPassword !== newPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        code: "custom",
        message: "Die Passwörter stimmen nicht überein",
      });
    }
  });
export type TChangePasswordFormSchema = z.infer<
  typeof changePasswordFormSchema
>;
