/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(220 89.2% 50%)',
        accent: 'hsl(10, 90%, 55%)',
        bg: 'hsl(220 36% 96%)',
        surface: 'hsl(0 0% 100%)',
        'text-primary': 'hsl(220 14% 14%)',
        'text-secondary': 'hsl(220 14% 34%)',
      },
      borderRadius: {
        'sm': '6px',
        'md': '10px',
        'lg': '16px',
        'xl': '24px',
      },
      spacing: {
        'sm': '8px',
        'md': '12px',
        'lg': '20px',
        'xl': '32px',
      },
      boxShadow: {
        'card': '0 4px 16px hsla(220, 14%, 14%, 0.1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)',
        'slide-up': 'slideUp 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
