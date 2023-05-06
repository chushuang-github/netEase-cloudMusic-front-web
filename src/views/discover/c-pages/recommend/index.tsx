import React, { memo, useEffect } from 'react'
import type { ReactNode } from 'react'
import { useAppDispatch } from '@/store'
import {
  fetchBannerAction,
  fetchHotRecommendAction,
  fetchDataAction
} from '@/store/modules/recommend'
import TopBanner from './c-cpns/top-banner'
import TopRecommend from './c-cpns/hot-recommend'
import TopRanking from './c-cpns/top-ranking'
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
    dispatch(fetchDataAction())
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
          {/* 榜单 */}
          <TopRanking />
        </RecommendLeft>
        <RecommendRight></RecommendRight>
      </RecommendContent>
    </RecommendWrapper>
  )
}

export default memo(Recommend)
