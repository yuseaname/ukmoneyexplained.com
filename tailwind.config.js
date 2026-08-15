/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./themes/adsense-base/layouts/**/*.html",
    "./layouts/**/*.html",
    "./content/**/*.md",
  ],
  theme: {
    extend: {
      colors: {
        ukm: {
          ink: '#0B1A2F',
          slate: '#334155',
          muted: '#566371',
          parchment: '#F7F5F1',
          paper: '#FFFFFF',
          ruler: '#D6CFC4',
          authority: '#0F4C5C',
          crown: '#1F4D35',
          caution: '#924A04',
          urgent: '#9B2C2C',
        },
        section: {
          credit: '#1E3A5F',
          debt: '#9B2C2C',
          loans: '#4A4A4A',
          mortgages: '#7C5E4A',
          taxes: '#1F4D35',
          bills: '#A85232',
          tools: '#2A6B5E',
        },
      },
      fontFamily: {
        display: ['Saira', 'sans-serif'],
        heading: ['Fraunces', 'Georgia', 'serif'],
        body: ['Inter', 'Saira', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};