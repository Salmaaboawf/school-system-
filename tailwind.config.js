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
        deepBlue: '#002749',   //hover button
        lightBlue: '#8FC4D9',
        mutedGreen: '#818C68',
        rustOrange: '#BF5517', 
        Orange: '#ff4e31',    //backeground button
         background:"#fbfbfd",   //background web
      },
      screens: {
        'xs': '360px', 
      }
    },
  },
  plugins: [flowbite.plugin()],
};

