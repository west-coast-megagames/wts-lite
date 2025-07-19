import {
  Box,
  Button,
  Container,
  Flex,
  Stack,
} from '@chakra-ui/react'
import { BiPlus, BiRefresh } from 'react-icons/bi'
import { PostCard } from '../molecules/Post/Post'
import { useMediaContext } from '../context/MediaContext'
import { useAppContext } from '../context/AppContext'
import { toaster } from '../ui/toaster'
import type { Post } from '~/types/types'
import { useEffect, useState } from 'react'
import { FaDumpsterFire } from 'react-icons/fa'

export const MediaFeed = () => {
  const { deletePost, refreshFeed, wipeFeed, mediaFeed } = useMediaContext();
  const { team, user } = useAppContext();
  const [ newPost, setNewPost ] = useState<Post | undefined>(undefined);

  useEffect(() => {
    refreshFeed();
  }, [])
  
  const handleNewPost = () => {
    const now = new Date()
    if (!user) toaster.create({ type: 'error', description: `User is not registered, you must be a registered user to post to the feed...`, duration: 5000 })
    else if (!team) toaster.create({ type: 'error', description: `${user.name} isn't assigned to a team, only team players can post to the feed`, duration: 5000 })
    else {
      setNewPost({
        status: 'New',
        _id: `${mediaFeed.length + 1}`,
        team,
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

  const handleDeletePost = (post: Post) => {
    if (post.status === "New") setNewPost(undefined);
    else deletePost(post);
  }

  const handleSave = () => {
      setNewPost(undefined);
      refreshFeed();
  }
  
  return (
    <Container maxW="6xl" py={{ base: '4', md: '8' }}>
      <Stack gap="4">
        <Flex borderWidth="1px" divideX="1px" borderRadius="l3" bg="bg" justify='space-between'>
          <Button variant={'ghost'} onClick={ () => handleNewPost() }><BiPlus />Add Post</Button>
          <Button variant={'ghost'} onClick={ () => refreshFeed() }><BiRefresh />Refresh Feed</Button>
          { team?.code === "DEV" && <Button variant={'ghost'} onClick={ () => wipeFeed() }><FaDumpsterFire /></Button> }
        </Flex>
        <Box scrollbar="hidden" overflowY='scroll' h="80vh">
        <Stack gap="4">
          { newPost && <PostCard key={newPost._id} post={newPost} onDelete={handleDeletePost} onSave={handleSave} /> }
          {mediaFeed.filter((el) => el.status !== 'New' ).map((item) => (
            <PostCard key={item._id} post={item} onDelete={handleDeletePost} onSave={handleSave} />
          ))}
        </Stack>
        </Box>
      </Stack>
    </Container>
  )
};