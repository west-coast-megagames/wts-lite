import { Link, Stack, type StackProps } from '@chakra-ui/react'
import { useState } from 'react'
import { useDrawerContext, type DrawerTypes } from '../context/DrawerContext';

export const NavbarLinks = (props: StackProps) => {
  const [ current, updateCurrent ] = useState<string>("");
  const { setDrawer } = useDrawerContext();
  return (
    <Stack direction={{ base: 'column', md: 'row' }} gap={{ base: '6', md: '8' }} {...props}>
      {['Dashboard', 'Reports', "Newsroom", 'candy'].map((item: string) => (
        <Link
          key={item}
          fontWeight="medium"
          color="fg.muted"
          aria-current={item === current ? 'page' : undefined}
          onClick={() => {updateCurrent(item); setDrawer(item.toLowerCase() as DrawerTypes) }}
          _hover={{
            _hover: { color: 'colorPalette.fg', textDecoration: 'none' },
          }}
          _currentPage={{ color: 'colorPalette.fg' }}
        >
          {item}
        </Link>
      ))}
    </Stack>
  )
}
