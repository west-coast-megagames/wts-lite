import { TopBar } from "~/components/organisms/TopBar";
import type { Route } from "./+types/home";
// import { Welcome } from "../welcome/welcome";
import { WorldMap } from "~/components/map/WorldMap";
import { Flex } from "@chakra-ui/react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "WCM | Watch the Skies!" },
    { name: "description", content: "West Coast Megagames Watch the Skies tracker" },
  ];
}

export default function Home() {
  return (
      <Flex className="terror-map">
        <WorldMap />
      </Flex>
    )
}
