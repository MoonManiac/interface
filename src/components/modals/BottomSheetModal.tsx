import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal as BaseModal,
  BottomSheetView,
  useBottomSheetDynamicSnapPoints,
} from '@gorhom/bottom-sheet'
import React, { ComponentProps, PropsWithChildren, useCallback, useEffect, useRef } from 'react'
import { StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useAppTheme } from 'src/app/hooks'
import { Box } from 'src/components/layout'
import { Trace } from 'src/components/telemetry/Trace'
import { ModalName } from 'src/features/telemetry/constants'
import { TelemetryTraceProps } from 'src/features/telemetry/types'
import { dimensions, spacing } from 'src/styles/sizing'

type Props = PropsWithChildren<{
  disableSwipe?: boolean
  hideHandlebar?: boolean
  name: ModalName
  onClose?: () => void
  snapPoints?: Array<string | number>
  stackBehavior?: ComponentProps<typeof BaseModal>['stackBehavior']
  fullScreen?: boolean
  backgroundColor?: string
  isDismissible?: boolean
}> &
  TelemetryTraceProps

const HANDLEBAR_HEIGHT = spacing.xxs
const HANDLEBAR_WIDTH = spacing.xl

const HandleBar = (): JSX.Element => {
  return (
    <Box
      alignSelf="center"
      backgroundColor="backgroundOutline"
      borderRadius="sm"
      height={HANDLEBAR_HEIGHT}
      mb="sm"
      mt="md"
      width={HANDLEBAR_WIDTH}
    />
  )
}

const HiddenHandleBar = (): JSX.Element => {
  return (
    // same height and width as the handlebar but without a background color, so it takes up the same screen space
    <Box
      alignSelf="center"
      backgroundColor="none"
      borderRadius="xs"
      height={HANDLEBAR_HEIGHT}
      mb="sm"
      mt="md"
    />
  )
}

const Backdrop = (props: BottomSheetBackdropProps): JSX.Element => {
  return <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} opacity={0.4} />
}

const CONTENT_HEIGHT_SNAP_POINTS = ['CONTENT_HEIGHT']
const FULL_HEIGHT = 0.91

export function BottomSheetModal({
  children,
  name,
  properties,
  onClose,
  snapPoints = CONTENT_HEIGHT_SNAP_POINTS,
  stackBehavior = 'push',
  fullScreen,
  hideHandlebar,
  backgroundColor,
  isDismissible = true,
}: Props): JSX.Element {
  const insets = useSafeAreaInsets()
  const modalRef = useRef<BaseModal>(null)
  const { animatedHandleHeight, animatedSnapPoints, animatedContentHeight, handleContentLayout } =
    useBottomSheetDynamicSnapPoints(snapPoints)
  const theme = useAppTheme()

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        opacity={0.4}
        pressBehavior={isDismissible ? 'close' : 'none'}
      />
    ),
    [isDismissible]
  )

  useEffect(() => {
    modalRef.current?.present()
  }, [modalRef])

  const fullScreenContentHeight = FULL_HEIGHT * dimensions.fullHeight
  return (
    <BaseModal
      ref={modalRef}
      backdropComponent={renderBackdrop}
      backgroundStyle={{ backgroundColor: backgroundColor ?? theme.colors.background1 }}
      contentHeight={animatedContentHeight}
      enableContentPanningGesture={isDismissible}
      enableHandlePanningGesture={isDismissible}
      handleComponent={hideHandlebar ? HiddenHandleBar : HandleBar}
      handleHeight={animatedHandleHeight}
      snapPoints={animatedSnapPoints}
      stackBehavior={stackBehavior}
      topInset={insets.top}
      onDismiss={onClose}>
      <Trace logImpression modal={name} properties={properties}>
        <BottomSheetView
          style={[
            { height: fullScreen ? fullScreenContentHeight : undefined },
            BottomSheetStyle.view,
          ]}
          onLayout={handleContentLayout}>
          {children}
        </BottomSheetView>
      </Trace>
    </BaseModal>
  )
}

export function BottomSheetDetachedModal({
  children,
  name,
  onClose,
  snapPoints = CONTENT_HEIGHT_SNAP_POINTS,
  stackBehavior = 'push',
  fullScreen,
  hideHandlebar,
  backgroundColor,
}: Props): JSX.Element {
  const insets = useSafeAreaInsets()
  const modalRef = useRef<BaseModal>(null)
  const { animatedHandleHeight, animatedSnapPoints, animatedContentHeight, handleContentLayout } =
    useBottomSheetDynamicSnapPoints(snapPoints)
  const theme = useAppTheme()

  const fullScreenContentHeight = FULL_HEIGHT * dimensions.fullHeight

  useEffect(() => {
    modalRef.current?.present()
  }, [modalRef])

  return (
    <BaseModal
      ref={modalRef}
      backdropComponent={Backdrop}
      backgroundStyle={{ backgroundColor: backgroundColor ?? theme.colors.background0 }}
      bottomInset={theme.spacing.xxl}
      contentHeight={animatedContentHeight}
      detached={true}
      handleComponent={hideHandlebar ? HiddenHandleBar : HandleBar}
      handleHeight={animatedHandleHeight}
      snapPoints={animatedSnapPoints}
      stackBehavior={stackBehavior}
      style={BottomSheetStyle.detached}
      topInset={insets.top}
      onDismiss={onClose}>
      <Trace logImpression modal={name}>
        <BottomSheetView
          style={[
            {
              height: fullScreen ? fullScreenContentHeight : undefined,
            },
            BottomSheetStyle.view,
          ]}
          onLayout={handleContentLayout}>
          {children}
        </BottomSheetView>
      </Trace>
    </BaseModal>
  )
}

const BottomSheetStyle = StyleSheet.create({
  detached: {
    marginHorizontal: spacing.sm,
  },
  view: {
    flex: 1,
  },
})
