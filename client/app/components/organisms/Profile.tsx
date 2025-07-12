import { Button, Container, Field, Input, Stack, Text } from '@chakra-ui/react'
import { FormSection } from '../molecules/FormSection'
import { TeamSelect } from '../molecules/TeamSelect'

export const Profile = () => {

  return (
    <Container maxW="4xl">
      <Stack gap="10">
        <form>
          <FormSection title="Profile Information" description="Update your profile information">
            <Field.Root>
              <Field.Label>Username</Field.Label>
              <Input name="name" />
            </Field.Root>
            <Field.Root>
              <Field.Label>Team</Field.Label>
              <Input name="email" />
            </Field.Root>
            <TeamSelect />
            <Button>Save</Button>
          </FormSection>
        </form>

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
}
