/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx,jsx}"],
  theme: {
    extend: {
      height: {
        '1/3': '33.333333%'}
    },
  },
  plugins: [
      require('daisyui')
  ],
  daisyui: {
    themes: ["light"], // 다크 모드 비활성화를 위해 'light' 테마만 적용
  },
}

