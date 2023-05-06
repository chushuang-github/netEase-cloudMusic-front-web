import React, { memo } from 'react'
import type { ReactNode } from 'react'
import { TopRankingItemWrapper } from './style'
import { getImageSize } from '@/utils/format'

interface IProps {
  children?: ReactNode
  itemData: any
}

const TopRankingItem: React.FC<IProps> = (props) => {
  const { itemData } = props
  const { tracks = [] } = itemData

  return (
    <TopRankingItemWrapper>
      <div className="header">
        <div className="image">
          <img src={getImageSize(itemData.coverImgUrl, 80)} alt="" />
          <a href="" className="image_cover"></a>
        </div>
        <div className="info">
          <div className="name">{itemData.name}</div>
          <div>
            <button className="sprite_02 btn play"></button>
            <button className="sprite_02 btn favor"></button>
          </div>
        </div>
      </div>
      <div className="list">
        {tracks.slice(0, 10).map((item: any, index: number) => {
          return (
            <div key={item.id} className="list-item">
              <div className="rank">{index + 1}</div>
              <div className="info">
                <div className="name">{item.name}</div>
                <div className="operator">
                  <button className="sprite_02 btn play"></button>
                  <button className="sprite_icon2 btn add"></button>
                  <button className="sprite_02 btn favor"></button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className="footer">
        <a href="">查看全部 &gt;</a>
      </div>
    </TopRankingItemWrapper>
  )
}

export default memo(TopRankingItem)
