import React, { memo } from 'react'
import type { ReactNode } from 'react'

interface IProps {
  children?: ReactNode
}

const AppFooter: React.FC<IProps> = () => {
  return <h1>AppFooter</h1>
}

export default memo(AppFooter)
