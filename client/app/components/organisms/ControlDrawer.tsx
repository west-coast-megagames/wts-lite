import { Button, CloseButton, Drawer, Portal, InputGroup, NumberInput, NumberInputLabel } from "@chakra-ui/react"
import { useDrawerContext } from "../context/DrawerContext"
import { LuArrowRightLeft } from "react-icons/lu"

export const ControlDrawer = () => {
    const { activeDrawer, closeDrawer } = useDrawerContext()
    return (
        <Drawer.Root placement="end" open={activeDrawer === "dashboard"} size='lg'>
            <Portal>
                <Drawer.Backdrop />
                <Drawer.Positioner>
                <Drawer.Content>
                    <Drawer.Body pt="6" spaceY="3">
                    <p>Drawer is open: {activeDrawer}</p>
                    <p>
                        <NumberInput.Root>
                            <NumberInput.Control />
                            <NumberInputLabel>

                            </NumberInputLabel>
                            <InputGroup
                                startElementProps={{ pointerEvents: "auto" }}
                                startElement={
                                <NumberInput.Scrubber>
                                    <LuArrowRightLeft />
                                </NumberInput.Scrubber>
                                }
                            >
                                <NumberInput.Input />
                            </InputGroup>
                        </NumberInput.Root>
                    </p>
                    <button onClick={ () => closeDrawer() }>Close</button>
                    </Drawer.Body>
                    <Drawer.CloseTrigger asChild>
                        <CloseButton onClick={ () => closeDrawer() } size="lg" />
                    </Drawer.CloseTrigger>
                    <Drawer.Footer>
                        <Button variant="outline" onClick={ () => closeDrawer() }>Cancel</Button>
                    </Drawer.Footer>
                </Drawer.Content>
                </Drawer.Positioner>
            </Portal>
        </Drawer.Root>
    )
}