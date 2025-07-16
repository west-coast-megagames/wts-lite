import { Flex } from "@chakra-ui/react";
import type { Route } from "../+types/root";
import { MediaFeed } from "~/components/organisms/Feed";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "WCM | Watch the Skies!" },
    { name: "description", content: "West Coast Megagames Watch the Skies tracker" },
  ];
}

export default function Feed() {
  return (
      <Flex paddingTop={4}>
        <MediaFeed />
      </Flex>
    )
}