import { useCallback } from 'react'
import type { MouseEvent, SyntheticEvent } from 'react'

import { Tag } from '@chakra-ui/react'
import type { TagLabelProps, TagRootProps, TagCloseTriggerProps } from '@chakra-ui/react'

export type ChakraTagInputTagProps = TagRootProps & {
  children: string
  onRemove?(event: SyntheticEvent): void

  tagLabelProps?: TagLabelProps
  tagCloseButtonProps?: TagCloseTriggerProps
}

export default function ChakraTagInputTag({
  children,
  onRemove,

  tagLabelProps,
  tagCloseButtonProps,

  ...props
}: ChakraTagInputTagProps) {
  const onTagCloseButtonClick = tagCloseButtonProps?.onClick
  const handleClickTagCloseButton = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      onTagCloseButtonClick?.(event)
      if (event.isDefaultPrevented()) return

      onRemove?.(event)
    },
    [onRemove, onTagCloseButtonClick]
  )
  return (
    <Tag.Root size='sm' {...props}  >
      <Tag.Label {...tagLabelProps}>{children}</Tag.Label>
      <Tag.CloseTrigger {...tagCloseButtonProps} onClick={handleClickTagCloseButton} />
    </Tag.Root>
  )
}