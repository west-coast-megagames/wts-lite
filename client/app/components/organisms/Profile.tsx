import { Button, Container, Field, Input, Stack, Text } from '@chakra-ui/react'
import { FormSection } from '../molecules/FormSection'
import { TeamSelect } from '../molecules/TeamSelect'
import { RoleSelect } from '../molecules/RoleSelect'
import { useAppContext } from '../context/AppContext'
import { useState } from 'react'
import type { User } from '~/types/types'
import { useDrawerContext } from '../context/DrawerContext'
import { server } from '~/config'
import { toaster } from '../ui/toaster'

export const Profile = () => {
  const { team: currentTeam, user: currentUser, role: currentRole, selectUser } = useAppContext();
  const { closeDrawer } = useDrawerContext();
  const [updateUser, setUser] = useState<User>(currentUser ? currentUser : { _id: '', name: '' });

  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    const update = {...updateUser, name: e.target.value};
    console.log(e)
    setUser(update);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${server}api/users`, { // Replace with your API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({...updateUser, role: currentRole?._id}),
      });

      if (!response.ok) {
        // Handle HTTP errors (e.g., 404, 500)
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong with the request.');
      }

      const data = await response.json();
      console.log(data);
      toaster.create({ type: 'success', description: `User created for ${data.name}`});
      selectUser(data);
      closeDrawer();
    } catch (err) {
      // Handle network errors or errors thrown from the response.ok check
      toaster.create({ type: 'error', description: 'Error submitting data: ' + err.message});
    }
  };
  

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