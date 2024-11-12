# `@northware/ui`

**`@northware/ui`** is a set of reusable styles and components to be used throughtout most Northware Projects.

View the whole [`@northware/ui` Docs on GitHub Pages](https://ncs-northware.github.io/northware/Packages/ui)

## Usage

### UI styling and Tailwind

In apps that are to use `@northware/ui`, Tailwind CSS (and `autoprefixer` and `postcss` ) ​​must be installed and correctly configured. More on this in the [`@northware/tailwind-config` docs](https://ncs-northware.github.io/northware/Packages/tailwind-config).

To use the stylesheet from `@northware/ui`, it must be imported into the app's `layout.jsx`. If the app also contains its own stylesheets, these must also be imported.

```jsx title="./src/app/layout.jsx"
// Stylesheet of the app above the UI styles
import "./globals.css";

// Stylesheet from @northware/ui
import "@northware/ui/styles.css";
```
