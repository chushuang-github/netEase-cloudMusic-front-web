import React, { memo } from 'react'
import type { ReactNode } from 'react'
import { NavBarWrapper } from './style'
import { discoverMenu } from '@/assets/data/local_data'
import { NavLink } from 'react-router-dom'

interface IProps {
  children?: ReactNode
}

const NavBar: React.FC<IProps> = () => {
  return (
    <NavBarWrapper>
      <div className="nav wrap-v1">
        {discoverMenu.map((item) => {
          return (
            <div className="item" key={item.title}>
              <NavLink
                className={({ isActive }) => (isActive ? 'active' : '')}
                to={item.link}
              >
                {item.title}
              </NavLink>
            </div>
          )
        })}
      </div>
    </NavBarWrapper>
  )
}

export default memo(NavBar)
