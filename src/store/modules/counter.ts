import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// 给 initialState 定义类型 (不定义类型也是会自动推导的)
// 一般情况下面，是对于一些类型(比如联合类型...等特殊类型)，具体的类型推导不出来，才会去使用自定义 initialState 类型的
interface IState {
  counter: number
  message: string
  direction: 'left' | 'right' | 'up' | 'down'
}
const initialState: IState = {
  counter: 999,
  message: 'hello world',
  direction: 'left'
}

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  // ts里面 reducers 配置项必须传
  reducers: {
    // 通过 PayloadAction<string> 泛型，指定 action里面payload 的类型
    changeMessageAction(state, { payload }: PayloadAction<string>) {
      state.message = payload
    }
  }
})

export const { changeMessageAction } = counterSlice.actions
export default counterSlice.reducer
