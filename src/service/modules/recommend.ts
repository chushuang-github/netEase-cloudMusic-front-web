import hyRequest from '@/service'

// 轮播图
export function getTopBanner() {
  return hyRequest.get({
    url: '/banner'
  })
}

// 热门推荐
export function getHotRecommend(limit = 8) {
  return hyRequest.get({
    url: '/personalized',
    params: {
      limit
    }
  })
}

// 新碟上架
export function getNewAlbum(offset = 0, limit = 10) {
  return hyRequest.get({
    url: '/album/new',
    params: {
      offset,
      limit
    }
  })
}

// 榜单
export function getPlayListDetail(id: number) {
  return hyRequest.get({
    url: '/playlist/detail',
    params: {
      id
    }
  })
}
