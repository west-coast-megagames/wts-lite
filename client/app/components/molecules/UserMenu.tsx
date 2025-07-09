import { Avatar, Menu, Portal } from '@chakra-ui/react'
import { LuCircleHelp, LuLogIn, LuLogOut, LuSettings, LuUser } from 'react-icons/lu'
import { getFlag } from '~/scripts'
import { useSocketContext } from '../context/SocketContext'

export const UserMenu = () => {
  const { initConnection, socketOnline } = useSocketContext();
  return (
    <Menu.Root positioning={{ placement: 'bottom' }}>
      <Menu.Trigger rounded="full">
        <Avatar.Root>
          <Avatar.Fallback />
          <Avatar.Image src={getFlag('aa')} />
        </Avatar.Root>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.Item value="profile">
              <LuUser />
              Profile
            </Menu.Item>
            <Menu.Item value="settings">
              <LuSettings />
              Settings
            </Menu.Item>
            <Menu.Item value="help">
              <LuCircleHelp />
              Help & Support
            </Menu.Item>
            <Menu.Separator />
            {socketOnline && <Menu.Item value="logout">
              <LuLogOut /> Logout
            </Menu.Item>}
            {!socketOnline && <Menu.Item value="login" onClick={ () => initConnection({ username: 'John', self: true, id: 'Temp', team: 'Nexus', role: 'Developer' })}>
              <LuLogIn /> Login
            </Menu.Item>}
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  )
}