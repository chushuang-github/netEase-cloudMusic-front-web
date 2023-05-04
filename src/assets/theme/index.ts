const theme = {
  color: {
    primary: '#C20C0C',
    secondary: ''
  },
  size: {},
  // 样式混入，给 styled-components 定义的样式组件使用的
  // ${props => props.theme.mixin.wrapV1}，直接写在样式组件里面就ok了
  mixin: {
    wrapV1: `
      width: 1100px;
      margin: 0 auto;
    `,
    wrapV2: `
      width: 980px;
      margin: 0 auto;
    `
  }
}

export default theme
