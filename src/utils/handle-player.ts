// 获取歌曲播放的url
export function getSongPlayUrl(id: number) {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`
}

// 歌词时间格式化
export function formatTime(time: number) {
  // 1. 将毫秒转换成秒钟
  const timeSeconds = time / 1000
  // 2. 获取分钟
  const minue = Math.floor(timeSeconds / 60)
  // 3. 获取秒钟
  const second = Math.floor(timeSeconds) % 60

  return `${String(minue).padStart(2, '0')}:${String(second).padStart(2, '0')}`
}
