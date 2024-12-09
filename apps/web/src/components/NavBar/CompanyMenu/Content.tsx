import { useTranslation } from 'uniswap/src/i18n'

export interface MenuItem {
  label: string
  href: string
  internal?: boolean
  overflow?: boolean
  closeMenu?: () => void
}

export interface MenuSection {
  title: string
  items: MenuItem[]
  closeMenu?: () => void
}

export const useMenuContent = (): MenuSection[] => {
  const { t } = useTranslation()

  return [
    {
      title: t('common.needHelp'),
      items: [
        { label: t('common.helpCenter'), href: 'https://support.uniswap.org/hc/en-us' },
        { label: t('common.contactUs.button'), href: 'https://support.uniswap.org/hc/en-us/requests/new' },
      ],
    },
  ]
}
