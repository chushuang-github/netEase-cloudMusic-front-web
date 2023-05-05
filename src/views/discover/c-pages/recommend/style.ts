import styled from 'styled-components'

export const RecommendWrapper = styled.div``

export const RecommendContent = styled.div`
  ${(props) => props.theme.mixin.wrapV2}
  border: 1px solid #d3d3d3;
  width: 980px;
  background-image: url(${require('@/assets/img/wrap-bg.png')});
  display: flex;
`
export const RecommendLeft = styled.div`
  padding: 20px;
  width: 729px;
`
export const RecommendRight = styled.div`
  width: 250px;
`
