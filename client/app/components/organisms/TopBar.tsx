import { Box, Container, HStack } from '@chakra-ui/react'
import { Logo } from '../logo' 
import { NotificationPopover, SearchPopover, SearchField, UserMenu, MobilePopover, NavbarLinks } from '../molecules'
import { CountdownClock } from '../molecules/CountDown'

export const Block = () => {
  return (
    <Box borderBottomWidth="1px" bg="bg.panel">
      <Container fluid py={{ base: '1', md: '2' }}>
        <HStack justify="space-between">
          <HStack gap={{ base: '4', md: '10' }}>
            <MobilePopover>
              <NavbarLinks />
            </MobilePopover>
            <Logo />
            <NavbarLinks hideBelow="md" />
          </HStack>
          <CountdownClock />
          <HStack gap={{ base: '2', md: '4' }}>
            <SearchField hideBelow="lg" />
            <HStack gap={{ base: '2', md: '3' }}>
              <SearchPopover hideFrom="lg" />
              <NotificationPopover />
              <UserMenu />
            </HStack>
          </HStack>
        </HStack>
      </Container>
    </Box>
  )
}
