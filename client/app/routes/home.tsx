import { useAppContext } from "~/components/context/AppContext";
import type { Route } from "./+types/home";
import { Center, Spinner, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "WCM | Watch the Skies!" },
    { name: "description", content: "West Coast Megagames Watch the Skies tracker" },
  ];
}

export default function Home() {
  const { loadTeams, displayMode } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (displayMode === 'loading') loadTeams();
    else (navigate('/map'));
  }, [displayMode]);

  return (
    <Center bg="bg.emphasized" h="100vh">
      <VStack colorPalette="teal">
        <Spinner color="colorPalette.600" size='xl' />
        <Text color="colorPalette.600">Loading... so Watch the Skies..</Text>
      </VStack>
    </Center>
    )
}
