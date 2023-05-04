import React, { memo, useEffect } from 'react'
import type { ReactNode } from 'react'
import { useAppDispatch } from '@/store'
import { fetchBannerAction } from '@/store/modules/recommend'
import TopBanner from './c-cpns/top-banner'

interface IProps {
  children?: ReactNode
}

const Recommend: React.FC<IProps> = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchBannerAction())
  }, [])

  return (
    <div>
      <TopBanner />
    </div>
  )
}

export default memo(Recommend)
