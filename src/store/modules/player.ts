import { createSlice } from '@reduxjs/toolkit'

// 给 initialState 定义类型 (不定义类型也是会自动推导的)
// 一般情况下面，是对于一些类型(比如联合类型...等特殊类型)，具体的类型推导不出来，才会去使用自定义 initialState 类型的
interface IState {
  currentSong: any
}
const initialState: IState = {
  currentSong: {
    name: '第三人称',
    id: 502043537,
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
    alia: [],
    pop: 100,
    st: 0,
    rt: null,
    fee: 8,
    v: 37,
    crbt: null,
    cf: '',
    al: {
      id: 36067044,
      name: '第三人称',
      picUrl:
        'https://p1.music.126.net/nOVxBaX0IG1PsV4WfSoodA==/109951164379891919.jpg',
      tns: [],
      pic_str: '109951164379891919',
      pic: 109951164379891920
    },
    dt: 269296,
    h: {
      br: 320000,
      fid: 0,
      size: 10773987,
      vd: -8127,
      sr: 44100
    },
    m: {
      br: 192000,
      fid: 0,
      size: 6464409,
      vd: -5514,
      sr: 44100
    },
    l: {
      br: 128000,
      fid: 0,
      size: 4309621,
      vd: -3804,
      sr: 44100
    },
    sq: null,
    hr: null,
    a: null,
    cd: '01',
    no: 1,
    rtUrl: null,
    ftype: 0,
    rtUrls: [],
    djId: 0,
    copyright: 0,
    s_id: 0,
    mark: 8192,
    originCoverType: 2,
    originSongSimpleData: {
      songId: 27598482,
      name: '第三人称',
      artists: [
        {
          id: 11890,
          name: 'hush！'
        }
      ],
      albumMeta: {
        id: 2643257,
        name: 'X'
      }
    },
    tagPicList: null,
    resourceState: true,
    version: 37,
    songJumpInfo: null,
    entertainmentTags: null,
    awardTags: null,
    single: 0,
    noCopyrightRcmd: null,
    rtype: 0,
    rurl: null,
    mst: 9,
    cp: 1416372,
    mv: 0,
    publishTime: 1503763200000
  }
}

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {}
})

export default playerSlice.reducer
