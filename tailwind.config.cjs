/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
      extend: {
        fontFamily: {
          sans: ['"Open Sans"', 'sans-serif']
        },
        colors: {
          primary_dark: '#F57C00',
          primary_light: '#FFE0B2',
          primary: '#FF9800',
          primary_text: '#212121',
          secondary_text: '#757575',
          accent: '#FF5722',
          divider: '#BDBDBD'
        }
      },
     plugins: [],
  }
}
