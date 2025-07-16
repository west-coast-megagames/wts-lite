import { Button, CloseButton, Drawer, Portal, InputGroup, NumberInput, NumberInputLabel, Card } from "@chakra-ui/react"
import { useDrawerContext } from "../context/DrawerContext"
import { LuArrowRightLeft } from "react-icons/lu"
import { terrorBreakpoints } from "../../../data/terror";

export const PatrickDrawer = () => {
    const { activeDrawer, closeDrawer } = useDrawerContext()

    return (
        <Drawer.Root placement="end" open={activeDrawer === "candy"} size='lg'>
            <Portal>
                <Drawer.Backdrop />
                <Drawer.Positioner>
                <Drawer.Content>
                    <Drawer.Body pt="6" spaceY="3">

        <Card.Root width="320px">
            <Card.Body gap="2">
                <Card.Title mt="2">Regional Terror Levels</Card.Title>
                    <Card.Description>
                        <p>North America: </p>
                        <p>South America: </p>
                        <p>Europe: </p>
                        <p>Africa: </p>
                        <p>Austr-Asia: </p>
                        <p>Arabstan: </p>
                    </Card.Description>
            </Card.Body>
            <Card.Footer >
                
            </Card.Footer>
        </Card.Root>







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