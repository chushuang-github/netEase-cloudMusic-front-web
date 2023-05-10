import React, { memo } from 'react'
import type { ReactNode } from 'react'
import UserHeader from '@/components/user-header'
import { HotAnchorWrapper } from './style'

interface IProps {
  children?: ReactNode
}

const HotAnchor: React.FC<IProps> = () => {
  return (
    <HotAnchorWrapper>
      <UserHeader title="热门主播" />
    </HotAnchorWrapper>
  )
}

export default memo(HotAnchor)
