import { Drawer, Portal, Text, Stack, CloseButton, Button } from "@chakra-ui/react"
import { useNewsAlertContext } from "../context/AlertContext";
import { useEffect, useState } from "react";
import useSound from "use-sound";
import sfx1 from '../../sounds/breaking-news-1.ogg'
import sfx2 from '../../sounds/breaking-news-2.ogg'
import sfx3 from '../../sounds/breaking-news-3.ogg'
import sfx4 from '../../sounds/breaking-news-4.ogg'
import sfx5 from '../../sounds/breaking-news-5.ogg'


export const AlertDrawer = () => {
    const [ triggered, setTriggered ] = useState<boolean>(false)
    const { alertActive, stopAlert, startAlert } = useNewsAlertContext();
            const [ play1 ] = useSound(sfx1);
            const [ play2 ] = useSound(sfx2);
            const [ play3 ] = useSound(sfx3);
            const [ play4 ] = useSound(sfx4);
            const [ play5 ] = useSound(sfx5);
    
            const effects = [play1, play2, play3, play4, play5]
    

    useEffect(() => {
        if (alertActive && !triggered) {
            play2();
            setTriggered(true);
        }

        const timer = setTimeout(() => {
            stopAlert();
            setTriggered(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, [alertActive]);

    return (
        <Drawer.Root open={alertActive} size="full" placement="top" >
            <audio autoPlay>
                <source src="breaking-news-1.ogg" type="audio/ogg" />
            </audio>
            <Portal>
                <Drawer.Backdrop />
                <Drawer.Positioner>
                <Drawer.Content>
                    <Drawer.Body pt="6" spaceY="3">
                        <Text textStyle="3xl">Major News!</Text>
                    </Drawer.Body>
                    <Drawer.Footer>
                    </Drawer.Footer>
                </Drawer.Content>
                </Drawer.Positioner>
            </Portal>
        </Drawer.Root>
    )
}