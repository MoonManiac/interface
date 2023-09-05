import type { IconProps } from '@tamagui/helpers-icon'
import { forwardRef, memo } from 'react'
import { Path, Svg } from 'react-native-svg'
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
    <Svg ref={ref} fill="none" height={size} viewBox="0 0 18 19" width={size} {...svgProps}>
      <Path
        d="M9 1.50171C4.85775 1.50171 1.5 4.85946 1.5 9.00171C1.5 13.144 4.85775 16.5017 9 16.5017C13.1423 16.5017 16.5 13.144 16.5 9.00171C16.5 4.85946 13.1423 1.50171 9 1.50171ZM8.4375 5.62671C8.4375 5.31621 8.6895 5.06421 9 5.06421C9.3105 5.06421 9.5625 5.31621 9.5625 5.62671V9.05499C9.5625 9.36549 9.3105 9.61749 9 9.61749C8.6895 9.61749 8.4375 9.36549 8.4375 9.05499V5.62671ZM9.01501 12.3767C8.60101 12.3767 8.26117 12.0407 8.26117 11.6267C8.26117 11.2127 8.59351 10.8767 9.00751 10.8767H9.01501C9.42976 10.8767 9.76501 11.2127 9.76501 11.6267C9.76501 12.0407 9.42901 12.3767 9.01501 12.3767Z"
        fill={color}
      />
    </Svg>
  )
})

Icon.displayName = 'InfoCircleFilled'

export const InfoCircleFilled = memo<IconProps>(Icon)