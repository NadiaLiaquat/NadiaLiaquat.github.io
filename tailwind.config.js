/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1440px',
    },
    extend: {
      colors: {
        bg: '#050509',
        surface: '#0B0D14',
        ink: '#F5F7FF',
        muted: '#8B93A7',
        cyan: '#00F5FF',
        pink: '#FF2BD6',
        purple: '#8A2BE2',
        green: '#39FF88',
        warn: '#FFE600',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      boxShadow: {
        'neon-cyan': '0 0 10px rgba(0,245,255,.30), 0 0 35px rgba(0,245,255,.12)',
        'neon-pink': '0 0 10px rgba(255,43,214,.30), 0 0 35px rgba(255,43,214,.12)',
        'neon-purple': '0 0 10px rgba(138,43,226,.30), 0 0 35px rgba(138,43,226,.12)',
        'neon-green': '0 0 10px rgba(57,255,136,.30), 0 0 35px rgba(57,255,136,.12)',
      },
      keyframes: {
        'blink': {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        'reveal-up': {
          from: { opacity: '0', transform: 'translateY(18px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'float-y': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        'glitch-shift': {
          '0%, 92%, 100%': { transform: 'translate(0)', filter: 'none' },
          '93%': { transform: 'translate(-1px, 1px)' },
          '95%': { transform: 'translate(1px, -1px)' },
          '97%': { transform: 'translate(-1px, 0)' },
        },
        'sweep': {
          from: { transform: 'translateX(-100%)' },
          to: { transform: 'translateX(100%)' },
        },
        'pulse-dot': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '.45', transform: 'scale(.82)' },
        },
      },
      animation: {
        'blink': 'blink 1.05s steps(1) infinite',
        'reveal-up': 'reveal-up .6s cubic-bezier(.22,1,.36,1) both',
        'float-y': 'float-y 7s ease-in-out infinite',
        'glitch-shift': 'glitch-shift 6s infinite',
        'sweep': 'sweep 2.4s ease-in-out infinite',
        'pulse-dot': 'pulse-dot 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
