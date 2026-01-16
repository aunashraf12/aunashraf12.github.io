/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        snoonu: {
          // Light mode colors
          red: '#E53E3E',        // Primary red
          darkRed: '#C53030',    // Darker red for accents
          lightRed: '#FED7D7',   // Light red for backgrounds
          black: '#1A202C',      // Deep black
          darkGray: '#2D3748',   // Dark gray
          gray: '#4A5568',       // Medium gray
          lightGray: '#E2E8F0',  // Light gray
          white: '#FFFFFF',      // Pure white

          // Dark mode colors
          'dark-red': '#FF6B6B',        // Brighter red for dark mode
          'dark-darkRed': '#FF5252',   // Even brighter red
          'dark-lightRed': '#2D1810',  // Dark red background
          'dark-black': '#0F0F0F',     // Very dark black
          'dark-darkGray': '#1A1A1A',  // Dark gray
          'dark-gray': '#2A2A2A',      // Medium dark gray
          'dark-lightGray': '#404040', // Light dark gray
          'dark-white': '#F5F5F5',     // Off-white for dark mode
        },
      },
      backgroundImage: {
        'restaurant-pattern': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23E53E3E' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        'restaurant-pattern-dark': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FF6B6B' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
      boxShadow: {
        'restaurant': '0 10px 25px -5px rgba(229, 62, 62, 0.1), 0 4px 10px -2px rgba(229, 62, 62, 0.05)',
        'restaurant-dark': '0 10px 25px -5px rgba(255, 107, 107, 0.1), 0 4px 10px -2px rgba(255, 107, 107, 0.05)',
      }
    },
  },
  plugins: [],
}