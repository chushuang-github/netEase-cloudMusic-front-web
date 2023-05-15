import hyRequest from '@/service'

// 获取歌曲信息
export function getSongDetail(ids: number) {
  return hyRequest.get({
    url: '/song/detail',
    params: {
      ids
    }
  })
}

// 2.获取歌词信息
export function getSongLyric(id: number) {
  return hyRequest.get({
    url: '/lyric',
    params: {
      id
    }
  })
}
