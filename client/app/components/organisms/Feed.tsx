import {
  Avatar,
  Badge,
  Collapsible,
  Container,
  Flex,
  HStack,
  IconButton,
  Spacer,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { BsChat, BsChevronUp } from 'react-icons/bs'
import { Tags } from '../molecules/Tags'
import { PostDate } from '../molecules/PostTime'
import { CommentFeed } from '../molecules/Comment'
import { Tooltip } from "../ui/tooltip"
import { BiPlus } from 'react-icons/bi'
import type { Post } from '~/types/types'
import { getFlag } from '~/scripts'

export const MediaFeed = () => {
  return (
    <Container maxW="6xl" py={{ base: '4', md: '8' }}>
      <Stack gap="4">
        <Flex borderWidth="1px" divideX="1px" borderRadius="l3" bg="bg" justify='space-between'>
          <IconButton paddingX={4} variant={'ghost'}>
            <BiPlus />
            Add Post
          </IconButton>
        </Flex>
        {feeds.map((feed) => (
          <Flex key={feed._id} borderWidth="1px" divideX="1px" borderRadius="l3" bg="bg">
            <Stack p="6" flex="1">
              <Collapsible.Root>
              <HStack>
                <Badge variant="surface" alignSelf="flex-start">
                  {feed.status}
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
                    <Avatar.Image src={getFlag('us')} />
                  </Avatar.Root>
                  <Text textStyle="sm" hideBelow="sm">
                    {feed.author?.name} | {feed.author.role}
                  </Text>
                </HStack>
                <Spacer />

                <HStack gap="4">
                  <Tags tags={feed.tags} />
                </HStack>
                <Collapsible.Trigger  padding="3">
                  <HStack>
                    <BsChat />
                    {feed.comments.length}
                  </HStack>
                </Collapsible.Trigger>
              </HStack>
              <Collapsible.Content>
                {feed.comments.map(comment => <CommentFeed comment={comment} /> ) }
              </Collapsible.Content>
              </Collapsible.Root>
            </Stack>
            <VStack px="4" justify="center" flexShrink="0">
              <BsChevronUp />
              <Tooltip content="Upvote">              
                <Text textStyle="sm" fontWeight="semibold">
                  {feed.upvotes} 
                </Text>
              </Tooltip>
            </VStack>
          </Flex>
        ))}
      </Stack>
    </Container>
  )
}

const feeds: Post[] = [
  {
    status: 'In Progress',
    _id: '01',
    publisher: "United States",
    headline: 'How to setup theming system in Chakra UI',
    body:
      "I'm trying to customize the theme in Chakra UI but having trouble understanding how to properly extend the default theme.",
    author: {
      _id: '01',
      name: 'John Doe',
      role: "Head of State",
      team: 'us'
    },
    createdAt: "2025-07-06Z14:22",
    comments: [
      {
        user: {
          _id: '01',
          name: 'John Doe',
          role: 'Random Dude',
          team: 'us'
        },
        body: "This is a great feature request! I've been looking for something similar. The current theming system could definitely use some improvements in terms of customization options.",
        replies: [
          {
            user: {
              _id: '02',
              name: 'Emily Smith',
              role: 'Random Gal',
              team: 'ru'
            },
            body: "Thank you for the suggestion! I'll look into it and get back to you soon.",
            replies: [],
          },
          {
            user: {
              _id: '02',
              name: 'Jay Quick',
              role: 'Second Awesome',
              team: 'au'
            },
            body: "I made another comment",
            replies: [],
          },
        ]
      },
      {
        user: {
          _id: '01',
          name: 'John Doe',
          role: 'Random Dude',
          team: 'us'
        },
        body: "This sucks ass",
        replies: []
      }
    ],
    upvotes: 24,
    tags: ['Theming', 'Moo'],
  },
  // {
  //   status: 'Open',
  //   id: '2',
  //   headline: 'Dark mode implementation in Chakra UI',
  //   body:
  //     'Looking for guidance on implementing dark mode in my Chakra UI application. Should I use the built-in color mode hook or create custom theme variants.',
  //   authorName: 'Sarah Chen',
  //   author: {
  //     name: 'Sarah Chen',
  //     role: "Diplomat"
  //   },
  //   createdAt: "2025-07-08",
  //   comments: [],
  //   upvotes: 24,
  //   tags: ['Dark Mode'],
  // },
  // {
  //   status: 'Open',
  //   id: '3',
  //   headline: 'Roadmap for v3',
  //   body:
  //     'We are planning the next major version of Chakra UI. Looking for community feedback on desired features, breaking changes, and overall direction. Share your thoughts on what you would like to see in v3.',
  //   authorName: 'Mark Wilson',
  //   author: {
  //     name: 'Mark Wilson',
  //     role: "Control"
  //   },
  //   authorImage: 'https://i.pravatar.cc/300?u=mw',
  //   createdAt: "2025-07-01",
  //   comments: [],
  //   upvotes: 16,
  //   tags: ['Planning'],
  // },
]
