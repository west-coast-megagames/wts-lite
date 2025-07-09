import { Button, CloseButton, Drawer, Portal, InputGroup, NumberInput, NumberInputLabel, HStack, VStack, Text } from "@chakra-ui/react"
import { useDrawerContext } from "../context/DrawerContext"
import { terrorBreakpoints } from "../../../data/terror";
import { LuArrowRightLeft } from "react-icons/lu"
import { useTerrorContext } from "../context/TerrorContext"

export const ControlDrawer = () => {
    const { activeDrawer, closeDrawer } = useDrawerContext();
    const { terrorTrack, setTerror} = useTerrorContext();
    const breakpoints = terrorBreakpoints;
    return (
        <Drawer.Root placement="end" open={activeDrawer === "dashboard"} onOpenChange={ (e) => !e.open ? closeDrawer() : "" } onEscapeKeyDown={ () => closeDrawer() } size='sm'>
            <Portal>
                <Drawer.Backdrop />
                <Drawer.Positioner>
                <Drawer.Content>
                    <Drawer.Body pt="6" spaceY="3">
                    <Text>Active Drawer: {activeDrawer}</Text>
                    <Text textStyle="3xl">Terror Controls</Text>
                        {terrorTrack.map(region => (
                            <HStack justifyContent="space-between">
                                <VStack alignItems='start' gap={0}>
                                    <Text textStyle="md">{region.name}</Text>
                                    <Text textStyle="sm">Current: { breakpoints.find(el => region.terror >= el.minValue && region.terror < el.maxValue)?.name }</Text>
                                </VStack>
                                <NumberInput.Root value={region.terror.toString()} size='md' w="3xs" onValueChange={(el) => {
                                region.terror = Number.isNaN(el.valueAsNumber) ? 0 : el.valueAsNumber;
                                setTerror(region);
                                }}>
                                    <NumberInput.Control />
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
                            </HStack>
                        ))}
                    </Drawer.Body>
                    <Drawer.Footer>
                         <Drawer.CloseTrigger asChild>
                        <CloseButton onClick={ () => closeDrawer() } size="lg" />
                    </Drawer.CloseTrigger>
                        <Button variant="outline" onClick={ () => closeDrawer() }>Cancel</Button>
                    </Drawer.Footer>
                </Drawer.Content>
                </Drawer.Positioner>
            </Portal>
        </Drawer.Root>
    )
}