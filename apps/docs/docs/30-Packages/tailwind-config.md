# @northware/tailwind-config

Das Package `@northware/tailwind-config` exportiert eine `tailwind.config.js` Datei. Diese Konfigurationsdatei kann in Apss und Packages, die Tailwind verwenden als Preset in die Konfigurationdatei der App / des Pacakges importiert werden. Innerhalb der Konfigurationsdateien müssen dann nur noch Anpassungen vorgenommen werden, die nur für die einzelne App gelten.

## Tailwind in einer Next.js App nutzen

**1. Um Tailwind verwenden zu können, müssen `tailwindcss`, `postcss` und `autoprefixer` als Dev-Dependencies installiert werden:**

```cmd

pnpm add -D tailwindcss postcss autoprefixer

```

**2. Tailwind und PostCSS müssen konfigriert werden:**

```cmd

pnpm dlx tailwindcss init -p

```

**3. Anpassung der `tailwind.config.js`**

- `content`: Es muss definiert werden welche Dateien Tailwind nutzen.
- `presets`: Implementierung des Config-Presets aus `@northware/tailwind-config`
- `theme.extend.colors` (Optional): Über die Color Konfiguration aus `@northware/tailwind-config` hinaus kann eine Konfiguration innerhalb der App definiert werden. Hier sollte z.B. definiert werden, welche Farbe hinter `primary` steht. `primary` wird in UI und Apps als die hauptsächliche Brand-Color genutzt.

```js title="./tailwind.config.js"
/** @type {import('tailwindcss').Config} */

// colors wird genutzt, wenn die Standard-Farben von Tailwind mit einem anderen Namen genutzt werden sollen
const colors = require("tailwindcss/colors");

module.exports = {
  //
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  presets: [require("@northware/tailwind-config")],
  theme: {
    extend: {
      colors: {
        primary: colors.sky,
      },
    },
  },
  plugins: [],
};
```

**4. Implementierung von Tailwind in die `globals.css`**

Die `globals.css` muss nun so konfiguriert werden, dass die Tailwind-Stylings in das Styling der App aufgenommen wird.

```css title="./src/app/globals.css"

@tailwind base;
@tailwind components;
@tailwind utilities;

...

```

**5. Einbinden der `globals.css` und `@northware/ui/styling.css`**

```jsx title="./src/app/layout.jsx"
// App-weites Styling
import "./globals.css";

// Styling aus dem UI-Package (nur nötig wenn die App @northware/ui verwendet)
import "@northware/ui/styles.css";
```

Quelle: [Framework Guide "Install Tailwind CSS with Next.js"](https://tailwindcss.com/docs/guides/nextjs)

## Tailwind mit der Tailwind CLI nutzen

Packages, in denen kein Framework verwendet wird (wie `@northware/ui`), können Tailwind mit Hilfe der **Tailwind CDN** verwenden.

**1. Installation von Tailwind CSS**

```cmd

pnpm add -D tailwindcss

```

**2. Tailwind Initialisieren**

```cmd

pnpm dlx tailwindcss init

```

**3. Anpassung der `tailwind.config.js`**

- `content`: Es muss definiert werden welche Dateien Tailwind nutzen.
- `presets`: Implementierung des Config-Presets aus `@northware/tailwind-config`
- `theme.extend.colors` (Optional): Über die Color Konfiguration aus `@northware/tailwind-config` hinaus kann eine Konfiguration innerhalb der App definiert werden. Hier sollte z.B. definiert werden, welche Farbe hinter `primary` steht. `primary` wird in UI und Apps als die hauptsächliche Brand-Color genutzt.

```js title="./tailwind.config.js"
/** @type {import('tailwindcss').Config} */

// colors wird genutzt, wenn die Standard-Farben von Tailwind mit einem anderen Namen genutzt werden sollen
const colors = require("tailwindcss/colors");

module.exports = {
  //
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  presets: [require("@northware/tailwind-config")],
  theme: {
    extend: {
      colors: {
        primary: colors.sky,
      },
    },
  },
  plugins: [],
};
```

**4. Implementierung von Tailwind in eine CSS-Datei**

Innerhalb des Packages muss es eine CSS-Datei geben, in der Tailwind eingebunden wird (z.B. `./src/input.css`)

```css title="./src/input.css"

@tailwind base;
@tailwind components;
@tailwind utilities;

...

```

**5. Compiling Prozess starten**

Die Tailwind CLI muss nun die verwendeten Tailwind-Styles compilen. Dazu muss der folgende Command ausgeführt werden:

```cmd

pnpm tailwindcss -i ./src/input.css -o ./src/output.css --watch

```

Mit diesem Code compiled die Tailwind CLI das Styling nun also aus der `input.css` in die `output.css`.
Durch das `--watch` Flag wartet der Command auf Änderungen innerhalb des Packages und compiled live in die `output.css`

**6. `output.css` in die App integrieren**

Die `output.css` enthält nun nur die wirklich benötigten Stylings und kann innerhalb des Packages oder in anderen Packages und Apps überall dort verwendet werden, wo auf Teile des Packages zugegriffen wird.

```jsx title="./layout.jsx"
import "@northware/ui/styles.css";
```

**Achtung:** Werden Stylesheets aus einem Package in einem anderen Package oder App verwendet, muss das bereitstellende Package diese CSS-Datei exportieren.

```json title="package.json"

{
  ...
  "exports": {
    "./styles.css": "./src/output.css",
    ...
  },
  ...
}

```

Quelle: [Tailwind Installation mit der CLI](https://tailwindcss.com/docs/installation)
