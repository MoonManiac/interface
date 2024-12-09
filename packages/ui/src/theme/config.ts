// until the web app needs all of tamagui, avoid heavy imports there
// eslint-disable-next-line no-restricted-imports
import type { CreateTamaguiProps } from '@tamagui/core'
import { allFonts } from 'ui/src/theme/fonts'
import { media } from 'ui/src/theme/media'
import { shorthands } from 'ui/src/theme/shorthands'
import { themes } from 'ui/src/theme/themes'
import { tokens } from 'ui/src/theme/tokens'

/**
 * Exporting without animations here since we are diverging the drivers between apps
 */

export const configWithoutAnimations = {
  shouldAddPrefersColorThemes: true,
  themeClassNameOnRoot: true,
  disableSSR: true,
  onlyAllowShorthands: true,
  shorthands,
  fonts: allFonts,
  themes,
  tokens,
  media,
  settings: {
    allowedStyleValues: 'somewhat-strict-web',
    autocompleteSpecificTokens: 'except-special',
    fastSchemeChange: true,
  },
} satisfies CreateTamaguiProps

export type TamaguiGroupNames = 'item' | 'card'

export const textVariants = {
  logo: {},
  heading1: {},
  heading2: {},
  // ... other existing variants
} as const
