import styled from 'styled-components'
import tw from 'twin.macro'

export const Container = styled.div<{ bgsrc?: string }>`
  ${tw`w-full  min-h-[350px] mx-auto relative`}
  ${({ bgsrc }) => bgsrc ? `
    background-image: url(${bgsrc});
    background-size: cover;
    background-repeat: no-repeat;
  ` : ''}

  @media screen and (min-width:768px) {
    ${tw`w-[86%] min-h-[350px] mx-auto mt-8`}
  }
`

export const BackButton = styled.button`
  ${tw`ml-8 mt-4 bg-transparent border-0 text-[whitesmoke] text-lg z-10 relative cursor-pointer`}
`

export const Overlay = styled.div`
  ${tw`absolute inset-0 bg-black opacity-50`}
`

export const ContentWrapper = styled.div`
  ${tw`p-8 flex gap-4 z-10 relative`}

  @media screen and (max-width: 767px) {
    ${tw`flex-col`}
  }
`

export const Title = styled.h2`
  ${tw`m-0 text-white`}
`

export const Text = styled.p`
  ${tw`m-0 text-[whitesmoke]`}
`

export const Badge = styled.span`
  ${tw`w-fit px-[8px] py-[2px] bg-green-600 text-white text-sm mt-[2px]`}
`

export const ScoreWrapper = styled.div`
  ${tw`flex gap-4 my-[8px] mx-0`}
`

export const ActionButton = styled.button<{ background: string }>`
  ${tw`border-0 rounded p-[8px] text-white cursor-pointer`}
  ${({ background }) => `background: ${background}`}
`