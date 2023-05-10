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
import UserLogin from './c-cpns/user-login'
import SettleSinger from './c-cpns/settle-singer'
import HotAnchor from './c-cpns/hot-anchor'
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
        <RecommendRight>
          {/* 用户登录 */}
          <UserLogin />
          {/* 入驻歌手 */}
          <SettleSinger />
          {/* 热门主播 */}
          <HotAnchor />
        </RecommendRight>
      </RecommendContent>
    </RecommendWrapper>
  )
}

export default memo(Recommend)
