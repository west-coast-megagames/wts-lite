import { Button, CloseButton, Drawer, Portal, Text, Switch, Stack } from "@chakra-ui/react"
import { useDrawerContext } from "../context/DrawerContext"
import { DisplayModeSwitch } from "../molecules/Switches/DisplayModeSwitch";
import useSound from 'use-sound';
import sfx1 from '../../sounds/breaking-news-1.ogg'
import sfx2 from '../../sounds/breaking-news-2.ogg'
import sfx3 from '../../sounds/breaking-news-3.ogg'
import sfx4 from '../../sounds/breaking-news-4.ogg'
import sfx5 from '../../sounds/breaking-news-5.ogg'
import { useNewsAlertContext } from "../context/AlertContext";

export const SettingDrawer = () => {
    const { activeDrawer, closeDrawer } = useDrawerContext();
		const { startAlert } = useNewsAlertContext()
		const [ play1 ] = useSound(sfx1);
		const [ play2 ] = useSound(sfx2);
		const [ play3 ] = useSound(sfx3);
		const [ play4 ] = useSound(sfx4);
		const [ play5 ] = useSound(sfx5);

		const effects = [play1, play2, play3, play4, play5]

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
								{effects.map((effect, i) => (<Button onClick={effect} > Play sfx {i+1} </Button>))}
								<Button onClick={ () => startAlert() }> Launch Alert </Button>
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