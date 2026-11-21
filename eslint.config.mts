import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import unusedImports from 'eslint-plugin-unused-imports';

export default defineConfig([
	{
		files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
		plugins: { js, 'unused-imports': unusedImports },
		rules: {
			'unused-imports/no-unused-imports': 'error'
		},
		extends: ['js/recommended'],
		languageOptions: { globals: globals.node }
	},

	tseslint.configs.recommended,
	eslintPluginPrettierRecommended
]);
