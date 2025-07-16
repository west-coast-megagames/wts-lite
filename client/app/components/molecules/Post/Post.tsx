import {
  Avatar,
  Badge,
  Button,
  Collapsible,
  Flex,
  HStack,
  Input,
  Spacer,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react'
import { BsChat, BsPencil } from 'react-icons/bs'
import { Tags } from '../Tags'
import { PostDate } from '../PostTime'
import { CommentFeed } from '../Comment'
import type { Post } from '~/types/types'
import { getFlag } from '~/scripts'
import { useSocketContext } from '../../context/SocketContext'
import { useState, type SyntheticEvent } from 'react'
import TagInputGroup from '../TagInput/TagInputGroup'
import { BiSave, BiTrash } from 'react-icons/bi'
import { MdPublish } from 'react-icons/md'
import { GiCardDiscard } from 'react-icons/gi'
import { CharacterCountInput } from '../CharCountInput'

export const PostCard = (props: { post: Post, mode?: 'edit'  }) => {
	const { post, mode } = props;
	const [activeMode, setMode] = useState<'view' | 'edit'>(mode ? mode : 'view');
	const [editedPost, setEdit] = useState<Post>(post);
	const { socketEmit } = useSocketContext();

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

	const handleSave = () => socketEmit({ event: 'media', payload: { action: 'post', data: editedPost } })
	
	return (
		<Flex borderWidth="1px" divideX="1px" borderRadius="l3" bg="bg">
			<Stack p="6" flex="1">
			<Collapsible.Root>
			<HStack>
				<HStack gap="4">
					{ activeMode === 'view' && <Tags tags={editedPost.tags} /> }
					{ activeMode === 'edit' && <TagInputGroup tags={editedPost.tags} onTagsChange={handleTagEdit} /> }
				</HStack>
				<Spacer />
				<PostDate date={editedPost.createdAt} />
			</HStack>
				{ activeMode === 'view' && <Text textStyle="lg" fontWeight="semibold" mt="2">
					{editedPost.headline}
				</Text> }
				{ activeMode === 'edit' && <CharacterCountInput value={editedPost.headline} handleChange={handleHeadlineEdit} max={100}/> }
				<Input asChild disabled={activeMode === 'view'}value={editedPost.body} onChange={handleBodyEdit}>
				<Textarea autoresize/>
			</Input>
			<HStack fontWeight="medium" mt="4">
					<HStack>
					<Avatar.Root size="xs">
							<Avatar.Fallback />
							<Avatar.Image src={getFlag('us')} />
					</Avatar.Root>
					<Text textStyle="sm" hideBelow="sm">
							{editedPost.author?.name}
					</Text>
					</HStack>
					<Spacer />
					<HStack>
						{ activeMode === 'edit' && <Button variant='ghost' onClick={ () => handleSave() }>
							<BiSave /> Save
						</Button> }
						{ activeMode === 'edit' && <Button variant='ghost'>
							<MdPublish /> Publish
						</Button> }
						{ activeMode === 'edit' && editedPost.status === 'New' &&  <Button variant='ghost' onClick={() => { setMode('view') } }>
							<GiCardDiscard /> Discard Changes
						</Button> }
						{ activeMode === 'view' && <Button variant='ghost' onClick={() => setMode('edit')}>
							<BsPencil /> Edit
						</Button> }
						{ activeMode === 'view' && <Button variant='ghost' color='red'>
							<BiTrash /> Delete
						</Button> }
					</HStack>
					<Spacer />
					<Badge variant="surface">
						{editedPost.status}
					</Badge>
					<Collapsible.Trigger  padding="3">
					<HStack>
						<BsChat />
						{editedPost.comments.length}
					</HStack>
					</Collapsible.Trigger>
			</HStack>
			<Collapsible.Content>
					{editedPost.comments.map(comment => <CommentFeed key={comment.body} comment={comment} /> ) }
			</Collapsible.Content>
			</Collapsible.Root>
			</Stack>
			{/* <VStack px="4" justify="center" flexShrink="0">
			<BsChevronUp />
				<Tooltip content="Upvote">              
						<Text textStyle="sm" fontWeight="semibold">
						{editedPost.upvotes} 
						</Text>
				</Tooltip>
			</VStack> */}
		</Flex>
	)
}