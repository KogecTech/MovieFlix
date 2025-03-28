module.exports = {
    content: [
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: "#1c1e21", // dark tone like TMDB
          accent: "#f5c518",  // a golden accent (TMDB yellow)
        },
        backgroundImage: {
          'hero-gradient': 'linear-gradient(90deg, #3b82f6, #8b5cf6)', // a blue-to-purple gradient similar to gradific
        },
      },
    },
    plugins: [],
  };
  