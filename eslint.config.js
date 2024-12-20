import pluginVue from 'eslint-plugin-vue';
import vueTsEslintConfig from '@vue/eslint-config-typescript';
import pluginVitest from '@vitest/eslint-plugin';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin-js';
import filenameRules from 'eslint-plugin-filename-rules';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  ...pluginVue.configs['flat/recommended'],
  ...vueTsEslintConfig(),

  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },

  {
    ...pluginVitest.configs.recommended,
    files: ['src/**/__tests__/*'],
  },

  {
    plugins: {
      '@stylistic': stylistic,
      '@stylistic/js': stylistic,
      'filename-rules': filenameRules
    },
    rules: {
      'linebreak-style': 'off',
      'no-console': 'off',
      'no-debugger': 'error',
      'no-unused-expressions': 'error',
      'no-param-reassign': 'off',
      'no-plusplus': 'off',
      'no-bitwise': ['error', { allow: ['~'] }],
      'no-unused-vars': 'warn',
      'object-curly-newline': 'off',
      'prefer-destructuring': [
        'error',
        { array: false, object: true, },
        { enforceForRenamedProperties: false }
      ],
      indent: ['off'],

      '@stylistic/js/indent': ['error', 2],
      '@stylistic/js/arrow-parens': ['error', 'always'],
      '@stylistic/js/arrow-spacing': ['error'],
      '@stylistic/js/block-spacing': ['error'],
      '@stylistic/js/comma-spacing': ['error'],
      '@stylistic/js/computed-property-spacing': ['error', 'never'],
      '@stylistic/comma-dangle': ['off', {
        arrays: 'never',
        objects: 'never',
        imports: 'never',
        exports: 'never',
        functions: 'never',
      }],
      '@stylistic/js/keyword-spacing': ['error', { before: true }],
      '@stylistic/max-len': ['error', { code: 140, ignoreTemplateLiterals: true, ignoreStrings: true }],
      '@stylistic/linebreak-style': 'off',
      '@stylistic/js/no-confusing-arrow': 'error',
      '@stylistic/js/no-extra-parens': 'error',
      '@stylistic/js/no-extra-semi': 'error',
      '@stylistic/js/no-mixed-spaces-and-tabs': 'error',
      '@stylistic/js/no-multi-spaces': 'error',
      '@stylistic/js/no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
      '@stylistic/js/no-tabs': 'error',
      '@stylistic/js/no-trailing-spaces': 'error',
      '@stylistic/js/no-whitespace-before-property': 'error',
      '@stylistic/js/nonblock-statement-body-position': ['error', 'beside'],
      '@stylistic/js/max-statements-per-line': ['error', { max: 1 }],
      '@stylistic/object-curly-newline': ['error', {
        ObjectExpression: { multiline: true },
        ObjectPattern: { multiline: true, consistent: true },
        ImportDeclaration: { multiline: true, minProperties: 3 },
        ExportDeclaration: { multiline: true, minProperties: 3 },
      }],
      '@stylistic/js/object-curly-spacing': ['error', 'always'],
      '@stylistic/js/semi': ['error', 'always'],
      '@stylistic/js/quote-props': ['error', 'as-needed'],
      '@stylistic/js/quotes': ['error', 'single'],
      '@stylistic/js/rest-spread-spacing': ['error', 'never'],
      '@stylistic/js/semi-spacing': ['error'],
      '@stylistic/js/semi-style': ['error', 'last'],
      '@stylistic/js/space-before-blocks': ['error'],
      '@stylistic/js/space-before-function-paren': ['error'],
      '@stylistic/js/space-in-parens': ['error', 'never'],
      '@stylistic/js/space-infix-ops': ['error'],
      '@stylistic/js/space-unary-ops': ['error'],
      '@stylistic/js/spaced-comment': ['error', 'always'],
      '@stylistic/js/switch-colon-spacing': ['error', { after: true, before: false }],
      '@stylistic/js/template-curly-spacing': ['error'],
      '@stylistic/js/wrap-iife': ['error', 'outside'],
      '@stylistic/js/wrap-regex': ['error'],
    }
  },

  {
    files: ['**/*.vue'],
    rules: {
      'vue/script-indent': ['error', 2, { baseIndent: 1 }],
      'vue/singleline-html-element-content-newline': 'off',
      'vue/block-order': ['error', { order: ['script', 'template', 'style'], }],
      'vue/html-self-closing': ['error', {
        html: {
          void: 'never',
          normal: 'always',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      }],
      'vue/html-indent': [
        'error',
        2,
        {
          attribute: 1,
          baseIndent: 1,
          closeBracket: 0,
          alignAttributesVertically: true,
          ignores: [],
        },
      ],
      'vue/max-attributes-per-line': ['error', {
        singleline: { max: 3 },
        multiline: { max: 1 },
      }],
      'vue/attributes-order': ['error', {
        order: [
          'DEFINITION',
          'LIST_RENDERING',
          'CONDITIONALS',
          'RENDER_MODIFIERS',
          'GLOBAL',
          ['UNIQUE', 'SLOT'],
          'TWO_WAY_BINDING',
          'OTHER_DIRECTIVES',
          'OTHER_ATTR',
          'EVENTS',
          'CONTENT',
        ],
        alphabetical: true,
      }],
      'vue/attribute-hyphenation': ['error', 'never', { ignore: [], }],
      'vue/no-v-for-template-key': 'off',

      '@stylistic/js/indent': ['off'],
    }
  },

  {
    files: ['**/*.ts', '**/*.vue'],
    rules: {

      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true
        }
      ],
    }
  }
);
