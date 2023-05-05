import React, { memo } from 'react'
import type { ReactNode } from 'react'
import { SongsItemWrapper } from './style'
import { formatCount, getImageSize } from '@/utils/format'

interface IProps {
  children?: ReactNode
  itemData: any
}

const SongsItem: React.FC<IProps> = (props) => {
  const { itemData = {} } = props

  return (
    <SongsItemWrapper>
      <div className="cover-top">
        <img src={getImageSize(itemData.picUrl, 140)} alt="" />
        <div className="cover sprite_cover">
          <div className="info sprite_cover">
            <span>
              <i className="sprite_icon headset"></i>
              <span>{formatCount(itemData.playCount)}</span>
            </span>
            <i className="sprite_icon play"></i>
          </div>
        </div>
      </div>
      <div className="cover-bottom ellipsis-text-2">{itemData.name}</div>
    </SongsItemWrapper>
  )
}

export default memo(SongsItem)
