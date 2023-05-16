import React, { Suspense, useEffect } from 'react'
import { useRoutes } from 'react-router-dom'
import routes from './router'
import AppHeader from './components/app-header'
import AppFooter from './components/app-footer'
import AppPlayerBar from './components/app-player-bar'
import { fetchCurrentSongAction } from './store/modules/player'
import { useAppDispatch } from './store'

function App() {
  // 获取一首喜欢的歌曲
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchCurrentSongAction(2046990697))
  }, [])

  return (
    <div className="app">
      <AppHeader />
      <Suspense fallback="">
        <div className="main">{useRoutes(routes)}</div>
      </Suspense>
      <AppFooter />

      {/* 音乐播放栏 */}
      <AppPlayerBar />
    </div>
  )
}

export default App
