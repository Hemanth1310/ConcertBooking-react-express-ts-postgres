import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    // 1. Extend the base recommended configs
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    // 2. Register plugins (Note: react-refresh is often already in the configs, 
    // but we define it here clearly to avoid the redefinition error)
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    // 3. Define the rules
    rules: {
      // Pull in the recommended hooks rules
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      // 🎯 FORCE the error to show up for dependencies
      'react-hooks/exhaustive-deps': 'error', 
    },
  },
)