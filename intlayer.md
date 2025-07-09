# Intlayer Integration Guide (React + Vite + TypeScript)

## 1. Install Required Packages

```bash
npm install intlayer react-intlayer
npm install --save-dev vite-intlayer
npm install @vitejs/plugin-react-swc --save-dev
```

Or with yarn:

```bash
yarn add intlayer react-intlayer
yarn add --dev vite-intlayer
```

## 2. Configure Languages

Create `intlayer.config.ts`:

```ts
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

## 3. Add the Plugin to Vite Config

Add the Intlayer plugin to your `vite.config.ts`:

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayerPlugin } from "vite-intlayer";

export default defineConfig({
  plugins: [react(), intlayerPlugin()],
});
```

## 4. Create a Content File

Example: `src/app.content.tsx`

```tsx
import { t, type Dictionary } from "intlayer";
import type { ReactNode } from "react";

const appContent = {
  key: "app",
  content: {
    title: t({
      en: "Welcome",
      fr: "Bienvenue",
      es: "Bienvenido",
    }),
    description: t<ReactNode>({
      en: <>Edit <code>src/App.tsx</code> and save to test HMR</>,
      fr: <>Éditez <code>src/App.tsx</code> et enregistrez pour tester HMR</>,
      es: <>Edita <code>src/App.tsx</code> y guarda para probar HMR</>,
    }),
  },
} satisfies Dictionary;

export default appContent;
```

## 5. Wrap Your App with IntlayerProvider

Update `src/main.tsx`:

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { IntlayerProvider } from "react-intlayer";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <IntlayerProvider>
      <App />
    </IntlayerProvider>
  </React.StrictMode>
);
```

## 6. Use Translations in Your App

Example `src/App.tsx`:

```tsx
import appContent from "./app.content";

function App() {
  return (
    <div>
      <h1>{appContent.content.title}</h1>
      <p>{appContent.content.description}</p>
    </div>
  );
}

export default App;
```

---

## Using the useLocale Hook

Create a language switcher component:

```tsx
import { useLocale } from "react-intlayer";
import { getLocaleName } from "intlayer";

export default function LocaleSwitcher() {
  const { locale, setLocale, availableLocales } = useLocale();

  return (
    <div style={{ marginTop: "1rem" }}>
      <span>🌐 Language: </span>
      {availableLocales.map((loc) => (
        <button
          key={loc}
          onClick={() => setLocale(loc)}
          disabled={loc === locale}
          style={{
            marginRight: "0.5rem",
            fontWeight: loc === locale ? "bold" : "normal",
          }}
        >
          {getLocaleName(loc)}
        </button>
      ))}
    </div>
  );
}
```

---

## Using useIntlayer() for Content

Example `src/App.tsx`:

```tsx
import { useIntlayer } from "react-intlayer";

function App() {
  const content = useIntlayer("app");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
}
```

---

## Handling Placeholders and String Props

If you pass a translation node directly to a string prop (like `placeholder`), you may see `[object Object]`.

**Solution:** Use `.value` for string props:

```tsx
<input
  type="text"
  placeholder={content.searchPlaceholder.value} // ✅ use .value
  ...
/>
```

---

## Language Switching with useLocale

Intlayer does not provide `content.language` or `content.setLanguage`. Use the `useLocale` hook for language switching:

```tsx
import { useIntlayer, useLocale } from "react-intlayer";

function App() {
  const content = useIntlayer("app");
  const { locale, setLocale } = useLocale();

  const toggleLanguage = () => {
    const newLocale = locale === "tr" ? "en" : "tr";
    setLocale(newLocale);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
    >
      {locale === "tr" ? "🇬🇧" : "🇹🇷"}
    </button>
  );
}
```

**Explanation:**
- `useLocale()` provides the current locale and a setter function.
- `useIntlayer()` only returns content, not language state.

---

## Type-Safe Language Switching (onChange and Enum)

Intlayer provides a `Locales` enum. Use it for type-safe language switching:

```tsx
import { Locales } from "intlayer";

onChange={(e) => setLocale(e.target.value as keyof typeof Locales)}
```

**Alternative (stricter):**

```tsx
type SupportedLocale = "en" | "tr" | "de" | "fr" | ...;

onChange={(e) => setLocale(e.target.value as SupportedLocale)}
```

**Bonus: Fully type-safe solution:**

```tsx
import { Locales } from "intlayer";

onChange={(e) => {
  const value = e.target.value;
  if (Object.values(Locales).includes(value as Locales)) {
    setLocale(value as keyof typeof Locales);
  }
}}
```

---

## Automatic Language Detection (Planned Feature)

Intlayer plans to support automatic language detection via the config file. Example (not yet officially supported):

```ts
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.TURKISH],
    defaultLocale: Locales.ENGLISH,
    detection: {
      strategy: "browser", // or "cookie", "url", "custom"
    },
  },
};

export default config;
```

**Supported strategies:**
- `"browser"` → Detects via `navigator.language`
- `"cookie"` → Reads language from a cookie
- `"url"` → Detects language from URL prefix (e.g., `/en`, `/tr`)
- `"custom"` → Use your own detection function

**Note:** As of now, this feature is not officially available in Intlayer. For type safety, use the custom detection method below.

---

## Type-Safe Automatic Language Detection (AutoDetectLanguage)

For now, implement automatic language detection at the app level using a type-safe component:

```tsx
import { useEffect } from "react";
import { useLocale } from "react-intlayer";
import { Locales } from "intlayer";

export default function AutoDetectLanguage() {
  const { setLocale, availableLocales } = useLocale();

  useEffect(() => {
    const browserLang = navigator.language.split("-")[0];
    if (availableLocales.includes(browserLang as Locales)) {
      setLocale(browserLang as Locales);
    }
  }, [availableLocales, setLocale]);

  return null;
}
```

**Explanation:**
- `availableLocales` is the list of supported languages from your config
- `Locales` enum ensures type safety
- No `any` usage, no ESLint/TS errors

Use it at the top level of your app:

```tsx
<>
  <AutoDetectLanguage />
  <App />
</>
```

---