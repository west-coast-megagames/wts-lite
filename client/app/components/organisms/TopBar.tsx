import { Box, Container, HStack, Image } from '@chakra-ui/react'
import { NotificationPopover, SearchPopover, SearchField, UserMenu, MobilePopover, NavbarLinks } from '../molecules'
import { CountdownClock } from '../molecules/CountDown'
import logo from "../../img/logos/wcm_logo.png";
import { useAppContext } from '../context/AppContext'

export const TopBar = () => {
  const { displayMode, user, team } = useAppContext();

  return (
    <Box borderBottomWidth="1px" bg="bg.panel">
      { displayMode === 'user' && user && team && 
      <Container fluid py={{ base: '1', md: '2' }}>
        <HStack justify="space-between">
          <HStack gap={{ base: '4', md: '10' }}>
            <MobilePopover>
              <NavbarLinks />
            </MobilePopover>
            <HStack>
              <Image src={logo} h={30} hideBelow="md" />
            </HStack>
            <NavbarLinks hideBelow="md" />
          </HStack>
          {/* <CountdownClock /> */}
          {/* <HStack gap={{ base: '2', md: '4' }}> */}
            {/* <SearchField hideBelow="lg" /> */}
            <HStack gap={{ base: '2', md: '3' }}>
              {/* <SearchPopover hideFrom="lg" /> */}
              {/* <NotificationPopover /> */}
              <UserMenu />
            {/* </HStack> */}
          </HStack>
        </HStack>
      </Container>}
    </Box>
  )
}
