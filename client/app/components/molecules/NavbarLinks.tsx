import { Stack, Text, type StackProps } from '@chakra-ui/react'
import { useState } from 'react'
import { useDrawerContext } from '../context/DrawerContext';
import { type DrawerTypes } from '~/types/types';
import { NavLink } from 'react-router';

const getLink = (link: string) => {
  switch (link) {
    case("World Map"):
      return "/map";
    case("Newsroom"):
      return "/feed";
    default:
      return "/feed";
  }
} 

export const NavbarLinks = (props: StackProps) => {
  const [ current, updateCurrent ] = useState<string>("");
  const { setDrawer } = useDrawerContext();
  

  return (
    <Stack direction={{ base: 'column', md: 'row' }} gap={{ base: '6', md: '8' }} {...props}>
      {['World Map', "Newsroom", 'Dashboard'].map((item: string) => (
        <NavLink key={item} to={getLink(item)} onClick={() => {updateCurrent(item); setDrawer(item.toLowerCase() as DrawerTypes);}}>
          <Text
            fontWeight="medium"
            color="fg.muted"
            aria-current={item === current ? 'page' : undefined}
            _hover={{
              _hover: { color: 'colorPalette.fg', textDecoration: 'none' },
            }}
            _currentPage={{ color: 'colorPalette.fg' }}
          >
            {item}
          </Text>
        </NavLink>
      ))}
    </Stack>
  )
}
