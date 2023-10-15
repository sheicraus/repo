import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Orange
        primary: {
          50: "#F8A675",
          100: "#F68C47",
        },
        // Blue
        secondary: {
          50: "#6C8999",
          100: "#4D7B93",
        },
        // Light blue
        tertiary: {
          50: "#BAD2DF",
          100: "#A0C7DC",
        },
        // Black
        primaryText: {
          DEFAULT: "#16212A",
        },
        // Light gray
        primaryBg: {
          DEFAULT: "#E6EAF4",
        },
        // Pearl
        secondaryBg: {
          DEFAULT: "#FBFCF8"
        }
      }
    },
  },
  plugins: [],
}
export default config
