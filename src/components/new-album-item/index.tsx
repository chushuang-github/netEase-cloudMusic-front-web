import React, { memo } from 'react'
import type { ReactNode } from 'react'
import { NewAlbumItemWrapper } from './style'
import { getImageSize } from '@/utils/format'

interface IProps {
  children?: ReactNode
  itemData?: any
}

const NewAlbumItem: React.FC<IProps> = (props) => {
  const { itemData = {} } = props

  return (
    <NewAlbumItemWrapper>
      <div className="album-image">
        <img src={getImageSize(itemData.picUrl, 100)} alt="" />
        <a className="cover sprite_cover" href=""></a>
      </div>
      <div className="album-info">
        <div className="name ellipsis-text-1">{itemData.name}</div>
        <div className="artist ellipsis-text-1">{itemData.artist.name}</div>
      </div>
    </NewAlbumItemWrapper>
  )
}

export default memo(NewAlbumItem)
