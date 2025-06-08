import { NeonDbError } from "@neondatabase/serverless";

export function handleNeonError(error: unknown) {
  if (error instanceof NeonDbError) {
    switch (error.code) {
      case "23503":
        throw new Error(
          `Eine Fremdschlüssel-Bedingung in der Tabelle ${error.table} wird nicht erfüllt.`
        );
      case "23505":
        throw new Error(
          `Ein Eintrag mit diesen Daten ist bereits vorhanden. (${error.detail})`
        );

      default:
        throw new Error(
          `Es ist ein Fehler in der Datenbank aufgetreten: ${error.message} Der Fehlercode lautet ${error.code}`
        );
    }
  }
}
