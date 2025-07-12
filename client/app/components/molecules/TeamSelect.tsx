import {
  Avatar,
  HStack,
  Select,
  createListCollection,
  useSelectContext,
} from "@chakra-ui/react"
import { teamArray } from "data/teams";
import { useEffect, useState } from "react";
import { a3TOa2Converter, getFlag } from "~/scripts";
import { useAppContext } from "../context/AppContext";

const SelectValue = () => {
  const select = useSelectContext()
  const items = select.selectedItems as Array<{ name: string; code: string }>
  // console.log(items)
  const { name, code } = items[0]
  return (
    <Select.ValueText placeholder="Select member">
      <HStack>
        <Avatar.Root shape="rounded" size="2xs">
          <Avatar.Image src={getFlag(a3TOa2Converter(code))} alt={name} />
          <Avatar.Fallback name={name} />
        </Avatar.Root>
        {name}
      </HStack>
    </Select.ValueText>
  )
}

export const TeamSelect = () => {
    const [ team, setTeam ] = useState<string[]>(["USA"]);
    const { team: currentTeam, selectTeam } = useAppContext();
    useEffect(() => {
      if (currentTeam) setTeam([currentTeam.code]);
    }, [currentTeam]);

  return (
    <Select.Root
      collection={members}
      size="md"
      defaultValue={team}
      value={team}
      positioning={{ sameWidth: true }}
      onValueChange={(d) => {
        // console.log(d)
        setTeam(d.value);
        selectTeam(d.value[0]);
      }}
    >
      <Select.HiddenSelect />
      <Select.Label>Select Team</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <SelectValue />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Select.Positioner>
        <Select.Content>
          {members.items.map((item) => (
            <Select.Item item={item} key={item.code} justifyContent="flex-start">
              <Avatar.Root shape="rounded" size="2xs">
                <Avatar.Image src={getFlag(a3TOa2Converter(item.code))} alt={item.name} />
                <Avatar.Fallback name={item.name} />
              </Avatar.Root>
              {item.shortName}
              <Select.ItemIndicator />
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Positioner>
    </Select.Root>
  )
}

const members = createListCollection({
  items: teamArray,
  itemToString: (item) => item.shortName,
  itemToValue: (item) => item.code,
})