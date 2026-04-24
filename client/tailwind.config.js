/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        gold: {
          50:  '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        nature: {
          brown:      '#8B4513',
          green:      '#228B22',
          lightGreen: '#90EE90',
          earth:      '#A0522D',
          moss:       '#4A5240',
          cream:      '#FDF8F0',
        },
      },
      fontFamily: {
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        serif:   ['Merriweather', 'Georgia', 'serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
      animation: {
        'fade-up':    'fadeUp 0.7s ease-out both',
        'float':      'float 6s ease-in-out infinite',
        'shimmer':    'shimmer 2.5s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow':'bounce 3s infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition:  '200% 0' },
        },
      },
      boxShadow: {
        'luxury':     '0 20px 60px rgba(0,0,0,0.18)',
        'card':       '0 4px 24px rgba(0,0,0,0.08)',
        'card-hover': '0 16px 48px rgba(0,0,0,0.16)',
        'glow-green': '0 0 32px rgba(22,163,74,0.35)',
        'glow-gold':  '0 0 32px rgba(245,158,11,0.35)',
        'inner-light':'inset 0 1px 0 rgba(255,255,255,0.15)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-nature': 'linear-gradient(135deg,#14532d 0%,#166534 50%,#15803d 100%)',
        'gradient-gold':   'linear-gradient(135deg,#b45309 0%,#d97706 50%,#f59e0b 100%)',
      },
    },
  },
  plugins: [],
}
