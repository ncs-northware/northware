"use client";

import { deleteRole } from "@/lib/role-actions";
import { AlertDescription } from "@northware/ui/components/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@northware/ui/components/alert-dialog";
import { Button } from "@northware/ui/components/button";
import { toast } from "@northware/ui/components/sonner";
import { TrashIcon } from "@northware/ui/icons/lucide";
import { useState } from "react";
export function RoleDeleteButton({ recordId }: { recordId: number }) {
  const [error, setError] = useState<string | null>(null);
  async function submitRoleDeletion() {
    try {
      await deleteRole(recordId);
      toast.success("Die Rolle wurde gelöscht.");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Es ist ein unbekannter Fehler aufgetreten.");
      }
    }
  }
  if (error) {
    toast.error(error);
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghostDanger" size="icon">
          <TrashIcon className="size-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Rolle löschen</AlertDialogTitle>
          <AlertDescription>
            <span>
              Soll die Rolle wirklich gelöscht werden? Alle Benutzer mit dieser
              Rolle verlieren die Berechtigungen, die dieser Rolle zugewiesen
              sind.
            </span>
            <br />
            <span className="text-danger">
              Diese Aktion kann nicht rückgängig gemacht werden.
            </span>
          </AlertDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Abbrechen</AlertDialogCancel>
          <AlertDialogAction
            variant="danger"
            onClick={() => submitRoleDeletion()}
          >
            Rolle löschen
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
