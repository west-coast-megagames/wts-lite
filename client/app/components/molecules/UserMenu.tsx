import { Avatar, Menu, Portal } from '@chakra-ui/react'
import { LuCircleHelp, LuLogIn, LuLogOut, LuSettings, LuUser } from 'react-icons/lu'
import { a3TOa2Converter, getFlag } from '~/scripts'
import { useSocketContext } from '../context/SocketContext'
import { useDrawerContext } from '../context/DrawerContext'
import { useAppContext } from '../context/AppContext'

export const UserMenu = () => {
  const { initConnection, socketOnline, socketLogoff } = useSocketContext();
  const { setDrawer } = useDrawerContext();
  const { team } = useAppContext();
  return (
    <Menu.Root positioning={{ placement: 'bottom' }}>
      <Menu.Trigger rounded="full">
        <Avatar.Root>
          <Avatar.Fallback />
          <Avatar.Image src={team ? getFlag(a3TOa2Converter(team?.code)) : undefined} />
        </Avatar.Root>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.Item value="profile" onClick={ () => setDrawer('profile') }>
              <LuUser />
              Profile
            </Menu.Item>
            <Menu.Item value="settings">
              <LuSettings />
              Settings
            </Menu.Item>
            {/* <Menu.Item value="help">
              <LuCircleHelp />
              Help & Support
            </Menu.Item> */}
            <Menu.Separator />
            {socketOnline && <Menu.Item value="logout" onClick={ () => socketLogoff() } >
              <LuLogOut /> Logout
            </Menu.Item>}
            {!socketOnline && <Menu.Item value="login" onClick={ () => initConnection({ username: 'John', self: true, userID: 'Temp', team: 'Nexus', role: 'Developer' })}>
              <LuLogIn /> Login
            </Menu.Item>}
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  )
}