import React, { memo, useEffect } from 'react'
import type { ReactNode } from 'react'
import { useAppDispatch } from '@/store'
import {
  fetchBannerAction,
  fetchHotRecommendAction,
  fetchNewAlbumAction
} from '@/store/modules/recommend'
import TopBanner from './c-cpns/top-banner'
import TopRecommend from './c-cpns/hot-recommend'
import NewAlbum from './c-cpns/new-album'
import {
  RecommendWrapper,
  RecommendContent,
  RecommendLeft,
  RecommendRight
} from './style'

interface IProps {
  children?: ReactNode
}

const Recommend: React.FC<IProps> = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchBannerAction())
    dispatch(fetchHotRecommendAction())
    dispatch(fetchNewAlbumAction())
  }, [])

  return (
    <RecommendWrapper>
      <TopBanner />
      <RecommendContent>
        <RecommendLeft>
          {/* 热门推荐 */}
          <TopRecommend />
          {/* 新碟上架 */}
          <NewAlbum />
        </RecommendLeft>
        <RecommendRight></RecommendRight>
      </RecommendContent>
    </RecommendWrapper>
  )
}

export default memo(Recommend)
