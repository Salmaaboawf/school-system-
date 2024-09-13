const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      backgroundImage: {
        slideOne: "url(./src/assets/images/slide_min_1.jpg)",
      },
      colors: {
        darkBlue: '#002749',
        // teal: '#005A7C',
        lightBlue: '#87B9F5',
        orange: 'FF4E31',
        peach: '#F2A766',
        purple: ' #7C3AED',
        // redOrange: '#F2561D',

      },
    },
  },
  plugins: [flowbite.plugin()],
};
