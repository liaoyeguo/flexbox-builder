module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities, theme }) {
      let backgroundSize = "7.07px 7.07px";
      let backgroundImage = (color) =>
        `linear-gradient(135deg, ${color} 10%, transparent 10%, transparent 50%, ${color} 50%, ${color} 60%, transparent 60%, transparent 100%)`;
      let colors = Object.entries(theme("backgroundColor")).filter(
        ([, value]) => typeof value === "object" && value[400] && value[500]
      );

      addUtilities(
        Object.fromEntries(
          colors.map(([name, colors]) => {
            let backgroundColor = colors[400] + "1a"; // 10% opacity
            let stripeColor = colors[500] + "80"; // 50% opacity

            return [
              `.bg-stripes-${name}`,
              {
                backgroundColor,
                backgroundImage: backgroundImage(stripeColor),
                backgroundSize,
              },
            ];
          })
        )
      );
    },
    require("@tailwindcss/typography"),
  ],
};
