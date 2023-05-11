import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  getTopBanner,
  getHotRecommend,
  getNewAlbum,
  getPlayListDetail,
  getArtistList
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

// 新碟上架/榜单 (多个请求一起发送)
// const rankingIds =  [飙升榜, 热歌榜, 原创榜]
const rankingIds = [19723756, 3778678, 2884035]
export const fetchDataAction = createAsyncThunk(
  'fetchData',
  (payload, { dispatch }) => {
    // 新碟上架
    getNewAlbum().then((res) => {
      dispatch(changeNewAlbumAction(res.albums))
    })

    // 榜单
    // 新歌榜id=3779629  原创榜id=2884035  飙升榜id=19723756  热歌榜id=3778678
    const promises: Promise<any>[] = []
    for (const id of rankingIds) {
      promises.push(getPlayListDetail(id))
    }
    Promise.all(promises).then((res) => {
      const playlist = res.map((item) => item.playlist)
      dispatch(changeRankingsAction(playlist))
    })

    // 热门歌手
    getArtistList(5).then((res) => {
      dispatch(changeSingersAction(res.artists))
    })
  }
)

interface IRecommendState {
  banners: any[]
  hotRecommends: any[]
  newAlbums: any[]
  rankings: any[]
  singers: any[]
}
const initialState: IRecommendState = {
  banners: [],
  hotRecommends: [],
  newAlbums: [],
  rankings: [],
  singers: []
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
    },
    changeRankingsAction(state, { payload }) {
      state.rankings = payload
    },
    changeSingersAction(state, { payload }) {
      state.singers = payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBannerAction.fulfilled, (state, { payload }) => {
      state.banners = payload
    })
  }
})

const {
  changeHotRecommendAction,
  changeNewAlbumAction,
  changeRankingsAction,
  changeSingersAction
} = recommendSlice.actions
export default recommendSlice.reducer
