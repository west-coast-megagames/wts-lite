import { useAppContext } from "~/components/context/AppContext";
import type { Route } from "./+types/home";
import { Box, Center, Container, HStack, Image, Spacer, Spinner, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import logo from "../img/logos/wcm_logo.png"
import { NotificationPopover, UserMenu } from "~/components/molecules";
import { Login } from "~/components/molecules/Login";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "WCM | Watch the Skies!" },
    { name: "description", content: "West Coast Megagames Watch the Skies tracker" },
  ];
}

export default function Home() {
  const { dataUplink, displayMode  } = useAppContext();
  const [ loadMessage, setMessage ] = useState<string>('Loading digital assests... so sit back and Watch the Skies.');

  useEffect(() => {
    console.log(displayMode);
    if (displayMode === 'loading') {
      setMessage('Gathering Teams from the West Coast!')
      dataUplink();
    }
    if (displayMode !== 'loading') setMessage('Prep for Sign Up!');
  }, [displayMode]);

  return (
    <Container fluid padding={0}>
      <VStack>
      <Box borderBottomWidth="1px" bg="bg.panel" w="100%">
       <Container fluid py={{ base: '1', md: '2' }}>
        <HStack justify="space-between">
          <HStack gap={{ base: '4', md: '10' }}>
            <Image src={logo} h={30} hideBelow="md" />
          </HStack>
          <Spacer />
          <HStack gap={{ base: '2', md: '3' }}>
            <NotificationPopover />
            <UserMenu />
          </HStack>
        </HStack>
      </Container>
    </Box>
    <Center bg="bg.emphasized" h="100vh" w="100%">
      { displayMode === 'loading' && <VStack colorPalette="teal">
        <Spinner color="colorPalette.600" size='xl' />
        <Text color="colorPalette.600">{loadMessage}</Text>
      </VStack> }
      { displayMode !== 'loading' && <Login /> }
    </Center>
    </VStack>
    </Container>
    )
}
