import { Flex } from "@chakra-ui/react";
import type { Route } from "../+types/root";
import { WorldMap } from "~/components/map/WorldMap";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "WCM | Watch the Skies!" },
    { name: "description", content: "West Coast Megagames Watch the Skies tracker" },
  ];
}

export default function Map() {
  return (
      <Flex className="terror-map">
        <WorldMap />
      </Flex>
    )
}