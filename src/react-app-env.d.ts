/// <reference types="react-scripts" />

// 扩展一些自己的变量：按住ctrl键，鼠标点击上面的 types 链接，就能看见react给我们提供的类型(在此基础上面扩展一些类型)
// 下面就是给 process.env 扩展一个 REACT_APP_BASE_URL 变量
declare namespace NodeJS {
  // 多个同名的接口，熟悉是会合并的
  interface ProcessEnv {
    readonly REACT_APP_BASE_URL: string
  }
}
