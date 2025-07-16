import { Avatar, HStack, Stack, Text } from '@chakra-ui/react'
import type { T } from '~/img/flags'
import { getFlag } from '~/scripts'
import type { Team } from '~/types/types'

export const TeamAvatar = (props: { team: Team}) => {
  const { team } = props

  return (
    <HStack>
      <Avatar.Root size="2xl">
        <Avatar.Fallback />
        <Avatar.Image src={getFlag(team.code as T)} />
      </Avatar.Root>
      <Stack>
        <Text textStyle="md" colorPalette="gray">
            { team.name }
        </Text>
        <Text color="fg.muted" textStyle="sm">
          {team.shortName}
        </Text>
      </Stack>
    </HStack>
  )
}
