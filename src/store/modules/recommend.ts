import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  getTopBanner,
  getHotRecommend,
  getNewAlbum
} from '@/service/modules/recommend'

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

// 新碟上架 (结合reducers一起使用)
export const fetchNewAlbumAction = createAsyncThunk(
  'album',
  async (payload, { dispatch }) => {
    const res = await getNewAlbum()
    dispatch(changeNewAlbumAction(res.albums))
  }
)

interface IRecommendState {
  banners: any[]
  hotRecommends: any[]
  newAlbums: any[]
}
const initialState: IRecommendState = {
  banners: [],
  hotRecommends: [],
  newAlbums: []
}

const recommendSlice = createSlice({
  name: 'recommend',
  initialState,
  reducers: {
    changeHotRecommendAction(state, { payload }) {
      state.hotRecommends = payload
    },
    changeNewAlbumAction(state, { payload }) {
      state.newAlbums = payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBannerAction.fulfilled, (state, { payload }) => {
      state.banners = payload
    })
  }
})

const { changeHotRecommendAction, changeNewAlbumAction } =
  recommendSlice.actions
export default recommendSlice.reducer
