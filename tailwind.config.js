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
          heading: '#0A1B4F',
          body: '#4A5876',
          highlight: '#1F4FE0',
          label: '#1F4FE0',
          cardTitle: '#0A1B4F',
          cardDesc: '#4A5876',
          navy: '#0A1B4F',
          navyDeep: '#071340',
          royal: '#1F4FE0',
          royalDark: '#1739B8',
          royalTint: '#EEF3FF',
          sky: '#63C7F7',
          gold: '#E0A33B',
          goldDark: '#C98A22',
          goldTint: '#FBF3E4',
          mist: '#EEF4FA',
          tint: '#F5F8FC',
          line: '#E3EAF3',
          lineStrong: '#D6E2F0',
          onNavy: '#C9D5EE',
          sapphire: '#1F4FE0',
          gemini: '#1F4FE0',
          geminiBlue: '#1F4FE0',
          geminiPurple: '#1F4FE0',
          geminiLavender: '#1F4FE0',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        // Headings previously used a serif face; the redesign uses one confident sans family site-wide.
        serif: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        // Editorial accent face for highlighted words (italic), after the Lovable reference.
        accent: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      boxShadow: {
        'enterprise': '0 10px 30px -10px rgba(10, 27, 79, 0.10), 0 4px 6px -2px rgba(10, 27, 79, 0.04)',
        'float': '0 24px 48px -20px rgba(10, 27, 79, 0.35)',
        'strip': '0 30px 60px -30px rgba(10, 27, 79, 0.25)',
        'enterprise-lg': '0 20px 40px -15px rgba(7, 13, 30, 0.12), 0 8px 10px -4px rgba(7, 13, 30, 0.06)',
        'glow-cyan': '0 0 25px -5px rgba(34, 211, 238, 0.3)',
        'glow-blue': '0 0 30px -5px rgba(37, 99, 235, 0.35)',
      }
    },
  },
  plugins: [],
}

