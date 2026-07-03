/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F4F7F6',
        'deep-teal': '#0F3C36',
        coral: '#FAD0C4',
        'whatsapp-green': '#25D366',
      },
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        jakarta: ['Plus Jakarta Sans', 'sans-serif'],
      },
      borderRadius: {
        organic: '120px 20px 120px 20px',
        'organic-alt': '20px 120px 20px 120px',
        pill: '9999px',
      },
      spacing: {
        'section': '120px',
        'section-sm': '80px',
      },
      boxShadow: {
        'soft': '0 20px 40px -15px rgba(15, 60, 54, 0.05)',
        'glow': '0 0 40px -10px rgba(250, 208, 196, 0.5)',
      }
    },
  },
  plugins: [],
};