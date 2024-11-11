import { I18n } from "i18n-js";

import en from "./en.json";
import ur from "./ur.json";

// Set up translations and configure i18n
const i18n = new I18n({
  en,
  ur,
});
i18n.locale = "en";
i18n.fallbacks = true;

export const t = (key, options = {}) => i18n.t(key, options);

export default i18n;
