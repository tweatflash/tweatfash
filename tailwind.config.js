/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors:{
        "background":"var(--background)",
        "primary-bg-color":"var(--primary-bg-color)",
        "border-color":"var(--border-color)",
        "accent":"var(--accent)",
      }
    },
    screens:{
      mobileM:{max:"639px"},
      mobile:{min:"650px"},
      feedMax:{min:"600px"},
      sm:"640px",
      md:"768px",
      lg:"1024px",
      xl:"1280px",
    }
  },
  plugins: [],
}

