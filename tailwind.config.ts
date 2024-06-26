import type { Config } from "tailwindcss";

const {
  iconsPlugin,
  getIconCollections,
} = require("@egoist/tailwindcss-icons");

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    iconsPlugin({
      // 利用したい icon collection を利用する
      // https://icones.js.org/
      collections: getIconCollections(["fa6-solid", "ep"]),
    }),
  ],
};
export default config;
