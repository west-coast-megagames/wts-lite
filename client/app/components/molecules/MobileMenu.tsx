'use client'

import { Icon, IconButton, Popover, Portal } from '@chakra-ui/react'
import { useEffect, type PropsWithChildren } from 'react'
import { LuMenu, LuX } from 'react-icons/lu'
import { useDrawerContext } from '../context/DrawerContext'

export const MobilePopover = (props: PropsWithChildren) => {
  
  return (
    <Popover.Root
      closeOnInteractOutside
      positioning={{
        placement: 'bottom',
        overflowPadding: 0,
        offset: { mainAxis: 12 },
      }}
    >
      <Popover.Context>
        {(context) => {
          const { activeDrawer } = useDrawerContext();
            useEffect(() => {
              if (activeDrawer !== "") context.setOpen(false)
            }, [activeDrawer])
          return (<Popover.Trigger asChild>
            <IconButton
              aria-label="Open Menu"
              variant="ghost"
              size="sm"
              colorPalette="gray"
              hideFrom="md"
            >
              <Icon size="md">{context.open ? <LuX /> : <LuMenu />}</Icon>
            </IconButton>
          </Popover.Trigger>
        )}}
      </Popover.Context>
      <Portal>
        <Popover.Positioner>
          <Popover.Content
            textStyle="md"
            boxShadow="none"
            borderRadius="none"
            maxW="unset"
            px="4"
            py="6"
            width="var(--available-width)"
            height="var(--available-height)"
            {...props}
          />
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  )
}