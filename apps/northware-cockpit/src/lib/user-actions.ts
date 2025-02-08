'use server';

import type { FormData } from '@/lib/user-schema';
import { clerkClient } from '@northware/auth/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

interface ClerkError {
  errors: Array<{
    code: string;
    message: string;
  }>;
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

export async function createUser(formData: FormData) {
  const { firstName, lastName, username, emailAddress, password } = formData;
  // console.log(firstName, lastName, username, emailAddress, password);
  try {
    const client = await clerkClient();
    await client.users.createUser({
      firstName: firstName,
      lastName: lastName,
      username: username,
      emailAddress: [emailAddress],
      password: password,
    });
    revalidatePath('/admin');
    redirect('/admin');
  } catch (error) {
    const errorMessages: string[] = [];
    const typesafeError = error as ClerkError;
    if (typesafeError.errors) {
      typesafeError.errors.map((error) => {
        switch (error.code) {
          case 'form_password_length_too_short':
            errorMessages.push('Das Passwort ist zu kurz');
            break;
          default:
            errorMessages.push(
              error.message || 'Es ist ein unbekannter Fehler aufgetreten'
            );
        }
      });
    } else {
      errorMessages.push('Es ist ein unbekannter Fehler aufgetreten.');
    }
    throw new Error(JSON.stringify(errorMessages));
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
