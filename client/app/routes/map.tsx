import { Flex } from "@chakra-ui/react";
import type { Route } from "../+types/root";
import { WorldMap } from "~/components/map/WorldMap";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useAppContext } from "~/components/context/AppContext";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "WCM | Watch the Skies!" },
    { name: "description", content: "West Coast Megagames Watch the Skies tracker" },
  ];
}

export default function Map() {
  const navagate = useNavigate();
  const { displayMode } = useAppContext();

  useEffect(() => {
    if (displayMode === 'loading') navagate("/");
  }, [displayMode])

  return (
      <Flex className="terror-map">
        <WorldMap />
      </Flex>
    )
}