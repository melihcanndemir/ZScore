import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.TURKISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config; 