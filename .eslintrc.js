// react脚手架拉下来的项目里面，默认没有eslint配置文件
// 我们可以 npm install eslint -D，下载一个eslint插件
// 然后在执行 npx eslint --init 指令，自动进行eslint配置文件的生成
module.exports = {
  env: {
    browser: true,
    es2021: true,
    // 表示我们代码也可以跑在 node 环境下面
    // 不进行下面的配置，上面的 module.exports 这段代码会报eslint错误
    // craco.config.js文件里面使用 module.exports 和 __dirname 也会报错
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    // 在.eslintrc.js文件中添加这个配置：添加prettier插件
    'plugin:prettier/recommended'
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-ts-comment': 'off'
  }
}
