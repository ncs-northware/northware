'use client';

import { SignIn } from '@clerk/nextjs';

const LoginPage = () => {
  return (
    <div className="flex w-full flex-1 items-center justify-center">
      <SignIn />
    </div>
  );
};

export default LoginPage;
