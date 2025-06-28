import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem'
      }
    },

    extend: {
      colors: {
        white: '#ffffff',
        black: '#000000',
        transparent: 'transparent',
        light: '#FAFCFE',
        success: {
          DEFAULT: '#a4f4e7',
          50: '#FCFFFD',
          100: '#ECFDF5',
          200: '#15B097',
          300: '#0b7b69'
        },
        warning: {
          DEFAULT: '#f4c790',
          50: '#FFFDFC',
          100: '#FFFBEB',
          200: '#eda145',
          300: '#CC7914'
        },
        error: {
          DEFAULT: '#e4626f',
          50: '#FFFCFC',
          100: '#FEF2F2',
          200: '#C03744',
          300: '#8c1823'
        }
      },
      boxShadow: {
        light: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
        medium: '0px 1px 2px 0px rgba(16, 24, 40, 0.10)',
        high: '0px 1px 2px 0px rgba(16, 24, 40, 0.05), 1px 1px 8px 0px rgba(16, 24, 40, 0.05)'
      },
      fontFamily: {
        mulish: ['Inter']
      },
      maxHeight: {
        46: '11.5rem',
        128: '32rem',
        xl: '36rem',
        '2xl': '42rem',
        '3xl': '48rem'
      },
      divideWidth: {
        0.25: '0.0625rem'
      },
      animation: {
        rmehe: 'Rmehe 0.3s ease 0.5s 1 normal both'
      },
      keyframes: {
        Rmehe: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      }
    }
  },
  plugins: []
}

export default config
