import { createUser } from '@/lib/user-actions';
import { Button, Input, Label } from '@northware/ui/components';
export default function CreateUserForm() {
  return (
    <form action={createUser}>
      <div className="rounded-md p-4 md:p-6">
        <div className="mb-4">
          <Label htmlFor="firstName">Vorname</Label>
          <Input
            id="firstName"
            name="firstName"
            type="text"
            placeholder="Max"
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="lastName">Nachname</Label>
          <Input
            id="lastName"
            name="lastName"
            type="text"
            placeholder="Mustermann"
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="email">E-Mail-Adresse</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="mmuster@northware.de"
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="username">Nutzername</Label>
          <Input
            id="username"
            name="username"
            type="text"
            placeholder="mmuster"
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="password">Passwort</Label>
          <Input id="password" name="password" type="password" required />
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Button type="submit">Benutzer hinzufügen</Button>
      </div>
    </form>
  );
}
