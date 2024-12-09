// until the web app needs all of tamagui, avoid heavy imports there
// eslint-disable-next-line no-restricted-imports
import { createFont, isAndroid, isWeb } from '@tamagui/core'
import { needsSmallFont } from 'ui/src/utils/needs-small-font'
import { isInterface } from 'utilities/src/platform'

// TODO(EXT-148): remove this type and use Tamagui's FontTokens
export type TextVariantTokens =
  | 'monospace'
  | 'heading1'
  | 'heading2'
  | 'heading3'
  | 'subheading1'
  | 'subheading2'
  | 'subheading3'
  | 'body1'
  | 'body2'
  | 'body3'
  | 'body4'
  | 'buttonLabel1'
  | 'buttonLabel2'
  | 'buttonLabel3'
  | 'buttonLabel4'

const adjustedSize = (fontSize: number): number => {
  if (needsSmallFont()) {
    return fontSize
  }
  return fontSize + 1
}

// Note that React Native is a bit weird with fonts
// on iOS you must refer to them by the family name in the file
// on Android you must refer to them by the name of the file
// on web, it's the full family name in the file
const fontFamilyByPlatform = {
  android: {
    medium: 'Belanosima-Regular',
    book: 'Belanosima-Regular',
  },
  ios: {
    medium: 'Belanosima',
    book: 'Belanosima',
  },
  web: {
    medium: 'Belanosima',
    book: 'Belanosima',
  },
}

const platform = isWeb ? 'web' : isAndroid ? 'android' : 'ios'

const fontFamily = {
  serif: 'serif',
  sansSerif: {
    // iOS uses the name embedded in the font
    book: fontFamilyByPlatform[platform].book,
    medium: fontFamilyByPlatform[platform].medium,
    monospace: 'InputMono-Regular',
  },
}

const BelanosimaMedium = isWeb
  ? 'Belanosima, -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
  : fontFamily.sansSerif.medium

const BelanosimaBook = isWeb
  ? 'Belanosima, -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
  : fontFamily.sansSerif.book

// const logoFont = isWeb
//   ? 'Belanosima, -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
//   : belanosima[platform]

type SansSerifFontFamilyKey = keyof typeof fontFamily.sansSerif
type SansSerifFontFamilyValue = (typeof fontFamily.sansSerif)[SansSerifFontFamilyKey]

const platformFontFamily = (family: SansSerifFontFamilyKey): SansSerifFontFamilyKey | SansSerifFontFamilyValue => {
  if (isWeb) {
    return family
  }

  return fontFamily.sansSerif[family]
}

// default for non-button fonts
const BOOK_WEIGHT = '400'
const BOOK_WEIGHT_WEB = '400'

// used for buttons
const MEDIUM_WEIGHT = '400'
const MEDIUM_WEIGHT_WEB = '400'

const defaultWeights = {
  book: isInterface ? BOOK_WEIGHT_WEB : BOOK_WEIGHT,
  true: isInterface ? BOOK_WEIGHT_WEB : BOOK_WEIGHT,
  medium: isInterface ? MEDIUM_WEIGHT_WEB : MEDIUM_WEIGHT,
}

// on native, the font files render down a few px
// this adjusts them to be visually centered by default
const NATIVE_LINE_HEIGHT_SCALE = 1.15

export const fonts = {
  heading1: {
    family: platformFontFamily('book'),
    fontSize: adjustedSize(52),
    lineHeight: 60,
    fontWeight: BOOK_WEIGHT,
    maxFontSizeMultiplier: 1.2,
  },
  heading2: {
    family: platformFontFamily('book'),
    fontSize: adjustedSize(36),
    lineHeight: 44,
    fontWeight: BOOK_WEIGHT,
    maxFontSizeMultiplier: 1.2,
  },
  heading3: {
    family: platformFontFamily('book'),
    fontSize: adjustedSize(24),
    lineHeight: 32,
    fontWeight: BOOK_WEIGHT,
    maxFontSizeMultiplier: 1.2,
  },
  subheading1: {
    family: platformFontFamily('book'),
    fontSize: adjustedSize(18),
    lineHeight: 24,
    fontWeight: BOOK_WEIGHT,
    maxFontSizeMultiplier: 1.4,
  },
  subheading2: {
    family: platformFontFamily('book'),
    fontSize: adjustedSize(16),
    lineHeight: 24,
    fontWeight: BOOK_WEIGHT,
    maxFontSizeMultiplier: 1.4,
  },
  subheading3: {
    family: platformFontFamily('book'),
    fontSize: adjustedSize(14),
    lineHeight: 20,
    fontWeight: BOOK_WEIGHT,
    maxFontSizeMultiplier: 1.4,
  },
  body1: {
    family: platformFontFamily('book'),
    fontSize: adjustedSize(18),
    lineHeight: 24,
    fontWeight: BOOK_WEIGHT,
    maxFontSizeMultiplier: 1.4,
  },
  body2: {
    family: platformFontFamily('book'),
    fontSize: adjustedSize(16),
    lineHeight: 24,
    fontWeight: BOOK_WEIGHT,
    maxFontSizeMultiplier: 1.4,
  },
  body3: {
    family: platformFontFamily('book'),
    fontSize: adjustedSize(14),
    lineHeight: 20,
    fontWeight: BOOK_WEIGHT,
    maxFontSizeMultiplier: 1.4,
  },
  body4: {
    family: platformFontFamily('book'),
    fontSize: adjustedSize(12),
    lineHeight: 16,
    fontWeight: BOOK_WEIGHT,
    maxFontSizeMultiplier: 1.4,
  },
  buttonLabel1: {
    family: platformFontFamily('medium'),
    fontSize: adjustedSize(18),
    lineHeight: adjustedSize(18) * NATIVE_LINE_HEIGHT_SCALE,
    fontWeight: MEDIUM_WEIGHT,
    maxFontSizeMultiplier: 1.2,
  },
  buttonLabel2: {
    family: platformFontFamily('medium'),
    fontSize: adjustedSize(16),
    lineHeight: adjustedSize(16) * NATIVE_LINE_HEIGHT_SCALE,
    fontWeight: MEDIUM_WEIGHT,
    maxFontSizeMultiplier: 1.2,
  },
  buttonLabel3: {
    family: platformFontFamily('medium'),
    fontSize: adjustedSize(14),
    lineHeight: adjustedSize(14) * NATIVE_LINE_HEIGHT_SCALE,
    fontWeight: MEDIUM_WEIGHT,
    maxFontSizeMultiplier: 1.2,
  },
  buttonLabel4: {
    family: platformFontFamily('medium'),
    fontSize: adjustedSize(12),
    lineHeight: adjustedSize(12) * NATIVE_LINE_HEIGHT_SCALE,
    fontWeight: MEDIUM_WEIGHT,
    maxFontSizeMultiplier: 1.2,
  },
  monospace: {
    family: platformFontFamily('monospace'),
    fontSize: adjustedSize(12),
    lineHeight: 16,
    maxFontSizeMultiplier: 1.2,
  },
} as const

// TODO: Tamagui breaks font weights on Android if face *not* defined
// but breaks iOS if face is defined
const face = {
  [defaultWeights.book]: { normal: BelanosimaBook },
  [defaultWeights.medium]: { normal: BelanosimaMedium },
}

export const headingFont = createFont({
  family: BelanosimaBook,
  ...(isAndroid ? { face } : null),
  size: {
    small: fonts.heading3.fontSize,
    medium: fonts.heading2.fontSize,
    true: fonts.heading2.fontSize,
    large: fonts.heading1.fontSize,
  },
  weight: defaultWeights,
  lineHeight: {
    small: fonts.heading3.lineHeight,
    medium: fonts.heading2.lineHeight,
    true: fonts.heading2.lineHeight,
    large: fonts.heading1.lineHeight,
  },
})

export const subHeadingFont = createFont({
  family: BelanosimaBook,
  ...(isAndroid ? { face } : null),
  size: {
    small: fonts.subheading2.fontSize,
    large: fonts.subheading1.fontSize,
    true: fonts.subheading1.fontSize,
  },
  weight: defaultWeights,
  lineHeight: {
    small: fonts.subheading2.lineHeight,
    large: fonts.subheading1.lineHeight,
    true: fonts.subheading1.lineHeight,
  },
})

export const bodyFont = createFont({
  family: BelanosimaBook,
  ...(isAndroid ? { face } : null),
  size: {
    micro: fonts.body4.fontSize,
    small: fonts.body3.fontSize,
    medium: fonts.body2.fontSize,
    true: fonts.body2.fontSize,
    large: fonts.body1.fontSize,
  },
  weight: defaultWeights,
  lineHeight: {
    micro: fonts.body4.lineHeight,
    small: fonts.body3.lineHeight,
    medium: fonts.body2.lineHeight,
    true: fonts.body2.lineHeight,
    large: fonts.body1.lineHeight,
  },
})

export const buttonFont = createFont({
  family: BelanosimaMedium,
  size: {
    micro: fonts.buttonLabel4.fontSize,
    small: fonts.buttonLabel3.fontSize,
    medium: fonts.buttonLabel2.fontSize,
    large: fonts.buttonLabel1.fontSize,
    true: fonts.buttonLabel2.fontSize,
  },
  weight: {
    ...defaultWeights,
    true: MEDIUM_WEIGHT,
  },
  lineHeight: {
    micro: fonts.buttonLabel4.lineHeight,
    small: fonts.buttonLabel3.lineHeight,
    medium: fonts.buttonLabel2.lineHeight,
    large: fonts.buttonLabel1.lineHeight,
    true: fonts.buttonLabel2.lineHeight,
  },
})

export const allFonts = {
  heading: headingFont,
  subHeading: subHeadingFont,
  body: bodyFont,
  button: buttonFont,
}
