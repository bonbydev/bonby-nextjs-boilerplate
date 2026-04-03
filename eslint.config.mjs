import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import checkFile from "eslint-plugin-check-file";
import prettierPlugin from "eslint-plugin-prettier";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript", "prettier"),
  {
    plugins: {
      prettier: prettierPlugin,
      "check-file": checkFile,
    },
    rules: {
      "prettier/prettier": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_", caughtErrorsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "no-console": ["warn", { allow: ["warn", "error"] }],

      "check-file/filename-naming-convention": [
        "error",
        { "**/*.{ts,tsx}": "KEBAB_CASE" },
        { ignoreMiddleExtensions: true },
      ],
      "check-file/folder-naming-convention": [
        "error",
        {
          "actions/**/": "KEBAB_CASE",
          "components/**/": "KEBAB_CASE",
          "config/**/": "KEBAB_CASE",
          "constants/**/": "KEBAB_CASE",
          "hooks/**/": "KEBAB_CASE",
          "lib/**/": "KEBAB_CASE",
          "models/**/": "KEBAB_CASE",
          "services/**/": "KEBAB_CASE",
          "types/**/": "KEBAB_CASE",
          "validators/**/": "KEBAB_CASE",
        },
      ],
    },
  },
  {
    ignores: ["node_modules/**", ".next/**", "out/**", "build/**", "next-env.d.ts"],
  },
];

export default eslintConfig;
