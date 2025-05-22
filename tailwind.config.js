/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}", // Quét các tệp JavaScript và TypeScript trong thư mục src
      "./public/index.html" // Quét tệp index.html trong thư mục public
    ],
    theme: {
      extend: {
        fontFamily: {
          'sans': ['Montserrat', 'sans-serif'],
          'serif': ['Merriweather', 'serif'],
          'display': ['Playfair Display', 'serif'],
          'handwriting': ['Ms Madi', 'cursive'],
          'abril': ['Abril Fatface', 'cursive'],
        },
      },
    },
    plugins: [],
  }
  