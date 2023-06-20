import type { IconProps } from '@tamagui/helpers-icon'
import React, { memo } from 'react'
import { Path, Svg } from 'react-native-svg'
import { getTokenValue, isWeb, useTheme } from 'tamagui'

const Icon: React.FC<IconProps> = (props) => {
  // isWeb currentColor to maintain backwards compat a bit better, on native uses theme color
  const {
    color: colorProp = isWeb ? 'currentColor' : undefined,
    size: sizeProp = '$true',
    strokeWidth: strokeWidthProp,
    ...restProps
  } = props
  const theme = useTheme()

  const size = typeof sizeProp === 'string' ? getTokenValue(sizeProp, 'size') : sizeProp

  const strokeWidth =
    typeof strokeWidthProp === 'string' ? getTokenValue(strokeWidthProp, 'size') : strokeWidthProp

  const color = colorProp ?? theme.color.get()

  const svgProps = {
    ...restProps,
    size,
    strokeWidth,
    color,
  }

  return (
    <Svg fill="none" height={size} viewBox="0 0 24 24" width={size} {...svgProps}>
      <Path
        d="M21 5C16 4 14.2221 3.111 12.0181 2C9.77807 3.111 8 4 3 5C3 6.137 3 9.70192 3 10.8889C3 17.5559 8.667 20.889 12 22C15.333 20.889 21 17.5559 21 10.8889C21 9.66392 21 6.194 21 5ZM12.02 16C11.468 16 11.0149 15.552 11.0149 15C11.0149 14.448 11.458 14 12.01 14H12.02C12.573 14 13.02 14.448 13.02 15C13.02 15.552 12.572 16 12.02 16ZM13.344 12.051C12.798 12.415 12.718 12.596 12.71 12.615C12.597 12.917 12.3051 13.1111 11.9971 13.1111C11.9151 13.1111 11.833 13.0971 11.752 13.0691C11.367 12.9311 11.1581 12.522 11.2891 12.135C11.4911 11.537 12.0839 11.088 12.5129 10.802C13.1509 10.379 13.1579 9.95006 13.1079 9.66406C13.0299 9.22306 12.6529 8.84607 12.2109 8.76807C11.8709 8.70607 11.5371 8.79496 11.2781 9.01196C11.0221 9.22696 10.876 9.54102 10.876 9.87402C10.876 10.288 10.54 10.624 10.126 10.624C9.71198 10.624 9.37598 10.288 9.37598 9.87402C9.37598 9.09602 9.71796 8.36304 10.314 7.86304C10.91 7.36304 11.6929 7.15404 12.4709 7.29004C13.5299 7.47604 14.399 8.34505 14.585 9.40405C14.769 10.4581 14.328 11.397 13.344 12.051Z"
        fill={color}
      />
    </Svg>
  )
}

Icon.displayName = 'ShieldQuestion'

export const ShieldQuestion = memo<IconProps>(Icon)
