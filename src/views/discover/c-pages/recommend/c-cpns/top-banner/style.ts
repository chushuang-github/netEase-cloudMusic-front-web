import styled from 'styled-components'

// styled-components接受参数，并且指定参数的类型
interface IBannerProps {
  bgImageUrl: string
}
export const TopBannerWrapper = styled.div<IBannerProps>`
  /* /斜杠前面是设置图片的位置-background-position，/斜杆后面是设置图片的大小-background-size */
  /* background: url('https://p1.music.126.net/eoi5wwOAhAAg2yo1EyTLIw==/109951168589526192.jpg?imageView&blur=40x20')
    center center / 6000px; */
  background: url(${(props) => props.bgImageUrl}) center center / 6000px;

  .banner {
    position: relative;
    display: flex;
    height: 270px;
  }
`

export const TopBannerLeft = styled.div`
  position: relative;
  width: 730px;

  .item {
    overflow: hidden;
    height: 270px;
    .image {
      width: 100%;
    }
  }

  .dots {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    display: flex;
    justify-content: center;

    > li {
      margin: 0 2px;

      .item {
        display: inline-block;
        width: 20px;
        height: 20px;
        background: url(${require('@/assets/img/banner_sprite.png')}) 3px -343px;
        cursor: pointer;

        &:hover,
        &.active {
          background-position: -16px -343px;
        }
      }
    }
  }
`

export const TopBannerRight = styled.a.attrs({
  href: 'https://music.163.com/#/download',
  target: '_blank'
})`
  width: 254px;
  height: 270px;
  background: url(${require('@/assets/img/download.png')});
`

export const TopBannerControl = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;

  .btn {
    position: absolute;
    width: 37px;
    height: 63px;
    background-image: url(${require('@/assets/img/banner_sprite.png')});
    background-color: transparent;
    transform: translateY(-50%);
    cursor: pointer;
    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }

  .left {
    left: -68px;
    background-position: 0 -360px;
  }

  .right {
    right: -68px;
    background-position: 0 -508px;
  }
`
