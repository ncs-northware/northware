"use client";

import { useFormStatus } from "react-dom";
import { useActionState } from "react-dom";

export function LoginForm({ action }) {
  const { pending } = useFormStatus();
  return (
    <form action={action}>
      <div className="mb-6">
        <label htmlFor="email" className="label">
          E-Mail-Adresse
        </label>
        <input
          id="email"
          className="input"
          name="email"
          type="email"
          placeholder="kunde@northware.de"
          autoComplete="email"
          required
        />
      </div>
      <div className="mb-6">
        <label htmlFor="password" className="label">
          Passwort
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="input"
          placeholder="Passwort"
        />
      </div>
      <button
        type={pending ? "button" : "submit"}
        aria-disabled={pending}
        className="btn btn-primary w-full"
      >
        {pending && (
          <svg
            className="animate-spin ml-2 h-4 w-4 text-onPrimary"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        )}
        <span aria-live="polite" className="sr-only" role="status">
          {pending ? "Loading" : "Login"}
        </span>
      </button>
    </form>
  );
}
