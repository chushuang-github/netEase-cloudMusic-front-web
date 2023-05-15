// 歌词解析
// [00:00.000] 作词 : 许嵩
// [00:01.000] 作曲 : 许嵩
// [00:02.000] 编曲 : 许嵩
// [00:03.000] 制作人 : 许嵩
// [00:22.240]天空好想下雨
// [00:24.380]我好想住你隔壁
// [00:26.810]傻站在你家楼下
// ...

export interface ILyric {
  time: number
  text: string
}

const timeRegExp = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/

export function parseLyric(lyricString: string) {
  // 1.获取一行行的歌词
  const lines: Array<string> = lyricString.split('\n')

  // 2.对每句歌词解析成对象
  const lyrics: Array<ILyric> = []
  for (const line of lines) {
    const result = timeRegExp.exec(line)
    if (!result) continue

    // 获取时间
    const time1 = Number(result[1]) * 60 * 1000
    const time2 = Number(result[2]) * 1000
    const time3 =
      result[3].length === 3 ? Number(result[3]) : Number(result[3]) * 10
    const time = time1 + time2 + time3

    // 获取歌词
    const text = line.replace(timeRegExp, '')
    if (text) {
      lyrics.push({ time, text })
    }
  }

  return lyrics
}
