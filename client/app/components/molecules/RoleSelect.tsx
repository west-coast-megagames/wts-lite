import {
  Avatar,
  HStack,
  Select,
  Text,
  createListCollection,
  useSelectContext,
  type ListCollection,
} from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import sci from '../../img/icons/Science_Icon.svg';
import pol from '../../img/icons/Political_Icon.svg';
import gov from '../../img/icons/Governance.svg';
import ops from '../../img/icons/Operational_Icon.svg';
import type { Role } from "~/types/types";

const getIcon = (type: string) => {
    switch (type) {
        case ("Diplomat"): return pol;
        case ("Head of State"): return gov;
        case ("Military"): return ops;
        case ("Scientist"): return sci;
        default: undefined;
    }
}

const SelectValue = () => {
  const select = useSelectContext();
  const items = select.selectedItems as Array<{ title: string, type: string }>
  console.log(items)
  return (
    <Select.ValueText placeholder="Select Team Role">
      { items.length > 0 && <HStack>
        <Avatar.Root shape="rounded" size="2xs">
          <Avatar.Image src={getIcon(items[0].type)} alt={items[0].title} />
          <Avatar.Fallback name={items[0].title} />
        </Avatar.Root>
        {items[0].title}
      </HStack> }
    </Select.ValueText>
  )
}

export const RoleSelect = () => {
    const { team, role: currentRole, openRoles, selectRole } = useAppContext();
    const [ role, setRole ] = useState<string[]>([]);
    const [ selectList, setList ] = useState<ListCollection<Role>>(openRoles)


    useEffect(() => {
      if (currentRole) setRole([currentRole._id]);
    }, [currentRole])


  return (
    <Select.Root
      collection={selectList}
      value={role}
      size="md"
      positioning={{ sameWidth: true }}
      onValueChange={(d) => {
        setRole(d.value);
        selectRole(d.value[0]);
      }}
    >
      <Select.HiddenSelect />
      <Select.Label>Select Role</Select.Label>
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
          {openRoles.items.filter((role: Role) => role.team?.code === team?.code ).map((item: Role , i: number) => (
            <Select.Item item={item} key={item.title + i} justifyContent="flex-start">
              <Avatar.Root shape="rounded" size="2xs">
                <Avatar.Image src={getIcon(item.type)} alt={item.title} />
                <Avatar.Fallback name={item.title} />
              </Avatar.Root>
              {item.title}
              <Select.ItemIndicator />
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Positioner>
    </Select.Root>
  )
}
