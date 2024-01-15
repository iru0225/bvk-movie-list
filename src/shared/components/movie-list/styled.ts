import styled from 'styled-components'
import tw, { TwStyle } from 'twin.macro'

type DirectionVariantNames = 'column' | 'row'
type DirectionVariantType = {
  [_key in DirectionVariantNames]: TwStyle
}
const directionVariant: DirectionVariantType = {
  column: tw`flex-wrap`,
  row: tw`flex-nowrap`
}

export const Container = styled.div<{ direction: DirectionVariantNames }>`
  ${tw`relative pb-8`}

  ${({ direction }) => {
    if (direction === 'column') {
      return tw`max-h-[622px] overflow-hidden overflow-y-auto`
    }

    return tw`h-fit w-full overflow-hidden overflow-x-auto`
  }}

  &::-webkit-scrollbar {
    width: 5px;
  }
  
  &::-webkit-scrollbar-thumb,
  &::-webkit-scrollbar-track {
    ${tw`bg-transparent`}
  }
`

export const MoviesContainer = styled.div<{ direction: DirectionVariantNames }>`
  ${tw`flex flex-wrap gap-3`}
  ${({ direction }) => direction && directionVariant[direction]}
  ${({ direction }) => {
    if (direction === 'column') {
      return tw`justify-center`
    }

    return tw`justify-start`
  }}
`

export const ContentTitle = styled.h2`
  ${tw`sticky top-0 left-0 bg-white px-2 py-4 m-0 mb-[2px] z-10`}
`