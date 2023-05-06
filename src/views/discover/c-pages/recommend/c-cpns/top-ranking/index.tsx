import React, { memo } from 'react'
import type { ReactNode } from 'react'
import AreaHeaderV1 from '@/components/area-header-v1'
import TopRankingItem from '@/components/top-ranking-item'
import { useAppSelector, shallowEqualApp } from '@/store'
import { TopRankingWrapper } from './style'

interface IProps {
  children?: ReactNode
}

const TopRanking: React.FC<IProps> = () => {
  const { rankings } = useAppSelector(
    (state) => ({
      rankings: state.recommend.rankings
    }),
    shallowEqualApp
  )

  return (
    <TopRankingWrapper>
      <AreaHeaderV1 title="榜单" moreLink="/discover/ranking" />
      <div className="content">
        {rankings.map((item) => {
          return <TopRankingItem key={item.id} itemData={item} />
        })}
      </div>
    </TopRankingWrapper>
  )
}

export default memo(TopRanking)
