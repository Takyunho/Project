module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    '@electron-toolkit',
    '@electron-toolkit/eslint-config-prettier',
    // 추가
    'plugin:prettier/recommended',
    'plugin:react-hooks/recommended',
    'prettier'
  ],
  plugins: ['react', 'prettier', 'react-refresh'],
  rules: {
    'react/prop-types': 'off', // prop-types를 사용하지 않을 경우
    'prettier/prettier': [
      'error',
      {
        arrowParens: 'avoid'
      }
    ]
  }
}
