import { Button, CloseButton, Drawer, Portal, Text, Switch, Stack } from "@chakra-ui/react"
import { useDrawerContext } from "../context/DrawerContext"
import { useState } from "react";
import { DisplayModeSwitch } from "../molecules/Switches/DisplayModeSwitch";

export const SettingDrawer = () => {
    const { activeDrawer, closeDrawer } = useDrawerContext();

    return (
			<Drawer.Root placement="end" open={activeDrawer === "settings"} onOpenChange={ (e) => !e.open ? closeDrawer() : "" } onEscapeKeyDown={ () => closeDrawer() } size='sm'>
				<Portal>
					<Drawer.Backdrop />
					<Drawer.Positioner>
						<Drawer.Content>
						<Drawer.Body pt="6" spaceY="3">
							<Stack>
							<Text textStyle="3xl">Application Settings</Text>
							<DisplayModeSwitch />
							</Stack>
						</Drawer.Body>
						<Drawer.Footer>
						<Drawer.CloseTrigger asChild>
								<CloseButton onClick={ () => closeDrawer() } size="lg" />
						</Drawer.CloseTrigger>
						<Button variant="outline" onClick={ () => closeDrawer() }>Close Drawer</Button>
					</Drawer.Footer>
				</Drawer.Content>
				</Drawer.Positioner>
			</Portal>
		</Drawer.Root>
	)
}