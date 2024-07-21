module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    '@electron-toolkit',
    '@electron-toolkit/eslint-config-prettier',
    // 추가
    'plugin:prettier/recommended'
  ],
  plugins: ['react', 'prettier']
}
