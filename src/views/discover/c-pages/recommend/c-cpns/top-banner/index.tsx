import React, { memo, useRef, useState } from 'react'
import type { ReactNode, ElementRef } from 'react'
import {
  TopBannerWrapper,
  TopBannerLeft,
  TopBannerRight,
  TopBannerControl
} from './style'
import { useAppSelector, shallowEqualApp } from '@/store'
import { Carousel } from 'antd'
import classNames from 'classnames'

interface IProps {
  children?: ReactNode
}

const TopBanner: React.FC<IProps> = () => {
  const { banners } = useAppSelector(
    (state) => ({
      banners: state.recommend.banners
    }),
    shallowEqualApp
  )

  // 事件处理函数
  // react里面获取组件的类型 (ElementRef表示是一个组件类型，再通过泛型指定组件的具体类型)
  const bannerRef = useRef<ElementRef<typeof Carousel>>(null)
  const handlePrevClick = () => {
    bannerRef.current?.prev()
  }
  const handleNextClick = () => {
    bannerRef.current?.next()
  }

  const [currentIndex, setCurrentIndex] = useState(0)
  const handleAfterChange = (index: number) => {
    setCurrentIndex(index)
  }
  const handleBeforeChange = (from: number, to: number) => {
    setCurrentIndex(to)
  }

  // 点击指示器
  const handleClickBanner = (index: number) => {
    bannerRef.current?.goTo(index)
  }

  // 获取背景图片
  let bgImageUrl = ''
  if (currentIndex >= 0 && banners.length) {
    bgImageUrl = banners[currentIndex]?.imageUrl + '?imageView&blur=40x20'
  }

  return (
    <TopBannerWrapper bgImageUrl={bgImageUrl}>
      <div className="banner wrap-v2">
        <TopBannerLeft>
          <Carousel
            autoplay
            autoplaySpeed={5000}
            ref={bannerRef}
            effect="fade"
            dots={false}
            beforeChange={handleBeforeChange}
            afterChange={handleAfterChange}
          >
            {banners.map((item) => {
              return (
                <div className="item" key={item.imageUrl}>
                  <img
                    className="image"
                    src={item.imageUrl}
                    alt={item.typeTitle}
                  />
                </div>
              )
            })}
          </Carousel>
          {/* 自定义轮播图指示器 */}
          <ul className="dots">
            {banners.map((item, index) => {
              return (
                <li key={index}>
                  <span
                    className={classNames('item', {
                      active: currentIndex === index
                    })}
                    onClick={() => handleClickBanner(index)}
                  ></span>
                </li>
              )
            })}
          </ul>
        </TopBannerLeft>
        <TopBannerRight></TopBannerRight>
        <TopBannerControl>
          <button
            className="btn left"
            onClick={() => handlePrevClick()}
          ></button>
          <button
            className="btn right"
            onClick={() => handleNextClick()}
          ></button>
        </TopBannerControl>
      </div>
    </TopBannerWrapper>
  )
}

export default memo(TopBanner)
