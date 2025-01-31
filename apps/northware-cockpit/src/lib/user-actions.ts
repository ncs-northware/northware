'use server';

import { clerkClient } from '@northware/auth/server';
import { z } from 'zod';

const FormSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email(),
  username: z.string(),
  password: z.string(),
});

export async function createUser(formData: FormData) {
  const validatedFields = FormSchema.safeParse({
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    username: formData.get('username'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields',
    };
  }

  const { firstName, lastName, email, username, password } =
    validatedFields.data;

  try {
    const client = await clerkClient();
    const response = await client.users.createUser({
      firstName: firstName,
      lastName: lastName,
      emailAddress: [email],
      username: username,
      password: password,
    });

    console.info(response);
  } catch (error) {
    console.info(error);
  }
}

export async function getUsers() {
  try {
    const client = await clerkClient();
    const response = await client.users.getUserList();
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteUser(id: string) {
  try {
    const client = await clerkClient();
    const response = await client.users.deleteUser(id);

    console.info(response);
  } catch (error) {
    console.error(error);
  }
}
