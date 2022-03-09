import React from 'react'
import { useTranslation } from 'react-i18next'
import { Linking } from 'react-native'
import { useAccountDisplayName } from 'src/components/accounts/useAccountDisplayName'
import { PrimaryButton } from 'src/components/buttons/PrimaryButton'
import { RemoteImage } from 'src/components/images/RemoteImage'
import { Flex } from 'src/components/layout'
import { Box } from 'src/components/layout/Box'
import { BottomSheetModal } from 'src/components/modals/BottomSheetModal'
import { Text } from 'src/components/Text'
import { OpenseaNFTAsset } from 'src/features/nfts/types'
import { ElementName, ModalName } from 'src/features/telemetry/constants'
import { useActiveAccount } from 'src/features/wallet/hooks'
import { borderRadii, dimensions } from 'src/styles/sizing'
import { logger } from 'src/utils/logger'

interface Props {
  nftAsset?: OpenseaNFTAsset
  isVisible: boolean
  onClose: () => void
}

const ITEM_WIDTH = dimensions.fullWidth - 50
const COLLECTION_IMAGE_WIDTH = 30

export function NFTAssetModal({ nftAsset, isVisible, onClose }: Props) {
  const { t } = useTranslation()
  const activeAccount = useActiveAccount()
  const displayName = useAccountDisplayName(activeAccount)

  if (!nftAsset) return null

  const { name, image_url: imageUrl, collection, permalink } = nftAsset
  const {
    image_url: collectionImageUrl,
    name: collectionName,
    description: collectionDescription,
  } = collection

  const openOnOpensea = () => {
    Linking.canOpenURL(permalink).then((supported) => {
      if (supported) {
        Linking.openURL(permalink)
      } else {
        logger.debug('NFTAssetModal', 'openOnOpensea', 'Cannot open Opensea link')
      }
    })
  }

  // TODO Refactor with https://gorhom.github.io/react-native-bottom-sheet/components/bottomsheetscrollview and use Flex instead of margins
  return (
    <BottomSheetModal isVisible={isVisible} name={ModalName.NFTAsset} onClose={onClose}>
      <Box mb="xl">
        <Flex alignItems="center" flexDirection="row" gap="sm" mx="lg" my="lg">
          <RemoteImage
            borderRadius={COLLECTION_IMAGE_WIDTH / 2}
            height={COLLECTION_IMAGE_WIDTH}
            imageUrl={collectionImageUrl}
            width={COLLECTION_IMAGE_WIDTH}
          />
          <Text variant="h3">{name}</Text>
        </Flex>
        <Box
          alignItems="center"
          flexDirection="column"
          justifyContent="space-between"
          width={dimensions.fullWidth}>
          <RemoteImage
            borderRadius={borderRadii.lg}
            height={ITEM_WIDTH}
            imageUrl={imageUrl}
            width={ITEM_WIDTH}
          />
        </Box>
        <Box mx="lg">
          <PrimaryButton
            label={t('View on Opensea')}
            mt="lg"
            name={ElementName.ViewOnOpensea}
            testID={ElementName.ViewOnOpensea}
            variant="gray"
            onPress={openOnOpensea}
          />
        </Box>
        <Box mt="sm" mx="lg">
          <Box>
            <Text my="sm" variant="h5">{t`Owned By`}</Text>
            <Box bg="tabBackground" borderRadius="md" p="sm">
              <Text variant="body">{displayName}</Text>
            </Box>
          </Box>
          <Box>
            <Text my="sm" variant="h5">{t`Collection`}</Text>
            <Box bg="tabBackground" borderRadius="md" p="sm">
              <Text variant="body">{collectionName}</Text>
            </Box>
          </Box>
          <Box my="sm">
            <Text my="sm" variant="h5">{t`About this collection`}</Text>
            <Text variant="bodySm">{collectionDescription}</Text>
          </Box>
        </Box>
      </Box>
    </BottomSheetModal>
  )
}
