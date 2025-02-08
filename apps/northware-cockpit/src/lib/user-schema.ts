import { z } from 'zod';

export const createUserFormSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  emailAddress: z
    .string()
    .email('Bitte geben Sie eine gültige E-Mail Adresse an.'),
  username: z
    .string()
    .min(4, {
      message: 'Der Benutzername muss mindestens 4 Zeichen lang sein.',
    })
    .max(64, {
      message: 'Der Benutzername darf maximal 64 Zeichen lang sein.',
    }),
  password: z
    .string()
    .min(8, { message: 'Das Passwort muss mindestens 8 Zeichen lang sein.' })
    .max(72, { message: 'Das Passwort darf maximal 72 Zeichen lang sein.' }),
});

export type TCreateUserFormSchema = z.infer<typeof createUserFormSchema>;
