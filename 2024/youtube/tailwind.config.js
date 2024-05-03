/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      //! 내가 원하는 색상 지정가능
      colors: {
        brand: '#FF0000', // 브랜드 색상 지정하기
      }
    },
  },
  plugins: [],
};

