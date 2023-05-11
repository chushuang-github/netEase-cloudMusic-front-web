import React, { memo } from 'react'
import type { ReactNode } from 'react'
import {
  AppPlayerBarWrapper,
  BarControl,
  BarPlayInfo,
  BarOperator
} from './style'
import { Slider } from 'antd'

interface IProps {
  children?: ReactNode
}

const AppPlayerBar: React.FC<IProps> = () => {
  return (
    <AppPlayerBarWrapper className="sprite_playbar">
      <div className="content wrap-v2">
        <BarControl isPlaying={true}>
          <button className="sprite_playbar prev"></button>
          <button className="sprite_playbar play"></button>
          <button className="sprite_playbar next"></button>
        </BarControl>
        <BarPlayInfo>
          <img
            className="image"
            src="http://s4.music.126.net/style/web2/img/default/default_album.jpg"
            alt=""
          />
          <div className="info">
            <div className="song">
              <span>日落大道</span>
              <span className="singer-name">梁博</span>
            </div>
            <div className="progress">
              <Slider />
              <div className="time">
                <span className="current">00:52</span>
                <span className="divider">/</span>
                <span className="duration">04:35</span>
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
    </AppPlayerBarWrapper>
  )
}

export default memo(AppPlayerBar)
