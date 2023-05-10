import React, { memo } from 'react'
import type { ReactNode } from 'react'
import { UserHeaderWrapper } from './style'

interface IProps {
  children?: ReactNode
  title?: string
  moreText?: string
  moreLink?: string
}

const UserHeader: React.FC<IProps> = (props) => {
  const { title = '默认标题', moreText, moreLink } = props

  return (
    <UserHeaderWrapper>
      <h3>{title}</h3>
      {moreText && moreLink && <a href={moreLink}>{moreText} &gt;</a>}
    </UserHeaderWrapper>
  )
}

export default memo(UserHeader)
