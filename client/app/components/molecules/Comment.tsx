import { Avatar, Box, Container, Flex, HStack, Icon, Link, Stack, Text, IconButton, Collapsible, Textarea } from '@chakra-ui/react'
import { useState } from 'react';
import { BsChat, BsChatHeart } from "react-icons/bs"
import type { T } from '~/img/flags';
import { getFlag } from '~/scripts';
import type { Comment } from '~/types/types';
import { Reply } from './Reply';
import { useMediaContext } from '../context/MediaContext';
import { toaster } from '../ui/toaster';
import { useAppContext } from '../context/AppContext';
import { EditableReply } from './EditableReply';


export const Comment = (props: { comment: Comment }) => {
  const { comment } = props;
  // const [liked, setliked] = useState<boolean>(false);
  const [expanded, setExpanded] = useState<boolean>(false);
  const [ fakeComment, setFakeComment ] = useState<Comment | undefined>(); 
  const { user, team } = useAppContext();

   const handleNewReply = () => {
      if (!user) toaster.create({ type: 'error', description: `User is not registered, you must be a registered user to post to the feed...`, duration: 5000 })
      else if (!team) toaster.create({ type: 'error', description: `${user.name} isn't assigned to a team, only team players can post to the feed`, duration: 5000 })
      else {
        console.log('Adding reply');
        setFakeComment({ user, body: "", replies: []})
      }
    }

  return (
    <Container width="full" alignContent="start" py="4">
      <Collapsible.Root>
      <Box pos="relative">
        { comment.replies.length > 0 && expanded && <Box pos="absolute" width="2px" left="8" top="12" bottom="0" bg="border" /> }
                { fakeComment && <Box pos="absolute" width="2px" left="8" top="12" bottom="0" bg="border" /> }
        <Flex gap="2" ps="4" pt="2" as="article" tabIndex={-1}>
          <Avatar.Root size="sm">
            <Avatar.Fallback name={comment.user.name} />
            <Avatar.Image src={getFlag(comment.user.team.code as T)} />
          </Avatar.Root>
          <Stack>
            <Box bg="bg.muted" rounded="l3" py="2" px="3">
              <Text textStyle="sm" fontWeight="semibold">
                {comment.user.name} | {comment.user.role?.title}
              </Text>
              <Box textStyle="sm" color="fg.muted">
                {comment.body}
              </Box>
            </Box>
            <HStack fontWeight="semibold" textStyle="xs" ps="2">
              {/* <Link color="fg.muted">1d</Link> */}
              {/* <IconButton
                color={`${liked ? "tomato" : ""}`}
                variant={"ghost"}
                onClick={ () => setliked(!liked)}
              >
                <BsChatHeart />
              </IconButton> */}
              <Link color="fg.muted" onClick={() => handleNewReply()}>Reply</Link> 
              <Collapsible.Trigger onClick={() => setExpanded(!expanded)} padding="3">
              <Link color="fg.muted">
                <IconButton variant={"ghost"}><BsChat />{comment.replies.length}</IconButton>
              </Link>
              </Collapsible.Trigger>
            </HStack>
          </Stack>
        </Flex>
      </Box>
        { fakeComment && <EditableReply reply={fakeComment} replytree={expanded ? comment.replies.length : 0} i={-1} /> }
      <Collapsible.Content>
        { comment.replies.map((el, i) => (
            <Reply reply={el} replytree={comment.replies.length} i={i} />
          ))}
        </Collapsible.Content>
      </Collapsible.Root>
    </Container>
  )
}