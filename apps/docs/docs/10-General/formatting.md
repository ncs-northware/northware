# Code Formatierung und Linting

[Biome](https://biomejs.dev/) übernimmt das Code Formatting und Linting in diesem Projekt.

Biome ist in das Root-Package des Projektes integriert und wird in der `biome.json` konfiguriert. Als Startpunkt nutzt Biome das Pre-Config Package [Ultracite](https://www.ultracite.dev/). In der `biome.json` sind ebenfalls einige Ordner und Dateien definiert, die von Biome ignoriert werden. Insbesondere sind dies automatisch und ebenfalls von Git ignorierte automatisch generierte Ordner und Dateien und Ordner, die beim Build-Prozess automatisch erstellt werden.

## CLI Commands

### Ultracite CLI

- **`pnpm ultracite lint`** führt den Biome Linter aus, ohne das Formatierungen angewendet werden. Stattdessen wird gewarnt, dass Formatierungen falsch sind. Hinter diesem Command steckt die Anweisung `npx biome check ./`.
- **`pnpm ultracite format`** führt den Biome Linter aus und wendet empfohlene Formatierungen auf die Dateien an. Hinter diesem Command steckt die Anweisung `npx biome check --write ./`.

### Biome CLI

Die [Biome CLI](https://biomejs.dev/reference/cli/) bietet viele weitere Möglichkeiten Code zu testen und zu berichtigen.

- [**`biome rage`**](https://biomejs.dev/reference/cli/#biome-rage) zeigt Informationen zum Debugging. `biome rage --formatter` zeigt die angewendeten Formatter Optionen, `biome rage --linter` zeigt die angewendeten Linter-Optionen.
- [**`biome check`**](https://biomejs.dev/reference/cli/#biome-check) führt den Biome Formatter und Linter aus und prüft die Import-Sortierung. Es werden keine Änderungen an den Dateien vorgenommen.
  - `--write` ändert die Dateien so, dass sichere Fixes, vorgeschlages Formatting und Import-Sortierungen angewendet werden. `--fix` ist ein Alias für `--write`
  - `--unsafe` wendet in Kombination mit `--write` oder `--fix` auch unsichere Fixes an. Diese könnten dazu führen, dass der Code nicht mehr funktioniert.
  - `--formatter-enabled=<true|false>` kontrolliert, ob der Formatter Check ausgeführt wird oder nicht.
  - `--linter-enabled=<true|false>` kontrolliert, ob der Lint Check ausgeführt wird oder nicht.
  - `--organize-imports-enabled=<true|false>` kontrolliert, ob Imports sortiert werden sollen, oder nicht.
  - `--assists-enabled=<true|false>` aktiviert oder deaktiviert die Assists.
  - `--changed` lintet nur die Dateien, die im Vergleich zum `defaultBranch` verändert wurden.
- [**`biome ci`**](https://biomejs.dev/reference/cli/#biome-ci) führt Formatter Linter und Import-Sortierung aus. Dieser Command funktioniert wie der Command `biome check` ist aber speziell für die Verwendung im CI-Umfeld optimiert.
  - `--formatter-enabled=<true|false>` kontrolliert, ob der Formatter Check ausgeführt wird oder nicht.
  - `--linter-enabled=<true|false>` kontrolliert, ob der Lint Check ausgeführt wird oder nicht.
  - `--organize-imports-enabled=<true|false>` kontrolliert, ob Imports sortiert werden sollen, oder nicht.
  - `--assists-enabled=<true|false>` aktiviert oder deaktiviert die Assists.
  - `--changed` lintet nur die Dateien, die im Vergleich zum `defaultBranch` verändert wurden.

### Anwendung in diesem Projekt

Im Root-Package des Projektes sind mehrere Commands definiert, um die Biome CLI.

- **`pnpm lint:root`** führt den Command `ultracite lint` in allen Teilen des Projektes aus. Es werden das Root-Verzeichnis sowie alle Unterordner incl. `apps/` und `packages/` geprüft. Eine Formatierung wird nicht vorgenommen. Da dieser Command auch als Turbo Task definiert ist, ist `pnpm turbo lint:root` gleichbedeutend.
- **`pnpm lint`** führt den Command `turbo lint` aus. Dieser Command stößt den Tubo-Task `lint` an. `pnpm turbo lint` ist gleichbedeutend.
- **`pnpm format:root`** führt den Command `ultracite format` in allen Teilen des Projektes aus. Es werden das Root-Verzeichnis sowie alle Unterordner incl. `apps/` und `packages/` geprüft. Formatierungen werden ggf. angepasst. Da dieser Command auch als Turbo Task definiert ist, ist `pnpm turbo format:root` gleichbedeutend.
- **`pnpm format`** führt den Command `turbo format` aus. Dieser Command stößt den Tubo-Task `format` an. `pnpm turbo format` ist gleichbedeutend.
- **`pnpm lint:ci`** ist ein Command speziell für den Turborepo CI Workflow und `pnpm localci`. Hier wird `biome ci ./` ausgeführt, was gleichbedeutend mit `pnpm lint` aber für den Einsatz in CI-Workflows optimiert ist.

#### Turbo Tasks

- **`pnpm turbo lint`** führt das Script `lint` in allen Apps und Packages aus, in denen ein solches Script definiert ist. In allen `package.json` sollte daher ein Script definiert sein, dass hinter dem Script `lint` den Command `ultracite lint` ausführt.
- **`pnpm turbo format`** führt das Script `format` in allen Apps und Packages aus, in denen ein solches Script definiert ist. In allen `package.json` sollte daher ein Script definiert sein, dass hinter dem Script `format` den Command `ultracite format` ausführt.

```json title="package.json"

{
    "name":"@northware/ui",
    ...
    "scripts": {
        ...
        "lint": "ultracite lint",
        "format": "ultracite format"
        ...
    },
}

```

:::warning[Warum `pnpm lint` und `pnpm format` nicht ohne `--filter` genutzt werden sollten]

Die Commands `pnpm lint:root` und `pnpm format:root` wenden den Biome Linter und Formatter auf alle Dateien des Packages an. `pnpm lint` und `pnpm format` greifen auf die selbe Config-Datei zu und führen den selben Command in den Apps und Packages des Projektes aus.

`pnpm lint` und `pnpm format` sind dafür gedacht, die Ausführung des Biome Linters und Formatters mit dem `--filter` Flag nur auf einzelne Apps und Packages anzuwenden. Sollen alle Teile des Projektes geprüft werden, sollten `pnpm lint:root` oder `pnpm format:root` ausgeführt werden.

Keinesfalls sollten `pnpm format` und `pnpm format:root` sowie `pnpm lint` und `pnpm lint:root` kombiniert werden, da dann beide Commands die selbe Arbeit erledigen.

:::
