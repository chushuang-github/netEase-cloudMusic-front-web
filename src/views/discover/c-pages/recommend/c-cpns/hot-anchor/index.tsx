import React, { memo } from 'react'
import type { ReactNode } from 'react'
import UserHeader from '@/components/user-header'
import { HotAnchorWrapper } from './style'
import { hotRadios } from '@/assets/data/local_data'

interface IProps {
  children?: ReactNode
}

const HotAnchor: React.FC<IProps> = () => {
  return (
    <HotAnchorWrapper>
      <UserHeader title="热门主播" />
      <div className="anchor-list">
        {hotRadios.map((item) => {
          return (
            <div className="item" key={item.picUrl}>
              <a href="/discover/djradio" className="image">
                <img src={item.picUrl} alt="" />
              </a>
              <div className="info">
                <div className="name">{item.name}</div>
                <div className="position">{item.position}</div>
              </div>
            </div>
          )
        })}
      </div>
    </HotAnchorWrapper>
  )
}

export default memo(HotAnchor)
