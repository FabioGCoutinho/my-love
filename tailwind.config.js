/** @type {import('tailwindcss').Config} */
module.exports = {
  // Certifique-se de que o caminho para seus arquivos está correto aqui
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Para React, Vue, etc.
    "./public/index.html",
    // Se você usa outras extensões ou pastas, adicione-as aqui
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}