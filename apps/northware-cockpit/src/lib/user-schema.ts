import { z } from 'zod';

export const formSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  emailAddress: z
    .string()
    .email('Bitte geben Sie eine gültige E-Mail Adresse an.'),
  username: z.string(),
  password: z.string(),
});

export type FormData = z.infer<typeof formSchema>;
