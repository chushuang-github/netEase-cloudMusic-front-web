import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './modules/counter'
import recommendReducer from './modules/recommend'
import playerReducer from './modules/player'

// 接口函数调用签名
// export interface TypedUseSelectorHook<TState> {
//   <TSelected>(selector: (state: TState) => TSelected, equalityFn?: EqualityFn<NoInfer<TSelected>>): TSelected;
// }
import {
  useSelector,
  useDispatch,
  shallowEqual,
  TypedUseSelectorHook
} from 'react-redux'

const store = configureStore({
  reducer: {
    counter: counterReducer,
    recommend: recommendReducer,
    player: playerReducer
  }
})

// redux 根状态的类型
export type IRootState = ReturnType<typeof store.getState>
// dispatch函数的类型
export type AppDispatch = typeof store.dispatch

// 老师怎么知道的：在官网里面看见的
// redux官网：https://cn.redux.js.org/tutorials/typescript-quick-start
// 封装自己的useSelector，为了避免外界每个组件使用useSelector的时候，都需要引入 IRootState 类型，并且通过泛型方式传入
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector

// dispatch可以直接在组件里面使用官方提供的useDispatch，可以使用我们自己定义的 useAppDispatch 函数
// useDispatch调用的返回值类型就是dispatch函数
export const useAppDispatch: () => AppDispatch = useDispatch

export const shallowEqualApp = shallowEqual

export default store
