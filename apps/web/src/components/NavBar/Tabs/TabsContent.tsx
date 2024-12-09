import { MenuItem } from 'components/NavBar/CompanyMenu/Content'
import { useLocation } from 'react-router-dom'
import { FeatureFlags } from 'uniswap/src/features/gating/flags'
import { useFeatureFlag } from 'uniswap/src/features/gating/hooks'
import { useTranslation } from 'uniswap/src/i18n'

export type TabsSection = {
  title: string
  href: string
  isActive?: boolean
  items?: TabsItem[]
  closeMenu?: () => void
}

export type TabsItem = MenuItem & {
  icon?: JSX.Element
  quickKey: string
}

export const useTabsContent = (): TabsSection[] => {
  const { t } = useTranslation()
  const isV4EverywhereEnabled = useFeatureFlag(FeatureFlags.V4Everywhere)
  const { pathname } = useLocation()

  return [
    {
      title: t('common.trade'),
      href: '/swap',
      isActive: pathname.startsWith('/swap') || pathname.startsWith('/limit') || pathname.startsWith('/send'),
      // Removed the items array to eliminate dropdown menu
    },
    {
      title: t('common.pool'),
      href: isV4EverywhereEnabled ? '/positions' : '/pool',
      isActive: pathname.startsWith('/pool'),
      items: [
        {
          label: t('nav.tabs.viewPositions'),
          quickKey: 'V',
          href: isV4EverywhereEnabled ? '/positions' : '/pool',
          internal: true,
        },
        {
          label: t('nav.tabs.createPosition'),
          quickKey: 'V',
          href: isV4EverywhereEnabled ? '/positions/create' : '/add',
          internal: true,
        },
      ],
    },
  ]
}
