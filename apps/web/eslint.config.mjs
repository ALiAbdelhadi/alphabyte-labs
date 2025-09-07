import tailwind from 'eslint-plugin-tailwindcss'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

export default [
  // Next.js recommended rules (via compat from legacy names)
  ...compat.extends('next/core-web-vitals', 'next/typescript'),

  // TailwindCSS flat config
  tailwind.configs['flat/recommended'],

  // Project rules
  {
    rules: {
      'no-console': ['error', { allow: ['info', 'warn', 'error'] }],
      'tailwindcss/classnames-order': 'error',
      'tailwindcss/no-custom-classname': 'warn',
    },
  },
]
