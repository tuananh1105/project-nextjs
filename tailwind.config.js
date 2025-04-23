// tailwind.config.js
module.exports = {
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
      "./app/**/*.{js,ts,jsx,tsx}",
      "./node_modules/@medusajs/ui/dist/**/*.{js,ts,jsx,tsx}",
    ],
    presets: [(await import("@medusajs/ui-preset")).default],
    theme: {
      extend: {},
    },
    plugins: [],
  };