/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        body: ['"IBM Plex Sans"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      colors: {
        surface: {
          950: '#080A0E',
          900: '#0D1017',
          800: '#121620',
          700: '#191E2B',
          600: '#1F2637',
          500: '#2A3347',
        },
        border: { DEFAULT: '#1E2533', light: '#2A3347', bright: '#3D4F6B' },
        green: { DEFAULT: '#00D97E', dim: '#00A85F', muted: '#0D2E1F', text: '#4DFFA8' },
        red: { DEFAULT: '#FF4D4D', dim: '#CC2929', muted: '#2E0D0D', text: '#FF8080' },
        amber: { DEFAULT: '#F59E0B', muted: '#2D1F05' },
        text: {
          primary: '#E8EDF5',
          secondary: '#8B9AB5',
          muted: '#4A5568',
          accent: '#00D97E',
        }
      },
      animation: {
        'fade-up': 'fadeUp .4s cubic-bezier(.22,1,.36,1) both',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'blink': 'blink 1s step-end infinite',
      },
      keyframes: {
        fadeUp: { from: { opacity: 0, transform: 'translateY(14px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        blink: { '0%,100%': { opacity: 1 }, '50%': { opacity: 0 } },
      },
      boxShadow: {
        'tool': '0 0 0 1px rgba(0,217,126,.08), 0 4px 24px rgba(0,0,0,.4)',
        'glow-green': '0 0 20px rgba(0,217,126,.15)',
        'glow-red': '0 0 20px rgba(255,77,77,.12)',
      }
    },
  },
  plugins: [],
}
