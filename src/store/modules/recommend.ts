import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getTopBanner, getHotRecommend } from '@/service/modules/recommend'

// 轮播图 (结合extraReducers一起使用)
export const fetchBannerAction = createAsyncThunk('banners', async () => {
  const res = await getTopBanner()
  return res.banners
})

// 热门推荐 (结合reducers一起使用)
export const fetchHotRecommendAction = createAsyncThunk(
  'recommend',
  async (payload, store) => {
    const res = await getHotRecommend()
    store.dispatch(changeHotRecommendAction(res.result))
  }
)

interface IRecommendState {
  banners: any[]
  hotRecommends: any[]
}
const initialState: IRecommendState = {
  banners: [],
  hotRecommends: []
}

const recommendSlice = createSlice({
  name: 'recommend',
  initialState,
  reducers: {
    changeHotRecommendAction(state, { payload }) {
      state.hotRecommends = payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBannerAction.fulfilled, (state, { payload }) => {
      state.banners = payload
    })
  }
})

const { changeHotRecommendAction } = recommendSlice.actions
export default recommendSlice.reducer
