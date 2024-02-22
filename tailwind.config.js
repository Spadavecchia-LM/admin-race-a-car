const { nextui } = require("@nextui-org/react");
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
  "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  'node_modules/flowbite-react/lib/esm/**/*.js',

],
  
  theme: {
    extend: {},
    colors:{
      primaryBlue:"#032047",
      primaryWhite: "#F8F4F4",
      secondaryBlue: "#000e14",
      primaryGold:"#ba8f04",
      secondaryBlue:"#000E14",
      formGrey:"#d3d3d3",
      transparent:"transparent"
    },
    backgroundImage:{
      "hero": "url('./src/assets/heroAuto.png')"
    },
    fontSize:{
      fsTitle: "3rem",
      fsSubtitle: "1.5rem",
      fsText: "1rem",
      fsHero: "40px"
    },


  },
  darkMode: "class",
  plugins: 
  [nextui(),
  require('flowbite/plugin'),
  ]
}
