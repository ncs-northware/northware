import {
  LoginForm,
  LoginWrapper,
  MessageLoggedIn,
} from '@northware/ui/components';

import { auth, signIn } from '@northware/auth/auth';

export default async function LoginPage() {
  async function handleSubmit(values: { email: string; password: string }) {
    'use server';
    await signIn('credentials', {
      redirectTo: '/',
      email: values.email,
      password: values.password,
    });
  }

  const session = await auth();
  return (
    <LoginWrapper>
      {session?.user ? (
        <MessageLoggedIn user={session?.user} />
      ) : (
        <LoginForm onSubmit={handleSubmit} />
      )}
    </LoginWrapper>
  );
}
