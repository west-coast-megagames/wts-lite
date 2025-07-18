import {
  Avatar,
  Badge,
  Button,
  Collapsible,
  Flex,
  HStack,
  Input,
  IconButton,
  Stack,
  Text,
  Textarea,
  Wrap,
  WrapItem
} from '@chakra-ui/react'
import { BsChat, BsChatHeart, BsPencil } from 'react-icons/bs'
import { Tags } from '../Tags'
import { PostDate } from '../PostTime'
import { CommentFeed } from '../Comment'
import type { Post } from '~/types/types'
import { a3TOa2Converter, getFlag } from '~/scripts'
import { useSocketContext } from '../../context/SocketContext'
import { useEffect, useState, type SyntheticEvent } from 'react'
import TagInputGroup from '../TagInput/TagInputGroup'
import { BiSave, BiTrash } from 'react-icons/bi'
import { MdPublish } from 'react-icons/md'
import { GiCardDiscard } from 'react-icons/gi'
import { CharacterCountInput } from '../CharCountInput'
import { useAppContext } from '~/components/context/AppContext'
import { toaster } from '~/components/ui/toaster'
import { useMediaContext } from '~/components/context/MediaContext'

export const PostCard = (props: { post: Post, mode?: 'edit'  }) => {
	const { post, mode } = props;
	const [activeMode, setMode] = useState<'view' | 'edit'>(mode ? mode : 'view');
	const [editedPost, setEdit] = useState<Post>(post);
  const [liked, setliked] = useState<boolean>(false);
	const { socketEmit } = useSocketContext();
  const { addPost } = useMediaContext();
  const { user, team } = useAppContext();

	useEffect(() => {
		if (post.status === "New") setMode('edit');
	}, [post])

	const handleTagEdit = (e: SyntheticEvent, tags: string[]) => {
		const newPost = {...editedPost};
		tags.forEach((el: string, i: number) => {
			newPost.tags[i] = el[0].toUpperCase() + el.slice(1);
		});
		setEdit(newPost);
	};

	const handleHeadlineEdit = (value: string) => {
		const newPost = {...editedPost};
		newPost.headline = value;
		setEdit(newPost);
	};

	const handleBodyEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
			const newPost = {...editedPost};
			newPost.body = e.target.value;
		setEdit(newPost);
	}

	const handleDiscard = () => {

	}

	const handleSave = () => {
    let data = {...editedPost}
    data.author = user?._id;
    data.publisher = team?._id;

    socketEmit({ event: 'media', payload: { action: 'post', data } }, (response: {status: string, description: string, data: any}) => {
      const { status, description, data } = response;
      toaster.create({ type: status, description });
      addPost(data);
    })
  }
	
return (
  <Flex
    direction={{ base: "column", md: "row" }}
    borderWidth="1px"
    divideX={{ base: "0", md: "1px" }}
    borderRadius="l3"
    bg="bg"
  >
    <Stack p="6" flex="1">
      <Collapsible.Root>
        <Stack>
          <Stack
            direction={{ base: "column", sm: "row" }}
            align={{ base: "flex-start", sm: "center" }}
            justify="space-between"
          >
            <HStack wrap="wrap">
              {activeMode === "view" && <Tags tags={editedPost.tags} />}
              {activeMode === "edit" && (
                <TagInputGroup tags={editedPost.tags} onTagsChange={handleTagEdit} />
              )}
            </HStack>
            <PostDate date={editedPost.createdAt} />
          </Stack>

          {activeMode === "view" && (
            <Text
              textStyle={{ base: "md", md: "lg" }}
              fontWeight="semibold"
              mt="2"
            >
              {editedPost.headline}
            </Text>
          )}

          {activeMode === "edit" && (
            <CharacterCountInput
              value={editedPost.headline}
              handleChange={handleHeadlineEdit}
              max={100}
            />
          )}

          <Input
            asChild
            disabled={activeMode === "view"}
            value={editedPost.body}
            onChange={handleBodyEdit}
          >
            <Textarea autoresize />
          </Input>

          <Stack
            direction={{ base: "column", md: "row" }}
            fontWeight="medium"
            align={{ base: "flex-start", md: "center" }}
          >
            <HStack>
              <Avatar.Root size="xs">
                <Avatar.Fallback />
                <Avatar.Image src={getFlag(a3TOa2Converter(editedPost.publisher.code))} />
              </Avatar.Root>
              <Text textStyle="sm">
                {editedPost.author?.name}
              </Text>
            </HStack>

            <Wrap>
              {activeMode === "edit" && (
                <WrapItem>
                  <Button variant="ghost" onClick={() => handleSave()}>
                    <BiSave /> Save
                  </Button>
                </WrapItem>
              )}
              {activeMode === "edit" && (
                <WrapItem>
                  <Button variant="ghost">
                    <MdPublish /> Publish
                  </Button>
                </WrapItem>
              )}
              {activeMode === "edit" && editedPost.status === "New" && (
                <WrapItem>
                  <Button variant="ghost" onClick={() => setMode("view")}>
                    <GiCardDiscard /> Discard Changes
                  </Button>
                </WrapItem>
              )}
              {activeMode === "view" && (
                <WrapItem>
                  <Button variant="ghost" onClick={() => setMode("edit")}>
                    <BsPencil /> Edit
                  </Button>
                </WrapItem>
              )}
              {activeMode === "view" && (
                <WrapItem>
                  <Button variant="ghost" color="red">
                    <BiTrash /> Delete
                  </Button>
                </WrapItem>
              )}
            </Wrap>
			  <HStack>
            <Badge variant="surface">{editedPost.status}</Badge>
							<IconButton
				color={`${liked ? "tomato" : ""}`}
				variant={"ghost"}
				onClick={ () => setliked(!liked)}
			  >
				<BsChatHeart />
			  </IconButton>

            <Collapsible.Trigger padding="3">
              <HStack>
                <BsChat />
                {editedPost.comments.length}
              </HStack>
            </Collapsible.Trigger>
			</HStack>

          </Stack>
		  
			  
          <Collapsible.Content>
            {editedPost.comments.map((comment) => (
              <CommentFeed key={comment.body} comment={comment} />
            ))}
          </Collapsible.Content>
        </Stack>
      </Collapsible.Root>
    </Stack>
  </Flex>
	)
}