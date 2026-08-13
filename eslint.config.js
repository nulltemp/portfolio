import js from "@eslint/js";
import pluginVue from "eslint-plugin-vue";
import vuePrettierConfig from "@vue/eslint-config-prettier";
import globals from "globals";

export default [
  {
    ignores: ["dist/**"]
  },
  js.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  vuePrettierConfig,
  {
    files: ["**/*.{js,vue}"],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.es2022
      }
    },
    rules: {
      "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
      "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
    }
  }
];
