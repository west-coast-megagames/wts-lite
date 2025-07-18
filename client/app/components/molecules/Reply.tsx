import { Avatar, Box, Container, Flex, HStack, Icon, Link, Stack, Text, IconButton, Collapsible, Textarea } from '@chakra-ui/react'
import { useState } from 'react';
import { BsChat, BsChatHeart } from "react-icons/bs"
import type { T } from '~/img/flags';
import { getFlag } from '~/scripts';
import type { Comment } from '~/types/types';


export const Reply = (props: { reply: Comment, replytree:number, i:number }) => {
  const { reply, replytree, i} = props;
  // const [liked, setliked] = useState<boolean>(false);
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
  <Box key={reply.body} pos="relative" pt="2">
            <Box
              pos="absolute"
              width="5"
              height="8"
              left="8"
              top="0"
              bottom="0"
              roundedBottomLeft="l3"
              borderStartWidth="2px"
              borderBottomWidth="2px"
            />
            {i !== replytree - 1 && <Box pos="absolute" width="2px" left="8" top="6" bottom="0" bg="border" />}
            <Flex gap="2" ps="14" pt="2" as="article" tabIndex={-1}>
              <Avatar.Root size="xs">
                <Avatar.Fallback name={reply.user.name} />
                <Avatar.Image src={getFlag(reply.user.team.code as T)} />
              </Avatar.Root>
              <Stack>
                <Box bg="bg.muted" rounded="l3" py="2" px="3">
                  <HStack textStyle="sm" fontWeight="semibold">
                    {reply.user.name} | {reply.user.role}
                    {/* <Badge size="xs" variant="solid">
                      Author
                    </Badge> */}
                  </HStack>
                  <Box textStyle="sm" color="fg.muted">
                    {reply.body}
                  </Box>
                </Box>
                {/* <HStack fontWeight="semibold" textStyle="xs" ps="2">
                  <Link color="fg.muted">1d</Link>
                  {/* <Icon size="md" color="tomato">
                    <BsChatHeart />
                    </Icon> */}
                  {/* <Link color="fg.muted">Like</Link>
                </HStack> */}
              </Stack>
            </Flex>
          </Box>
    )
}