import React, { memo, useRef } from 'react'
import type { ReactNode, ElementRef } from 'react'
import { Carousel } from 'antd'
import AreaHeaderV1 from '@/components/area-header-v1'
import NewAlbumItem from '@/components/new-album-item'
import { useAppSelector, shallowEqualApp } from '@/store'
import { NewAlbumWrapper } from './style'

interface IProps {
  children?: ReactNode
}

const NewAlbum: React.FC<IProps> = () => {
  const { newAlbums } = useAppSelector(
    (state) => ({
      newAlbums: state.recommend.newAlbums
    }),
    shallowEqualApp
  )

  // 事件处理
  // ElementRef<typeof Carousel> ：指定第三方组件库里面组件的类型
  const bannerRef = useRef<ElementRef<typeof Carousel>>(null)
  const handlePrevClick = () => {
    bannerRef.current?.prev()
  }
  const handleNextClick = () => {
    bannerRef.current?.next()
  }

  return (
    <NewAlbumWrapper>
      <AreaHeaderV1 title="新碟上架" moreLink="/discover/album" />
      <div className="content">
        <button
          className="sprite_02 arrow arrow-left"
          onClick={() => handlePrevClick()}
        ></button>
        <div className="banner">
          <Carousel ref={bannerRef} dots={false} speed={1500}>
            {[0, 1].map((item) => {
              return (
                <div className="item" key={item}>
                  <div className="album-list">
                    {newAlbums
                      .slice(item * 5, (item + 1) * 5)
                      .map((album, index) => {
                        return <NewAlbumItem key={index} itemData={album} />
                      })}
                  </div>
                </div>
              )
            })}
          </Carousel>
        </div>
        <button
          className="sprite_02 arrow arrow-right"
          onClick={() => handleNextClick()}
        ></button>
      </div>
    </NewAlbumWrapper>
  )
}

export default memo(NewAlbum)
