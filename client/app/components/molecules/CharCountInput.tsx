import { Input, InputGroup, Span } from "@chakra-ui/react"
import { useState, type SyntheticEvent } from "react"

export const CharacterCountInput = (props: { value?: string, max: number, handleChange: (value: string) => void }) => {
  const { max, handleChange } = props
  const [value, setValue] = useState(props.value ? props.value : "");

  return (
    <InputGroup
      endElement={
        <Span color="fg.muted" textStyle="xs">
          {value.length} / {max}
        </Span>
      }
    >
      <Input
        placeholder="Enter your message"
        value={value}
        maxLength={max}
        onChange={(e) => {
					const update = e.currentTarget.value.slice(0, max) 
          setValue(update);
					handleChange(update);
        }}
      />
    </InputGroup>
  )
}