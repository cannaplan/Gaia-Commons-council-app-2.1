import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import prettierConfig from 'eslint-config-prettier';

export default tseslint.config(
  // Global ignores
  {
    ignores: ['dist/**', 'node_modules/**', 'migrations/**', 'attached_assets/**'],
  },

  // Base JS recommended rules
  js.configs.recommended,

  // TypeScript recommended rules (type-aware disabled to keep CI fast)
  ...tseslint.configs.recommended,

  // React Hooks rules for client code
  {
    files: ['client/**/*.{ts,tsx}'],
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
    },
  },

  // Shared settings for all TS/TSX files
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      // Allow unused vars prefixed with underscore (common pattern in this codebase)
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      // Allow explicit any (the codebase uses it in some places)
      '@typescript-eslint/no-explicit-any': 'warn',
      // Prefer const declarations
      'prefer-const': 'warn',
      // No console.log in production server code (warn only)
      'no-console': 'off',
    },
  },

  // Allow require() in config files (standard for Tailwind, PostCSS, etc.)
  {
    files: ['*.config.ts', '*.config.js', 'postcss.config.*'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },

  // Disable rules that conflict with Prettier (must be last)
  prettierConfig,
);
