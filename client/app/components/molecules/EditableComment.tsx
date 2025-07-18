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


export const EditableComment = (props: { comment: Comment }) => {
  const { comment } = props;
  // const [liked, setliked] = useState<boolean>(false);
  const [expanded, setExpanded] = useState<boolean>(false);
  const { user, team } = useAppContext();


  return (
      <Box pos="relative">
        { comment.replies.length > 0 && expanded && 
        <Box pos="absolute" width="2px" left="8" top="12" bottom="0" bg="border" /> }
        <Flex gap="2" ps="4" pt="2" as="article" tabIndex={-1}>
          <Avatar.Root size="sm">
            <Avatar.Fallback name={comment.user.name} />
            {/* <Avatar.Image src={getFlag(comment.user.team.code as T)} /> */}
          </Avatar.Root>
         <Stack>
            <Box bg="bg.muted" rounded="l3" py="2" px="3">
              <Text textStyle="sm" fontWeight="semibold">
                {comment.user.name} | {comment.user.role?.title}
              </Text>
              </Box>
              <Box textStyle="sm" color="fg.muted">
             <Textarea variant="outline" placeholder="enter comment here..." />
             </Box>
        </Stack>
    </Flex>
    </Box>
  )
}