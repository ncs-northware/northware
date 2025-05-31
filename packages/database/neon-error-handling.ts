import { NeonDbError } from "@neondatabase/serverless";

export function handleNeonError(error: unknown) {
  if (error instanceof NeonDbError) {
    switch (error.code) {
      case "23503":
        throw new Error(
          `Eine Fremdschlüssel-Bedingung in der Tabelle ${error.table} wird nicht erfüllt.`
        );
      default:
        throw new Error(
          `Es ist ein Fehler in der Datenbank aufgetreten: ${error.message} Der Fehlercode lautet ${error.code}`
        );
    }
  }
}
