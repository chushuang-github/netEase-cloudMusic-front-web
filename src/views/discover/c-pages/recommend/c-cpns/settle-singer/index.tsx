import React, { memo } from 'react'
import type { ReactNode } from 'react'
import UserHeader from '@/components/user-header'
import { useAppSelector, shallowEqualApp } from '@/store'
import { SettleSingerWrapper } from './style'
import { getImageSize } from '@/utils/format'

interface IProps {
  children?: ReactNode
}

const SettleSinger: React.FC<IProps> = () => {
  const { singers } = useAppSelector(
    (state) => ({
      singers: state.recommend.singers
    }),
    shallowEqualApp
  )

  return (
    <SettleSingerWrapper>
      <UserHeader
        title="入驻歌手"
        moreText="查看全部"
        moreLink="/discover/artist"
      />
      <div className="singer-list">
        {singers.map((item) => {
          return (
            <a className="item" href="/discover/artist" key={item.id}>
              <img src={getImageSize(item.picUrl, 80)} alt="" />
              <div className="info">
                <div className="name">{item.name}</div>
                <div className="alias">{item.alias.join(' ')}</div>
              </div>
            </a>
          )
        })}
      </div>
      <div className="apply-for">
        <a href="/">申请成为网易音乐人</a>
      </div>
    </SettleSingerWrapper>
  )
}

export default memo(SettleSinger)
