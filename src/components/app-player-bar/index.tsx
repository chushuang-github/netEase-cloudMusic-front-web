import React, { memo, useState, useRef, useEffect } from 'react'
import type { ReactNode } from 'react'
import {
  AppPlayerBarWrapper,
  BarControl,
  BarPlayInfo,
  BarOperator
} from './style'
import { Slider } from 'antd'
import { useAppSelector, shallowEqualApp } from '@/store'
import { getImageSize } from '@/utils/format'
import { formatTime, getSongPlayUrl } from '@/utils/handle-player'

interface IProps {
  children?: ReactNode
}

const AppPlayerBar: React.FC<IProps> = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [progress, setProgress] = useState<number>(0)
  const [duration, setDuration] = useState<number>(0)
  const [currentTime, setCurrentTime] = useState<number>(0)
  const [isSliding, setIsSliding] = useState<boolean>(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const { currentSong } = useAppSelector(
    (state) => ({
      currentSong: state.player.currentSong
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
  }

  // 进度条变化歌曲播放到对应位置
  // 点击进度条
  const handleSliderChanged = (value: number) => {
    // 1. 获取点击位置的时间
    const currentTime = (value / 100) * duration

    // 2. 设置当前播放的时间 (给audio设置时间的时候，单位是秒)
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

  return (
    <AppPlayerBarWrapper className="sprite_playbar">
      <div className="content wrap-v2">
        <BarControl isPlaying={isPlaying}>
          <button className="sprite_playbar prev"></button>
          <button
            className="sprite_playbar play"
            onClick={handlePlayBtnClick}
          ></button>
          <button className="sprite_playbar next"></button>
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
              <span className="singer-name">{currentSong?.ar[0]?.name}</span>
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
        <BarOperator playMode={0}>
          <div className="left">
            <button className="btn pip"></button>
            <button className="btn sprite_playbar favor"></button>
            <button className="btn sprite_playbar share"></button>
          </div>
          <div className="right sprite_playbar">
            <button className="btn sprite_playbar volume"></button>
            <button className="btn sprite_playbar loop"></button>
            <button className="btn sprite_playbar playlist"></button>
          </div>
        </BarOperator>
      </div>
      <audio ref={audioRef} onTimeUpdate={handleTimeUpdate} />
    </AppPlayerBarWrapper>
  )
}

export default memo(AppPlayerBar)
