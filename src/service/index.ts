import { BASE_URL, TIME_OUT } from './config'
import HYRequest from './request'

// 服务器返回的json数据，可以通过下面的网址，将json数据转化为ts里面类型的数据
// https://transform.tools/json-to-typescript

const hyRequest = new HYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestSuccessFn: (config) => {
      return config
    }
  }
})

export default hyRequest
