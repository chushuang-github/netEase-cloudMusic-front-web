import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getSongDetail, getSongLyric } from '@/service/modules/player'
import { ILyric, parseLyric } from '@/utils/parse-lyric'

export const fetchCurrentSongAction = createAsyncThunk(
  'currentSong',
  (id: number, { dispatch }) => {
    // 1.获取歌曲信息
    getSongDetail(id).then((res) => {
      if (!res.songs.length) return
      dispatch(changeCurrentSongAction(res.songs[0]))
    })

    // 2.获取歌词信息
    getSongLyric(id).then((res) => {
      const lyricString = res.lrc.lyric
      const lyrics = parseLyric(lyricString)
      dispatch(changeLyricsAction(lyrics))
    })
  }
)

// 给 initialState 定义类型 (不定义类型也是会自动推导的)
// 一般情况下面，是对于一些类型(比如联合类型...等特殊类型)，具体的类型推导不出来，才会去使用自定义 initialState 类型的
interface IState {
  currentSong: any
  lyrics: ILyric[]
  lyricIndex: number
}
const initialState: IState = {
  currentSong: {},
  lyrics: [],
  lyricIndex: -1
}

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    changeCurrentSongAction(state, { payload }) {
      state.currentSong = payload
    },
    changeLyricsAction(state, { payload }) {
      state.lyrics = payload
    },
    changeLyricIndexAction(state, { payload }) {
      state.lyricIndex = payload
    }
  }
})

export const {
  changeCurrentSongAction,
  changeLyricsAction,
  changeLyricIndexAction
} = playerSlice.actions
export default playerSlice.reducer
