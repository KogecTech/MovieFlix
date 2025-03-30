module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0D0D0D",  // dark background
        card: "#1F1F1F",        // card background
        accent: "#F5C518",      // accent (like TMDB's yellow)
        textPrimary: "#FFFFFF", // main text color
        textSecondary: "#B3B3B3", // muted text
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // a modern sans-serif
      },
      boxShadow: {
        card: "0 4px 12px rgba(0, 0, 0, 0.3)",
      },
      borderRadius: {
        xl: "1rem",
      },
      transitionProperty: {
        transform: "transform",
      },
    },
  },
  plugins: [],
};
