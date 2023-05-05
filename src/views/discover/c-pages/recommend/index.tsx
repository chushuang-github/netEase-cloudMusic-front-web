import React, { memo, useEffect } from 'react'
import type { ReactNode } from 'react'
import { useAppDispatch } from '@/store'
import {
  fetchBannerAction,
  fetchHotRecommendAction
} from '@/store/modules/recommend'
import TopBanner from './c-cpns/top-banner'
import TopRecommend from './c-cpns/hot-recommend'
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
  }, [])

  return (
    <RecommendWrapper>
      <TopBanner />
      <RecommendContent>
        <RecommendLeft>
          <TopRecommend />
        </RecommendLeft>
        <RecommendRight></RecommendRight>
      </RecommendContent>
    </RecommendWrapper>
  )
}

export default memo(Recommend)
