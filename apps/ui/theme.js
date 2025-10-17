import { defineConfig, theme } from 'tailwindcss'

export default defineConfig({
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1DA1F2',
          light: '#71C9F8',
          dark: '#0d8ddb',
        },
        secondary: {
          DEFAULT: '#FF6B6B',
          light: '#FFA8A8',
          dark: '#E24B4B',
        },
      },
    },
  },
})
