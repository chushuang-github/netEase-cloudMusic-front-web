import React, { memo, useState, useRef, useEffect } from 'react'
import type { ReactNode } from 'react'
import {
  AppPlayerBarWrapper,
  BarControl,
  BarPlayInfo,
  BarOperator
} from './style'
import { Slider, message, Tooltip } from 'antd'
import { useAppSelector, useAppDispatch, shallowEqualApp } from '@/store'
import {
  changeLyricIndexAction,
  changePlayModeAction,
  changeMusicAction
} from '@/store/modules/player'
import { getImageSize } from '@/utils/format'
import { formatTime, getSongPlayUrl } from '@/utils/handle-player'

interface IProps {
  children?: ReactNode
}

const playModeList = ['顺序播放', '随机播放', '单曲循环']

const AppPlayerBar: React.FC<IProps> = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [progress, setProgress] = useState<number>(0)
  const [duration, setDuration] = useState<number>(0)
  const [currentTime, setCurrentTime] = useState<number>(0)
  const [isSliding, setIsSliding] = useState<boolean>(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const dispatch = useAppDispatch()
  const { currentSong, lyrics, lyricIndex, playMode } = useAppSelector(
    (state) => ({
      currentSong: state.player.currentSong,
      lyrics: state.player.lyrics,
      lyricIndex: state.player.lyricIndex,
      playMode: state.player.playMode
    }),
    shallowEqualApp
  )

  useEffect(() => {
    // 1. 播放音乐
    audioRef.current!.src = getSongPlayUrl(currentSong.id)
    audioRef.current
      ?.play()
      .then(() => {
        console.log('歌曲播放成功')
        setIsPlaying(true)
      })
      .catch(() => {
        setIsPlaying(false)
        console.log('歌曲播放失败')
      })

    // 2. 获取音乐总时长
    setDuration(currentSong.dt)
  }, [currentSong])

  // 音乐播放/暂停按钮点击
  const handlePlayBtnClick = () => {
    // 1. 控制音乐播放/暂停
    isPlaying
      ? audioRef.current?.pause()
      : audioRef.current?.play().catch(() => setIsPlaying(false))

    // 2. 改变isPlaying状态
    setIsPlaying(!isPlaying)
  }

  // 上一首/下一首
  const handleChangeMusic = (isNext = true) => {
    dispatch(changeMusicAction(isNext))
  }

  // 歌曲播放进度改变的回调
  const handleTimeUpdate = () => {
    // 1. 获取当前时间
    const currentTime = audioRef.current!.currentTime * 1000
    if (!isSliding) {
      // 2. 计算当前歌曲进度
      const progress = (currentTime / duration) * 100
      setProgress(progress)
      setCurrentTime(currentTime)
    }

    // 3. 歌词匹配
    let index = lyrics.length - 1
    for (let i = 0; i < lyrics.length; i++) {
      const lyric = lyrics[i]
      if (lyric.time > currentTime) {
        index = i - 1
        break
      }
    }

    // 4. 匹配上歌词索引
    if (lyricIndex === index || index === -1) return
    dispatch(changeLyricIndexAction(index))

    // 5. 展示歌词
    message.open({
      content: lyrics[index].text,
      // key相同,就会去卸载上一次的提示
      key: 'lyric',
      duration: 0
    })
  }

  // 歌曲自动播放完毕
  const handleTimeEnded = () => {
    if (playMode === 2) {
      // 单曲循环
      audioRef.current!.currentTime = 0
      audioRef.current?.play()
    } else {
      // 不是单曲循环
      handleChangeMusic(true)
    }
  }

  // 进度条变化歌曲播放到对应位置
  // 点击进度条
  const handleSliderChanged = (value: number) => {
    // 1. 获取点击位置的时间
    const currentTime = (value / 100) * duration

    // 2. 设置当前播放的时间 (给audio设置时间的时候，单位是秒)
    // 设置currentTime，音乐会自动播放currentTime时间对应的音乐
    audioRef.current!.currentTime = currentTime / 1000
    setProgress(value)
    setCurrentTime(currentTime)
    setIsSliding(false)
  }

  // 拖拽进度条
  const handleSliderChanging = (value: number) => {
    // 拖拽的时候，改变当前时间
    const currentTime = (value / 100) * duration
    setCurrentTime(currentTime)
    // 进度条处于拖拽状态
    setIsSliding(true)
    setProgress(value)
  }

  // 切换播放模式
  const changePlayMode = () => {
    let newPlayMode = playMode + 1
    if (newPlayMode > 2) newPlayMode = 0
    dispatch(changePlayModeAction(newPlayMode))
  }

  return (
    <AppPlayerBarWrapper className="sprite_playbar">
      <div className="content wrap-v2">
        <BarControl isPlaying={isPlaying}>
          <button
            className="sprite_playbar prev"
            onClick={() => handleChangeMusic(false)}
          ></button>
          <button
            className="sprite_playbar play"
            onClick={handlePlayBtnClick}
          ></button>
          <button
            className="sprite_playbar next"
            onClick={() => handleChangeMusic(true)}
          ></button>
        </BarControl>
        <BarPlayInfo>
          <img
            className="image"
            src={getImageSize(currentSong?.al?.picUrl, 50)}
            alt=""
          />
          <div className="info">
            <div className="song">
              <span>{currentSong.name}</span>
              <span className="singer-name">{currentSong?.ar?.[0]?.name}</span>
            </div>
            <div className="progress">
              <Slider
                value={progress}
                step={0.2}
                tooltip={{ formatter: null }}
                onAfterChange={handleSliderChanged}
                onChange={handleSliderChanging}
              />
              <div className="time">
                <span className="current">{formatTime(currentTime)}</span>
                <span className="divider">/</span>
                <span className="duration">{formatTime(duration)}</span>
              </div>
            </div>
          </div>
        </BarPlayInfo>
        <BarOperator playMode={playMode}>
          <div className="left">
            <button className="btn pip"></button>
            <button className="btn sprite_playbar favor"></button>
            <button className="btn sprite_playbar share"></button>
          </div>
          <div className="right sprite_playbar">
            <button className="btn sprite_playbar volume"></button>
            <Tooltip title={playModeList[playMode]}>
              <button
                className="btn sprite_playbar loop"
                onClick={changePlayMode}
              ></button>
            </Tooltip>
            <button className="btn sprite_playbar playlist"></button>
          </div>
        </BarOperator>
      </div>
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleTimeEnded}
      />
    </AppPlayerBarWrapper>
  )
}

export default memo(AppPlayerBar)
