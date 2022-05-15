import React from 'react'
import { Box } from 'src/components/layout'
import { Text } from 'src/components/Text'
import { ChainId, CHAIN_INFO } from 'src/constants/chains'
import { useNetworkColors } from 'src/utils/colors'

interface TokenBalanceListHeaderProps {
  chainId: ChainId
}

export function TokenBalanceListHeader({ chainId }: TokenBalanceListHeaderProps) {
  const colors = useNetworkColors(chainId)
  return (
    <Box bg="mainBackground" pb="xs" pt="md" px="lg">
      <Text style={{ color: colors.foreground }} variant="body1">
        {CHAIN_INFO[chainId].label}
      </Text>
    </Box>
  )
}
