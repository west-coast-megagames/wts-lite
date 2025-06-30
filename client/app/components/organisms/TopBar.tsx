import { Box, Container, HStack, Image } from '@chakra-ui/react'
import { NotificationPopover, SearchPopover, SearchField, UserMenu, MobilePopover, NavbarLinks } from '../molecules'
import { CountdownClock } from '../molecules/CountDown'
import icon from "../../../public/images/wcm_logo.png"

export const TopBar = () => {
  return (
    <Box borderBottomWidth="1px" bg="bg.panel">
      <Container fluid py={{ base: '1', md: '2' }}>
        <HStack justify="space-between">
          <HStack gap={{ base: '4', md: '10' }}>
            <MobilePopover>
              <NavbarLinks />
            </MobilePopover>
            <HStack>
              <Image src={icon} h={30} />
            </HStack>
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
