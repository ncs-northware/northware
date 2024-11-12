# @northware/ui

`@northware/ui` ist die Styling und UI-Component Library für die Northware Apps.
Das Package enthält Komponenten, die das Grundstyling der Apps übernehmen und Reusable Component, die die UI gestalten.

## Nutzung in anderen Apps

### UI-Styling und Tailwind

Innerhalb von Apps, die `@northware/ui` verwenden sollen, muss Tailwind CSS (und `autoprefixer` und `postcss` ) installiert und korrekt konfiguriert sein. Mehr dazu in den [`@northware/tailwind-config` Docs](../tailwind-config).

Um das Stylesheet von `@northware/ui` zu verwenden, muss es in der `layout.jsx` der App importiert werden. Enthalten die App auch eigene Stylesheets, müssen diese ebenfalls importiert werden.

```jsx title="./src/app/layout.jsx"
// Stylesheet der App oberhalb der UI-Styles
import "./globals.css";

// Stylesheet aus @northware/ui
import "@northware/ui/styles.css";
```

## Features

### Tailwind CSS

Northware verwendet [Tailwind CSS](https://tailwindcss.com/) zum Styling.

Die **`tailwind.config.js`** innerhalb des Packages ermöglich die Nutzung innerhalb des Packages mit den folgenden Konfigurationen:

- `content` definiert, in welchen Ordnern die Tailwind Klassen verwendet werden können.
- Das UI-Package verwendet den Prefix `ui-`. Das bedeutet, das jede Tailwind-Klasse innerhalb des UI-Package mit diesem Prefix angegeben werden muss. Damit ist gewährleistet, das Tailwind-Klassen innerhalb des UI-Packages nicht mit Tailwind-Klassen außerhalb des Packages (z.B. in den Apps) in Konflikt kommen.
- Darüber hinaus verwendet das UI-Package die Basis-Konfigurationen aus [@northware/tailwind-config](../tailwind-config) als Preset. Alle Regelungen, die in diesem Package bereits getroffen wurden, müssen in der Konfigurationsdatei der UI nicht erneut definiert werden.

Das UI-Package verwendet die Tailwind CLI, um die Stylings aus den Komponenten der UI anzuwenden. Die `./src/styles.css` importiert dazu die Tailwind-Directives. Wird nun innerhalb des Packages bzw. in innerhalb der Turborepo das Script `dev` oder `build` aufgerufen, compiled die Tailwind CLI die innerhalb de UI-Packages verwendeten Stylings in die `./dist/index.sass`. Diese Datei wird wiederum vom `@northware/ui`-Package exportiert und muss dann in die `layout.jsx` der Northware Apps importiert werden, um die UI-Komponenten richtig darstellen zu können.

### shadcn/ui

Das UI-Design ist inspiriert von [shadcn/ui](https://ui.shadcn.com/).
Da es sich bei dem UI-Package um kein vollständiges React-Framework hadelt, kann die **shadcn CLI** nicht verwendet werden.
Stattdessen müssen die schadcn Komponenten manuell implementiert werden.

### lucide-react

[Lucide React](https://lucide.dev/guide/packages/lucide-react) ist die von Northware verwendete Icon-Library.

### `cn()` Helper Function

Die Funktion `cn()` ist eine Helper Function die innerhalb des UI-Packages verwendet werden kann, um Conditional Tailwind Klassen zu vereinfachen.

#### Beispiel

```jsx
import { cn } from "../lib/cn";

export function HelloWorld({ className }) {
  return (
    <div className={cn(className, "ui-text-cockpit-300")}>
      <h1 className="ui-text-4xl ui-font-medium">Hello World</h1>
    </div>
  );
}
```

Die Komponente `HelloWorld` exportiert einen `div` der eine `h1` enthält. Beide Elemente der Komponente sind mit Tailwind Klassen gestylet, sodass eine Implementierung ohne weitere Properties eine gestylete Überschrift ausgibt.
Die Komponente akzeptiert außerdem die Property `className`. Wird die Komponente mit der Property `className` implementiert, wird dieser Wert als `className` auf den `div` angewendet. Die Verwendung von `cn()` ermöglicht nun, das das Base-Styling der Komponete überschrieben wird.

```jsx
...
// Rendert eine blaue Überschrift (wegen ui-text-cockpit-300)
<HelloWorld />
...
// Rendert eine orangene Überschrift (text-trader-400) mit einem grünen Hintergrund
<HelloWorld className="bg-green-400 text-trader-400" />
```
