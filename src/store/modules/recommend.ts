import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getTopBanner } from '@/service/modules/recommend'

// 轮播图
export const fetchBannerAction = createAsyncThunk('banners', async () => {
  const res = await getTopBanner()
  return res.banners
})

interface IRecommendState {
  banners: any[]
}
const initialState: IRecommendState = {
  banners: []
}

const recommendSlice = createSlice({
  name: 'recommend',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBannerAction.fulfilled, (state, { payload }) => {
      state.banners = payload
    })
  }
})

export default recommendSlice.reducer
