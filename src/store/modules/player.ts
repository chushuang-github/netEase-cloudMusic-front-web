import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getSongDetail, getSongLyric } from '@/service/modules/player'
import { ILyric, parseLyric } from '@/utils/parse-lyric'
import type { IRootState } from '@/store'

// createAsyncThunk<第二个参数函数的返回值类型, 第二个参数函数的第一个参数类型，第二个参数函数的第二个参数类型>
export const fetchCurrentSongAction = createAsyncThunk<
  void,
  number,
  { state: IRootState }
>('currentSong', (id, { dispatch, getState }) => {
  // 准备播放某一首歌曲时
  // 首先从歌曲列表中，看能否获取到歌曲的信息
  const playSongList = getState().player.playSongList
  const findIndex = playSongList.findIndex((item) => item.id === id)
  if (findIndex === -1) {
    // 1.获取歌曲信息
    getSongDetail(id).then((res) => {
      if (!res.songs.length) return
      const song = res.songs[0]
      const newPlaySongList = [...playSongList, song]
      dispatch(changeCurrentSongAction(song))
      dispatch(changeplaySongListAction(newPlaySongList))
      dispatch(changePlaySongIndexAction(newPlaySongList.length - 1))
    })
  } else {
    const song = playSongList[findIndex]
    dispatch(changeCurrentSongAction(song))
    dispatch(changePlaySongIndexAction(findIndex))
  }

  // 2.获取歌词信息
  getSongLyric(id).then((res) => {
    const lyricString = res.lrc.lyric
    const lyrics = parseLyric(lyricString)
    dispatch(changeLyricsAction(lyrics))
  })
})

export const changeMusicAction = createAsyncThunk<
  void,
  boolean,
  { state: IRootState }
>('changeMusic', (isNext, { dispatch, getState }) => {
  // 获取数据
  const player = getState().player
  const playMode = player.playMode
  const songIndex = player.playSongIndex
  const songList = player.playSongList

  // 根据不同的播放模式，计算下一首播放音乐的索引
  let newIndex = songIndex
  if (playMode === 1) {
    // 随机播放
    newIndex = Math.floor(Math.random() * songList.length)
  } else {
    // 单曲循环(只有在一首歌曲自动播放完毕，单曲循环才有用) 和 顺序播放
    newIndex = isNext ? songIndex + 1 : songIndex - 1
    if (newIndex > songList.length - 1) newIndex = 0
    if (newIndex < 0) newIndex = songList.length - 1
  }

  // 单曲要播放的歌曲
  const song = songList[newIndex]
  dispatch(changeCurrentSongAction(song))
  dispatch(changePlaySongIndexAction(newIndex))

  // 获取歌词信息
  getSongLyric(song.id).then((res) => {
    const lyricString = res.lrc.lyric
    const lyrics = parseLyric(lyricString)
    dispatch(changeLyricsAction(lyrics))
  })
})

// 给 initialState 定义类型 (不定义类型也是会自动推导的)
// 一般情况下面，是对于一些类型(比如联合类型...等特殊类型)，具体的类型推导不出来，才会去使用自定义 initialState 类型的
interface IState {
  currentSong: any
  lyrics: ILyric[]
  lyricIndex: number
  playSongList: any[]
  playSongIndex: number
  playMode: number
}
const initialState: IState = {
  currentSong: {},
  lyrics: [],
  lyricIndex: -1,
  playSongList: [
    {
      name: '起风了',
      id: 1330348068,
      pst: 0,
      t: 0,
      ar: [
        {
          id: 12085562,
          name: '买辣椒也用券',
          tns: [],
          alias: []
        }
      ],
      alia: ['原曲：《ヤキモチ》—高桥优'],
      pop: 100,
      st: 0,
      rt: '',
      fee: 8,
      v: 43,
      crbt: null,
      cf: '',
      al: {
        id: 74715426,
        name: '起风了',
        picUrl:
          'https://p1.music.126.net/diGAyEmpymX8G7JcnElncQ==/109951163699673355.jpg',
        tns: [],
        pic_str: '109951163699673355',
        pic: 109951163699673360
      },
      dt: 325868,
      h: {
        br: 320000,
        fid: 0,
        size: 13037236,
        vd: -77525,
        sr: 44100
      },
      m: {
        br: 192000,
        fid: 0,
        size: 7822359,
        vd: -74987,
        sr: 44100
      },
      l: {
        br: 128000,
        fid: 0,
        size: 5214920,
        vd: -73504,
        sr: 44100
      },
      sq: {
        br: 985873,
        fid: 0,
        size: 40158105,
        vd: -77508,
        sr: 44100
      },
      hr: {
        br: 2832349,
        fid: 0,
        size: 115371553,
        vd: -77476,
        sr: 88200
      },
      a: null,
      cd: '1',
      no: 1,
      rtUrl: null,
      ftype: 0,
      rtUrls: [],
      djId: 0,
      copyright: 0,
      s_id: 0,
      mark: 536879104,
      originCoverType: 1,
      originSongSimpleData: null,
      tagPicList: null,
      resourceState: true,
      version: 43,
      songJumpInfo: null,
      entertainmentTags: null,
      awardTags: null,
      single: 0,
      noCopyrightRcmd: null,
      cp: 1415923,
      rtype: 0,
      rurl: null,
      mst: 9,
      mv: 10782615,
      publishTime: 1543766400000
    }
  ],
  playSongIndex: 0,
  // 播放模式 0-顺序播放  1-随机播放 2-单曲循环
  playMode: 0
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
    },
    changePlaySongIndexAction(state, { payload }) {
      state.playSongIndex = payload
    },
    changeplaySongListAction(state, { payload }) {
      state.playSongList = payload
    },
    changePlayModeAction(state, { payload }) {
      state.playMode = payload
    }
  }
})

export const {
  changeCurrentSongAction,
  changeLyricsAction,
  changeLyricIndexAction,
  changePlaySongIndexAction,
  changeplaySongListAction,
  changePlayModeAction
} = playerSlice.actions
export default playerSlice.reducer
