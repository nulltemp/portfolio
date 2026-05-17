module.exports = {
  root: true,
  env: {
    node: true,
    es2022: true
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "plugin:prettier/recommended"
  ],
  rules: {
    "no-console": import.meta.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": import.meta.env.NODE_ENV === "production" ? "error" : "off"
  }
};
