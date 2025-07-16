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
    const [ role, setRole ] = useState<string[]>([rolesArray[0].title]);
    const { team, user: currentUser } = useAppContext();

    useEffect(() => {
      if (currentUser?.role) setRole([currentUser?.role.title]);

    }, [currentUser]);

  return (
    <Select.Root
      collection={rolesList}
      size="md"
      defaultValue={role}
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
          {rolesList.items.filter((role) => role.countrycode === team?.code ).map((item,i) => (
            <Select.Item item={item} key={item.title+i} justifyContent="flex-start">
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

const rolesArray = [
      {
        countrycode: "USA",
        title: "President",
        type: "Head of State",
      },
      {
        countrycode: "USA",
        title: "Vice President",
        type: "Head of State",
      },
      {
        countrycode: "USA",
        title: "Secretary of States",
        type: "Diplomat",
      },
      {
        
        countrycode: "JPN",
        title: "UN Ambassador",
        type: "Ambassador",
      },
      {
        countrycode: "JPN",
        title: "Scientific Advisor",
        type: "Scientist",
      },
      {
        countrycode: "JPN",
        title: "Commander of Strategic Forces & Space Command",
        type: "Military",
      },
      {
        countrycode: "JPN",
        title: "Commander of the Military",
        type: "Military",
      },
      {
        countrycode: "USA",
        title: "Senior Diplomat",
        type: "Diplomat",
      },
      {
        countrycode: "USA",
        title: "Senior Diplomat",
        type: "Diplomat",
      },
      {
        countrycode: "USA",
        title: "Head of the Joint Chiefs of Staff",
        type: "Military",
      }
    ]

const rolesList = createListCollection({
  items: rolesArray,
  itemToString: (item) => item.title,
  itemToValue: (item) => item.title,
});

