import {
  Button,
  Container,
  Flex,
  Stack,
} from '@chakra-ui/react'
import { BiPlus } from 'react-icons/bi'
import { PostCard } from '../molecules/Post/Post'
import { useMediaContext } from '../context/MediaContext'
import { useAppContext } from '../context/AppContext'

export const MediaFeed = () => {
  const { addPost, mediaFeed } = useMediaContext();
  const { team, user } = useAppContext()
  console.log(mediaFeed);
  
  const handleNewPost = () => {
    const now = new Date()
    if (!team || !user) console.error('Issue with user registration')
    else {
      console.log('Adding post');
      addPost({
        status: 'New',
        _id: '001',
        publisher: 'us',
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
        {mediaFeed.sort((a, b) => {
          const dateA = new Date(a.createdAt).getMilliseconds();
          const dateB = new Date(b.createdAt).getMilliseconds();
          return dateB - dateA
        }).map((item) => (
          <PostCard key={item._id} post={item} />
        ))}
      </Stack>
    </Container>
  )
};