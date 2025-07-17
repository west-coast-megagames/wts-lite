import {
  Box,
  Button,
  Container,
  Flex,
  Stack,
} from '@chakra-ui/react'
import { BiPlus } from 'react-icons/bi'
import { PostCard } from '../molecules/Post/Post'
import { useMediaContext } from '../context/MediaContext'
import { useAppContext } from '../context/AppContext'
import { toaster } from '../ui/toaster'
import type { Post } from '~/types/types'
import { useEffect, useState } from 'react'

export const MediaFeed = () => {
  const { addPost, mediaFeed } = useMediaContext();
  const { team, user } = useAppContext();
  const [ feed, setFeed ] = useState<Post[]>([]);
  console.log(feed);

  useEffect(() => {
    setFeed([...mediaFeed.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())])
  }, [mediaFeed])
  
  const handleNewPost = () => {
    const now = new Date()
    if (!user) toaster.create({ type: 'error', description: `User is not registered, you must be a registered user to post to the feed...`, duration: 5000 })
    else if (!team) toaster.create({ type: 'error', description: `${user.name} isn't assigned to a team, only team players can post to the feed`, duration: 5000 })
    else {
      console.log('Adding post');
      addPost({
        status: 'New',
        _id: `${feed.length + 1}`,
        publisher: team.code,
        headline: '',
        body:
          "",
        author: user,
        createdAt: now.toISOString(),
        comments: [],
        tags: [],
      })
    }
  }
  
  return (
    <Container maxW="6xl" py={{ base: '4', md: '8' }}>
      <Stack gap="4">
        <Flex borderWidth="1px" divideX="1px" borderRadius="l3" bg="bg" justify='space-between'>
          <Button variant={'ghost'} onClick={ () => handleNewPost() }><BiPlus />Add Post</Button>
        </Flex>
        <Box scrollbar="hidden" overflowY='scroll' h="80vh">
        <Stack gap="4">
          {feed.map((item) => (
            <PostCard key={item._id} post={item} />
          ))}
        </Stack>
        </Box>
      </Stack>
    </Container>
  )
};