import React, { memo } from 'react'
import type { ReactNode } from 'react'
import UserHeader from '@/components/user-header'
import { SettleSingerWrapper } from './style'

interface IProps {
  children?: ReactNode
}

const SettleSinger: React.FC<IProps> = () => {
  return (
    <SettleSingerWrapper>
      <UserHeader
        title="入驻歌手"
        moreText="查看全部"
        moreLink="/discover/artist"
      />
    </SettleSingerWrapper>
  )
}

export default memo(SettleSinger)
