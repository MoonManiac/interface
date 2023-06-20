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
        d="M17 15.63C17 13.627 15.641 11.884 13.691 11.389L10.795 10.671C10.274 10.539 9.826 10.2469 9.494 9.81995C9.175 9.41695 8.99899 8.902 8.99899 8.37C8.99899 7.06299 10.062 6 11.369 6H12.629C13.837 6 14.85 6.90806 14.985 8.11206C15.047 8.66106 15.543 9.05802 16.09 8.99402C16.639 8.93202 17.034 8.43704 16.972 7.88904C16.736 5.78404 15.035 4.18898 12.958 4.03198V3C12.958 2.45 12.508 2 11.958 2C11.408 2 10.958 2.45 10.958 3V4.04199C8.74299 4.25199 6.998 6.10097 6.998 8.37097C6.998 9.34997 7.327 10.306 7.918 11.054C8.511 11.819 9.35801 12.3711 10.307 12.6121L13.203 13.33C14.26 13.598 14.998 14.544 14.998 15.631C14.998 16.26 14.75 16.854 14.3 17.304C13.851 17.754 13.257 18.001 12.628 18.001H11.368C10.16 18.001 9.14699 17.093 9.01199 15.889C8.94999 15.34 8.451 14.945 7.907 15.007C7.358 15.069 6.963 15.5641 7.025 16.1121C7.258 18.1901 8.919 19.769 10.959 19.962V21C10.959 21.55 11.409 22 11.959 22C12.509 22 12.959 21.55 12.959 21V19.968C13.998 19.889 14.969 19.465 15.716 18.718C16.544 17.89 17 16.794 17 15.63Z"
        fill={color}
      />
    </Svg>
  )
}

Icon.displayName = 'Dollar'

export const Dollar = memo<IconProps>(Icon)
