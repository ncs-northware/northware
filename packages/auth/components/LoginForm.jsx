"use client";

export function LoginForm({ action }) {
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
      <button type="submit" className="btn btn-primary w-full transition-all">
        <span aria-live="polite" className="sr-only" role="status">
          Login
        </span>
      </button>
    </form>
  );
}
