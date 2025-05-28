/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // ✅ permet d’activer le mode nuit manuellement
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // Personnalisation si tu veux des couleurs supplémentaires, etc.
    },
  },
  plugins: [],
}
