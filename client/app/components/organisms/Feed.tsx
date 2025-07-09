import {
  Avatar,
  Badge,
  Container,
  Flex,
  HStack,
  Spacer,
  Stack,
  Status,
  Text,
  VStack,
} from '@chakra-ui/react'
import { BsChat, BsChevronUp } from 'react-icons/bs'
import { Tags } from '../molecules/Tags'
import { PostDate } from '../molecules/PostTime'
import { Comment } from '../molecules/Comment'

export const MediaFeed = () => {
  return (
    <Container maxW="6xl" py={{ base: '8', md: '12' }}>
      <Stack gap="4">
        {feeds.map((feed) => (
          <Flex key={feed.id} borderWidth="1px" divideX="1px" borderRadius="l3" bg="bg">
            <Stack p="6" flex="1">
              <HStack>
                <Badge variant="surface" alignSelf="flex-start">
                  In Progress
                </Badge>
                <Spacer />
                <PostDate date={feed.createdAt} />
              </HStack>
              <Text textStyle="lg" fontWeight="semibold" mt="2">
                {feed.headline}
              </Text>
              <Text color="fg.muted" lineClamp={2}>
                {feed.body}
              </Text>
              <HStack fontWeight="medium" mt="4">
                <HStack>
                  <Avatar.Root size="xs">
                    <Avatar.Fallback />
                    <Avatar.Image src={feed.authorImage} />
                  </Avatar.Root>
                  <Text textStyle="sm" hideBelow="sm">
                    {feed.author?.name} | {feed.author.role}
                  </Text>
                </HStack>
                <Spacer />

                <HStack gap="4">
                  <Tags tags={feed.tags} />
                </HStack>
                <HStack gap="1">
                  <BsChat />
                  <Text textStyle="sm" color="fg.muted">
                    {feed.comments}
                  </Text>
                </HStack>
              </HStack>
              <Comment />
            </Stack>
            <VStack px="4" justify="center" flexShrink="0">
              <BsChevronUp />
              <Text textStyle="sm" fontWeight="semibold">
                {feed.upvotes}
              </Text>
            </VStack>
          </Flex>
        ))}
      </Stack>
    </Container>
  )
}

const feeds = [
  {
    status: 'In Progress',
    id: '1',
    publisher: "United States",
    headline: 'How to setup theming system in Chakra UI',
    body:
      "I'm trying to customize the theme in Chakra UI but having trouble understanding how to properly extend the default theme.",
    author: {
      name: 'John Doe',
      role: "Head of State"
    },
    createdAt: "2025-07-06Z14:22",
    comments: 12,
    upvotes: 24,
    tags: ['Theming', 'Moo'],
  },
  {
    status: 'Open',
    id: '2',
    headline: 'Dark mode implementation in Chakra UI',
    body:
      'Looking for guidance on implementing dark mode in my Chakra UI application. Should I use the built-in color mode hook or create custom theme variants.',
    authorName: 'Sarah Chen',
    author: {
      name: 'Sarah Chen',
      role: "Diplomat"
    },
    createdAt: "2025-07-08",
    comments: 8,
    upvotes: 24,
    tags: ['Dark Mode'],
  },
  {
    status: 'Open',
    id: '3',
    headline: 'Roadmap for v3',
    body:
      'We are planning the next major version of Chakra UI. Looking for community feedback on desired features, breaking changes, and overall direction. Share your thoughts on what you would like to see in v3.',
    authorName: 'Mark Wilson',
    author: {
      name: 'Mark Wilson',
      role: "Control"
    },
    authorImage: 'https://i.pravatar.cc/300?u=mw',
    createdAt: "2025-07-01",
    comments: 24,
    upvotes: 16,
    tags: ['Planning'],
  },
]
