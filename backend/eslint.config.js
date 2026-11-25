import { defineConfig, globalIgnores } from 'eslint/config';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';

export default defineConfig([
  globalIgnores(['dist', 'src/generated/prisma']),
  js.configs.recommended,
  tseslint.configs.recommended,
  eslintConfigPrettier,
]);
