import { Flex } from "@chakra-ui/react";
import type { Route } from "../+types/root";
import { MediaFeed } from "~/components/organisms/Feed";
import { useNavigate } from "react-router";
import { useAppContext } from "~/components/context/AppContext";
import { useEffect } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "WCM | Watch the Skies!" },
    { name: "description", content: "West Coast Megagames Watch the Skies tracker" },
  ];
}

export default function Feed() {
    const navagate = useNavigate();
  const { displayMode } = useAppContext();

  useEffect(() => {
    if (displayMode === 'loading') navagate("/");
  }, [displayMode])

  return (
      <Flex paddingTop={4}>
        <MediaFeed />
      </Flex>
    )
}