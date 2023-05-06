import React, { lazy } from 'react'
import { Navigate } from 'react-router-dom'
// react路由对象的类型
import type { RouteObject } from 'react-router-dom'

// 引入组件
// 组件懒加载
const Discover = lazy(() => import('@/views/discover'))
const Album = lazy(() => import('@/views/discover/c-pages/album'))
const Artist = lazy(() => import('@/views/discover/c-pages/artist'))
const Djradio = lazy(() => import('@/views/discover/c-pages/djradio'))
const Ranking = lazy(() => import('@/views/discover/c-pages/ranking'))
const Recommend = lazy(() => import('@/views/discover/c-pages/recommend'))
const Songs = lazy(() => import('@/views/discover/c-pages/songs'))

const Mine = lazy(() => import('@/views/mine'))
const Focus = lazy(() => import('@/views/focus'))

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/discover" />
  },
  {
    path: '/discover',
    element: <Discover />,
    children: [
      {
        path: '/discover',
        element: <Navigate to="/discover/recommend" />
      },
      {
        path: '/discover/recommend',
        element: <Recommend />
      },
      {
        path: '/discover/album',
        element: <Album />
      },
      {
        path: '/discover/artist',
        element: <Artist />
      },
      {
        path: '/discover/djradio',
        element: <Djradio />
      },
      {
        path: '/discover/ranking',
        element: <Ranking />
      },
      {
        path: '/discover/songs',
        element: <Songs />
      }
    ]
  },
  {
    path: '/mine',
    element: <Mine />
  },
  {
    path: '/focus',
    element: <Focus />
  }
]

export default routes
