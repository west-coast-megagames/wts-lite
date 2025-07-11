import { Avatar, Badge, Box, Container, Flex, HStack, Icon, Link, Stack, Text, IconButton, VStack, Collapsible } from '@chakra-ui/react'
import { useState } from 'react';
import { BsChat, BsChatHeart } from "react-icons/bs"
import type { T } from '~/img/flags';
import { getFlag } from '~/scripts';
import type { Comment } from '~/types/types';


export const CommentFeed = (props: { comment: Comment }) => {
  const { comment } = props;
  const [liked, setliked] = useState<boolean>(false);

  return (
    <Container width="full" alignContent="start" py="4">
      <Collapsible.Root>
      <Box pos="relative">
        { comment.replies.length > 0 && <Box pos="absolute" width="2px" left="8" top="12" bottom="0" bg="border" /> }
        <Flex gap="2" ps="4" pt="2" as="article" tabIndex={-1}>
          <Avatar.Root size="sm">
            <Avatar.Fallback name={comment.user.name} />
            <Avatar.Image src={getFlag(comment.user.team as T)} />
          </Avatar.Root>
          <Stack>
            <Box bg="bg.muted" rounded="l3" py="2" px="3">
              <Text textStyle="sm" fontWeight="semibold">
                {comment.user.name} | {comment.user.role}
              </Text>
              <Box textStyle="sm" color="fg.muted">
                {comment.body}
              </Box>
            </Box>
            <HStack fontWeight="semibold" textStyle="xs" ps="2">
              <Link color="fg.muted">1d</Link>
              <IconButton
                color={`${liked ? "tomato" : ""}`}
                variant={"ghost"}
                onClick={ () => setliked(!liked)}
              >
                <BsChatHeart />
              </IconButton>
              <Link color="fg.muted">Reply</Link>
              <Collapsible.Trigger  padding="3">
              <Link color="fg.muted">
                <HStack>
                  <BsChat />
                  {comment.replies.length}
                </HStack>
              </Link>
              </Collapsible.Trigger>
            </HStack>
          </Stack>
        </Flex>
      </Box>
      <Collapsible.Content>
        { comment.replies.map((el, i) => (
          <Box pos="relative" pt="2">
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
            {i !== comment.replies.length - 1 && <Box pos="absolute" width="2px" left="8" top="6" bottom="0" bg="border" />}
            <Flex gap="2" ps="14" pt="2" as="article" tabIndex={-1}>
              <Avatar.Root size="xs">
                <Avatar.Fallback name={el.user.name} />
                <Avatar.Image src={getFlag(el.user.team as T)} />
              </Avatar.Root>
              <Stack>
                <Box bg="bg.muted" rounded="l3" py="2" px="3">
                  <HStack textStyle="sm" fontWeight="semibold">
                    {el.user.name} | {el.user.role}
                    {/* <Badge size="xs" variant="solid">
                      Author
                    </Badge> */}
                  </HStack>
                  <Box textStyle="sm" color="fg.muted">
                    {el.body}
                  </Box>
                </Box>
                <HStack fontWeight="semibold" textStyle="xs" ps="2">
                  <Link color="fg.muted">1d</Link>
                  <Icon size="md" color="tomato">
                    <BsChatHeart />
                    </Icon>
                  <Link color="fg.muted">Like</Link>
                </HStack>
              </Stack>
            </Flex>
          </Box>
          ))}
        </Collapsible.Content>
      </Collapsible.Root>
    </Container>
  )
}