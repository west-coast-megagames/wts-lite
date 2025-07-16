import { Button, CloseButton, Drawer, Portal, Text } from "@chakra-ui/react"
import { useDrawerContext } from "../context/DrawerContext"
import { Profile } from "./Profile";

export const ProfileDrawer = () => {
    const { activeDrawer, closeDrawer } = useDrawerContext();

    return (
        <Drawer.Root placement="end" open={activeDrawer === "profile"} onOpenChange={ (e) => !e.open ? closeDrawer() : "" } onEscapeKeyDown={ () => closeDrawer() } size='lg'>
            <Portal>
                <Drawer.Backdrop />
                <Drawer.Positioner>
                <Drawer.Content>
                    <Drawer.Header>
                        Profile Page
                    </Drawer.Header>
                    <Drawer.Body>
                        <Profile />
                    </Drawer.Body>
                    <Drawer.Footer>
                    {/* <Drawer.CloseTrigger asChild>
                        <CloseButton onClick={ () => closeDrawer() } size="lg" />
                    </Drawer.CloseTrigger> */}
                        <Button variant="outline" onClick={ () => closeDrawer() }>Cancel</Button>
                    </Drawer.Footer>
                </Drawer.Content>
                </Drawer.Positioner>
            </Portal>
        </Drawer.Root>
    )
}