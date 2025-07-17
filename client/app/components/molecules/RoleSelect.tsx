import {
  Avatar,
  HStack,
  Select,
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
  const select = useSelectContext()
  const items = select.selectedItems as Array<{ title: string, type: string }>
  console.log(items)
  const { title, type } = items[0]
  return (
    <Select.ValueText placeholder="Select member">
      <HStack>
        <Avatar.Root shape="rounded" size="2xs">
          <Avatar.Image src={getIcon(type)} alt={title} />
          <Avatar.Fallback name={title} />
        </Avatar.Root>
        {title}
      </HStack>
    </Select.ValueText>
  )
}

export const RoleSelect = () => {
    const [ role, setRole ] = useState<string[]>(['Placeholder']);
    const [ selectList, setList ] = useState([])
    const { team, roles, user: currentUser } = useAppContext();

    useEffect(() => {
      if (currentUser?.role) setRole([currentUser?.role.title]);

      const rolesList = createListCollection({
        items: roles.filter((role) => role.team?.code === team?.code ),
        itemToString: (item) => item.title,
        itemToValue: (item) => item.title,
      });
      console.log(rolesList);
      setList(selectList);


    }, [currentUser]);

  return (
    <Select.Root
      collection={rolesList}
      size="md"
      value={role}
      positioning={{ sameWidth: true }}
      onValueChange={(d) => {
        setRole(d.value);
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
          {rolesList.items.map((item , i) => (
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
