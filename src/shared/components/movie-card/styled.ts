import { Link } from "react-router-dom";
import styled from "styled-components";
import tw, { TwStyle } from "twin.macro";

type TextVariantNames = 'small' | 'base' | 'large'
type TextVariantType = {
  [_key in TextVariantNames]: TwStyle
}

const textVariant: TextVariantType = {
  base: tw`text-base`,
  large: tw`text-lg`,
  small: tw`text-sm`
}

type TextColorVariantNames = 'default' | 'secondary'
type TextColorVariantType = {
  [_key in TextColorVariantNames]: TwStyle
}

const textColor: TextColorVariantType = {
  default: tw`text-black`,
  secondary: tw`text-[#808080]`
}

export const Container = styled(Link)`
  ${tw`w-[154px] border-none rounded flex flex-col bg-transparent p-0`}
  ${tw`no-underline text-left p-2 relative`}
  
  &:hover {
    ${tw`shadow-lg shadow-[#09D3AC]`}
  }
`

export const Text = styled.p<{ variant: TextVariantNames, type?: TextColorVariantNames }>`
  ${tw`m-0 truncate`}
  ${({ variant }) => variant ? textVariant[variant] : tw`text-base`}
  ${({ type }) => type ? textColor[type] : textColor.default}
`

export const AddButton = styled.button`
  ${tw`bg-[#808080] w-7 h-7 opacity-75 rounded-[50%] border-none`}
  ${tw`absolute right-[10px] top-[10px] cursor-pointer`}

  &:hover {
    ${tw`bg-[#09D3AC]`}
  }
`