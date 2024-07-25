const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      backgroundImage: {
        slideOne: "url(./src/assets/images/slide_min_1.jpg)",
      },
    },
  },
  plugins: [flowbite.plugin()],
};
