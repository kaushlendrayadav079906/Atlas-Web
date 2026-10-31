/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          800: '#11224D',
          850: '#0E1A3D',
          900: '#0B1530',
          950: '#070D1E',
        },
        brand: {
          50: '#EEF6FF',
          100: '#D9EBFF',
          200: '#BCD8FF',
          300: '#8EBEFF',
          400: '#5A9BFF',
          500: '#2563EB',
          600: '#1D4ED8',
          700: '#1E40AF',
          800: '#1E3A8A',
          900: '#172554',
        },
        accent: {
          cyan: '#22D3EE',
          cyanGlow: 'rgba(34, 211, 238, 0.15)',
          emerald: '#10B981',
          amber: '#F59E0B',
        },
        atlas: {
          heading: '#142B59',
          body: '#45546B',
          highlight: '#0066CC',
          label: '#0066CC',
          cardTitle: '#172B50',
          cardDesc: '#53647A',
          navy: '#142B59',
          royal: '#0066CC',
          sapphire: '#0A66C2',
          gemini: '#0066CC',
          geminiBlue: '#0066CC',
          geminiPurple: '#0066CC',
          geminiLavender: '#0A66C2',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'Cambria', 'serif'],
      },
      boxShadow: {
        'enterprise': '0 10px 30px -10px rgba(7, 13, 30, 0.08), 0 4px 6px -2px rgba(7, 13, 30, 0.04)',
        'enterprise-lg': '0 20px 40px -15px rgba(7, 13, 30, 0.12), 0 8px 10px -4px rgba(7, 13, 30, 0.06)',
        'glow-cyan': '0 0 25px -5px rgba(34, 211, 238, 0.3)',
        'glow-blue': '0 0 30px -5px rgba(37, 99, 235, 0.35)',
      }
    },
  },
  plugins: [],
}

