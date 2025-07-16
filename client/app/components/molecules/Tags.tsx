import { HStack, Tag } from "@chakra-ui/react"

export const Tags = (props: { tags: string[] }) => {
    return (
        <HStack>
        {props.tags.map((tag: string) => 
            <Tag.Root key={tag} hideBelow="sm">
                <Tag.Label>{tag}</Tag.Label>
            </Tag.Root>
        )}
        </HStack>
    )
}