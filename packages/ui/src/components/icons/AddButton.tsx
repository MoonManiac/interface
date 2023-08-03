import type { IconProps } from '@tamagui/helpers-icon'
import { forwardRef, memo } from 'react'
import { Path, Rect, Svg } from 'react-native-svg'
import { getTokenValue, isWeb, useTheme } from 'tamagui'

const Icon = forwardRef<Svg, IconProps>((props, ref) => {
  // isWeb currentColor to maintain backwards compat a bit better, on native uses theme color
  const {
    color: colorProp = isWeb ? 'currentColor' : undefined,
    size: sizeProp = '$true',
    strokeWidth: strokeWidthProp,
    ...restProps
  } = props
  const theme = useTheme()

  const size =
    getTokenValue(
      // @ts-expect-error it falls back to undefined
      sizeProp,
      'size'
    ) ?? sizeProp

  const strokeWidth =
    getTokenValue(
      // @ts-expect-error it falls back to undefined
      strokeWidthProp,
      'size'
    ) ?? strokeWidthProp

  const color =
    // @ts-expect-error its fine to access colorProp undefined
    theme[colorProp]?.get() ?? colorProp ?? theme.color.get()

  const svgProps = {
    ...restProps,
    size,
    strokeWidth,
    color,
  }

  return (
    <Svg ref={ref} fill="none" height={size} viewBox="0 0 24 24" width={size} {...svgProps}>
      <Path
        d="M12 7.625V16.375"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <Path
        d="M7.625 12H16.375"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <Rect height="22" rx="11" stroke={color} strokeWidth="2" width="22" x="1" y="1" />
    </Svg>
  )
})

Icon.displayName = 'AddButton'

export const AddButton = memo<IconProps>(Icon)