/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        agua: 'var(--color-agua)',
        vida: 'var(--color-vida)',
        fondo: 'var(--color-fondo)',
        texto: 'var(--color-texto)',
        tierra: {
          50: '#FAFAF5',
          100: '#EFEFE7',
          200: '#D8D9CE',
          300: '#B5B7A8',
          400: '#8B8E7E',
          500: '#5E6157',
          600: '#3E4239',
          700: '#2A2E27',
          800: '#1F2933',
          900: '#131A22',
        },
        rio: {
          50: '#E6F1F5',
          100: '#C3DEE7',
          200: '#8CBFCF',
          300: '#529FB4',
          400: '#1F7F95',
          500: '#006A82',
          600: '#005B73',
          700: '#00485C',
          800: '#003545',
          900: '#00232E',
        },
        alerce: {
          50: '#F3F8EC',
          100: '#E1EFD0',
          200: '#C6E1A5',
          300: '#A3CE73',
          400: '#89BC50',
          500: '#72A93A',
          600: '#5C8A2F',
          700: '#456724',
          800: '#2F461A',
          900: '#1B280F',
        },
        bosque: {
          50: '#EEF5EF',
          100: '#D6E7D8',
          200: '#ADCEB1',
          300: '#7CAF83',
          400: '#4E8C58',
          500: '#3B7A46',
          600: '#2E6B3E',
          700: '#245430',
          800: '#193C22',
          900: '#0E2413',
        },
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        serif: ['"Source Serif 4"', 'Georgia', 'serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '72ch',
          },
        },
      },
    },
  },
  plugins: [],
};
