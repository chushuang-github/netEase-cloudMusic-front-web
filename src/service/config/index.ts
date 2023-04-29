// 环境变量区分
// 方式一：
// export const BASE_URL = 'http://codercba.com:9002'
// export const BASE_URL = 'http://codercba.prod:9002'

// 方式二：
// let BASE_URL = ''
// if (process.env.NODE_ENV === 'development') {
//   BASE_URL = 'http://codercba.com:9002'
// } else {
//   BASE_URL = 'http://codercba.prod:9002'
// }
// export { BASE_URL }

// 方式三：配置文件 .env.development  .env.production
// 配置文件里面的变量名必须要以 REACT_APP_ 开头
const BASE_URL = process.env.REACT_APP_BASE_URL
const TIME_OUT = 10000

export { BASE_URL, TIME_OUT }
