/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit", // JIT (just-in-time) mode を適用
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          bg01: "#b1d9e3",
          bg02: "#ede5d8",
        },
      },
    },
  },
  plugins: [],
};
