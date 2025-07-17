import { Button, Container, Field, Input, Stack, Text } from '@chakra-ui/react'
import { FormSection } from '../molecules/FormSection'
import { TeamSelect } from '../molecules/TeamSelect'
import { RoleSelect } from '../molecules/RoleSelect'
import { useAppContext } from '../context/AppContext'
import { useState } from 'react'
import type { User } from '~/types/types'
import { useDrawerContext } from '../context/DrawerContext'

export const Profile = () => {
  const { team: currentTeam, user: currentUser, selectUser } = useAppContext();
  const { closeDrawer } = useDrawerContext();
  const [updateUser, setUser] = useState<User>(currentUser ? currentUser : { _id: '', name: '' });

  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    const update = {...updateUser, name: e.target.value};
    console.log(e)
    setUser(update);
  };

  const handleSubmit = () => {
    selectUser(updateUser);
    closeDrawer();
  }

  return (
    <Container maxW="4xl">
      <Stack gap="10">
        <FormSection title="Profile Information" description="Update your profile information">
          <Field.Root>
            <Field.Label>Username</Field.Label>
            <Input placeholder='Enter Screename' value={updateUser.name} onChange={handleUsername} />
          </Field.Root>
          <TeamSelect />
          {currentTeam && <RoleSelect />}
          <Button w="full" onClick={ () => handleSubmit() }>Update Profile</Button>
        </FormSection>

        <form>
          <FormSection title="Password" description="Update your password">
            <Field.Root>
              <Field.Label>Current password</Field.Label>
              <Input type="password" name="currentPassword" />
            </Field.Root>
            <Field.Root>
              <Field.Label>New password</Field.Label>
              <Input type="password" name="newPassword" />
            </Field.Root>
            <Button>Save</Button>
          </FormSection>
        </form>

        <FormSection title="Danger Zone" description="Delete your account">
          <Text color="fg.muted">
            Once you delete your account, there is no going back. All of your information will be
            lost. Before you go, please download your information.
          </Text>
          <Button colorPalette="red">Delete account</Button>
        </FormSection>
      </Stack>
    </Container>
  )
};