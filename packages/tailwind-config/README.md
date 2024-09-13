# @northware/tailwind-config

This package contains a basic preset config for tailwind to be used in all Northware Apps.

## Use this package

### Add it to another app or package

You can add this package to any other package or app within the Turborepo just as you do it everywhere (note that you will have to install tailwind there too.).

In your `package.json`:

```json
{
    ...
    "devDependencies": {
        ...
        "@northware/tailwind-config": "workspace:*",
        "tailwindcss": "^3.4.1"
    }
    ...
}
```

### Use the package within your `tailwind.config.js`

Now that you have the package installed you can use it to define the basic config within the `tailwind.config.js`

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  presets: [require("@northware/tailwind-config")],
};
```

Note that you can also define any other configuration besides the preset to extend or overwrite the configuration for only this package/app.

```js
const colors = require("tailwindcss/colors");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  // Use the basic preset
  presets: [require("@northware/tailwind-config")],
  theme: {
    extend: {
      // Overwrite primary behaviour
      colors: {
        primary: colors.sky,
        onPrimary: colors.white,
      },
    },
  },
};
```

> [!IMPORTANT]
> primary and onPrimary are ment to be different in different apps.
> Please overwrite it in the tailwind.config.js of the certain app.
> Otherwise it falls back to the cockpit primaries.
