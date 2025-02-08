'use client';
import { type FormData, formSchema } from '@/lib/user-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';

export default function CreateUserForm({
  createUser,
}: { createUser: SubmitHandler<FormData> }) {
  const [errors, setErrors] = useState<string[]>([]);
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      emailAddress: '',
      username: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setErrors([]); // Fehler zurücksetzen
    try {
      await createUser(data);
    } catch (err) {
      if (err instanceof Error) {
        // Parse die Fehlermeldungen aus dem Error-Objekt
        const errorMessages = JSON.parse(err.message) as string[];
        setErrors(errorMessages); // Setze die Fehlermeldungen im Zustand
      } else {
        setErrors(['Es ist ein unbekannter Fehler aufgetreten.']);
      }
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <label htmlFor="firstName">Vorname</label>
      <input
        {...form.register('firstName')}
        type="text"
        id="firstName"
        name="firstName"
      />
      <p>{form.formState.errors.firstName?.message}</p>

      <label htmlFor="lastName">Nachname</label>
      <input
        {...form.register('lastName')}
        type="text"
        id="lastName"
        name="lastName"
      />
      <p>{form.formState.errors.lastName?.message}</p>

      <label htmlFor="emailAddress">E-Mail</label>
      <input
        {...form.register('emailAddress')}
        type="email"
        id="emailAddress"
        name="emailAddress"
      />
      <p>{form.formState.errors.emailAddress?.message}</p>

      <label htmlFor="username">Benutzername</label>
      <input
        {...form.register('username')}
        type="text"
        id="username"
        name="username"
      />
      <p>{form.formState.errors.username?.message}</p>

      <label htmlFor="password">Password</label>
      <input
        {...form.register('password')}
        type="password"
        id="password"
        name="password"
      />
      <p>{form.formState.errors.password?.message}</p>

      <p>
        <ul>
          {errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      </p>

      <button type="submit">Benutzer hinzufügen</button>
    </form>
  );
}
