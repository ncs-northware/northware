# @northware/database

Innerhalb von `@northware/database` wird die Verbindung zu den Neon Databases hergestellt. Außerdem sind hier die Drizzle Schema-Dateien der Datenbank gespeichert.

## Verbindung zur Datenbank herstellen

Das Package exportiert die Variablen `client` und `db` unter der Adresse `@northware/database/connect` womit die Verbindung zur Datenbank hergestellt werden kann.

## Drizzle Administration

Innerhalb des Packages werden auch allen Dateien gespeichert, die mit [Drizzle](https://orm.drizzle.team/) das Schema der Datenbank definieren.

Alle Schema-Definitionen werden in dem Ordner `/schema` gespeichert. Das gesamte Database-Schema wird auf mehrere Dateien verteilt, um eine möglichst hohe Übersichtlichkeit zu erreichen. Damit wird [diesem Ansatz](https://orm.drizzle.team/docs/sql-schema-declaration#schema-in-multiple-files) gefolgt.

Das Schma soll folgendermaßen aufgeteilt werden:

- Jede größere Datenbanktabelle erhält eine eigene Schema-Datei
- Schema-Dateien können Schemata für mehrere Tabellen enthalten, wenn sie gemeinsam für ein Feature benötigt werden (Das Schema der Haupttabelle wird in der gleichen Datei definiert wie kleinere Tabellen, die Relationen zur Haupttabelle haben).

Das Drizzle Kit wird verwendet, um das Datenbank-Schema der [Neon Database](https://neon.tech/docs/) mit den Schema-Definitionen in der Codebase abzustimmen.

Der Workflow mit Drizzle Kit und die Verbindung zur Datenbank in diesem Workflow wird in der `drizzle.config.ts` konfiguriert. Hier ist definiert, dass alle Schema-Dateien im `./schema` Ordner abgelegt sind. Außerdem ist hier definiert, dass die von Drizzle generierten Migrations-Dateien im Ordner `./drizzle-migrations` abgelegt werden sollen. Da diese Dateien nur temporär benötigt werden, wird der Ordner `drizzle-migrations` von Git ignoriert.

Die `drizzle.config.ts` greift auf die Environment-Variable `NW_API` zu. Diese Variable muss innerhalb einer `./.env.local` im `@northware/database` Package definiert werden und die Verbindungs-URL zur Datenbank enthalten.

### Drizzle Kit

Die Drizzle Migrationen werden mit der Console durchgeführt und können nicht innerhalb einer App umgesetzt werden. Die Commands müssen daher im Ordner `[project base path]/packages/database` ausgeführt werden.

Es gibt unterschiedliche `drizzle-kit` Commands zur Kommunikation zwischen Codebase und Database

- **[`drizzle-kit generate`](https://orm.drizzle.team/docs/drizzle-kit-generate):** Generiert eine `.sql` Datei, die das Datenbank-Schema als SQL-Code enthält.
- **[`drizzle-kit migrate`](https://orm.drizzle.team/docs/drizzle-kit-migrate):** Migriert das SQL-Schema, das mit `drizzle-kit generate` erstellt wurde in die Datenbank.
- **[`drizzle-kit pull`](https://orm.drizzle.team/docs/drizzle-kit-pull):** Lädt das aktuelle Schema der Datenbank als `schema.ts` Datei in den `drizzle-migrations` Ordner. So kann sichergestellt werden, dass Datenbank und Codebase das selbe Schema enthalten. Dadurch, dass das Schema automatisch erstellt wird, wird das Schema ggf. nochmal verbessert definiert. Die `schema.ts` enthält alle Tabellen und sollte in eine Javascript-Datei umgewandelt werden, bevor sie in den `/schema` Ordner aufgenommen wird. Mit einigen [Konfigurationen](https://orm.drizzle.team/docs/drizzle-kit-pull#including-tables-schemas-and-extensions) kann beeinflusst werden, welcher Output mit `drizzle-kit pull` erstellt wird.
- **[`drizzle-kit push`](https://orm.drizzle.team/docs/drizzle-kit-push):** Kombiniert `drizzle-kit generate` und `drizzle-kit migrate` ohne SQL-Dateien zu generieren. Dieser Command kann verwendet werden, wenn ein Schema Update mal schnell gehen muss.
- **[`drizzle-kit studio`](https://orm.drizzle.team/docs/drizzle-kit-studio):** Startet [Drizzle Studio](https://orm.drizzle.team/drizzle-studio/overview) lokal unter [local.drizzle.studio](http://local.drizzle.studio). Drizzle Studio ist der Database Browser von Drizzle.
  - [Die Neon Console verwendet standardmäßig Drizzle Studio.](https://neon.tech/docs/changelog/2024-05-24#drizzle-studio-in-the-neon-console)
  - [In Brave wird Drizzle Studio nicht out-of-the-box unterstützt](https://orm.drizzle.team/docs/drizzle-kit-studio#safari-and-brave-support).
- **[`drizzle-kit check`](https://orm.drizzle.team/docs/drizzle-kit-check):** Überprüft die Konsistenz (Einheitlichkeit) der generierten SQL Migrationen
- **[`drizzle-kit up`](https://orm.drizzle.team/docs/drizzle-kit-up):** Upgrade des Drizzle Schema, wenn es eine neue Version von Drizzle gibt
