import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/globals.css",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        wine: "#c23a2e",
        wineMasOscuro: "#4c0033",
        gin: "#64bad6",
        vodka: "#e5e9f4",
        licor: "#d1cc39",
        ron: "#8c2b0e",
        whisky: "#fe9900",
        tequila: "#a0a19c",
        beige: "#EEE4B1",
        grey1: "#D8D6D7",
        grey2: "#C0BEBF",
        grey3: "#908F8F",
        grey4: "#605F60",
        grey5: "#484748",
        greyMLfilter: "#EDEDED",
        greyVivino: "#fafafa",
        blackup: "#1e1e1e",
        darkred: "#330000",
        darkblue: "#000033",
        darkgreen: "#003300",
        blueGoogle: "#0086f9",
        greenVivino: "#006b4d",
      },
      fontFamily: {
        Lato: ["Lato", "sans-serif"],
        Marcellus: ["Marcellus SC", "sans-serif"],
        Alegreya: ["Alegreya Sans SC", "serif"],
        Lora: ["Lora", "sans-serif"],
        "plus-jakarta-sans": ['"Plus Jakarta Sans"', "sans-serif"],
      },
      spacing: {
        small: "1rem",
        medium: "3.5rem",
        large: "7.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
