import { Drawer, Portal, Text, Stack, CloseButton, Button, Center, HStack, Avatar, Flex } from "@chakra-ui/react"
import { useNewsAlertContext } from "../context/AlertContext";
import { useEffect, useState } from "react";
import useSound from "use-sound";
import sfx1 from '../../sounds/breaking-news-1.ogg'
import sfx2 from '../../sounds/breaking-news-2.ogg'
import sfx3 from '../../sounds/breaking-news-3.ogg'
import sfx4 from '../../sounds/breaking-news-4.ogg'
import sfx5 from '../../sounds/breaking-news-5.ogg'
import { a3TOa2Converter, getFlag } from "~/scripts";
import { useAppContext } from "../context/AppContext";


export const AlertDrawer = () => {
    const [ triggered, setTriggered ] = useState<boolean>(false)
    const { alertActive, stopAlert, alertQueue } = useNewsAlertContext();
    const { displayMode } = useAppContext();
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

        console.log(alertQueue[0])

        const timer = setTimeout(() => {
            stopAlert();
            setTriggered(false);
        }, 8000);

        return () => clearTimeout(timer);
    }, [alertActive]);

    return (
        <Drawer.Root open={alertActive && displayMode === 'projector'} size="full" placement="top" >
            <Portal>
                <Drawer.Backdrop />
                <Drawer.Positioner>
                <Drawer.Content>
                    <Drawer.Body >
                        <Flex h="100vh" align="center" justify="center">
                    {alertQueue[0] && <Stack>
                                  <HStack>
                                      <Avatar.Root size='2xl'>
                                        <Avatar.Fallback />
                                        <Avatar.Image src={getFlag(a3TOa2Converter(alertQueue[0].team?.code))} />
                                      </Avatar.Root>
                                      <Text textStyle="lg">
                                        { alertQueue[0].team?.shortName } | { alertQueue[0].author?.name }
                                      </Text>
                                    </HStack>
                        <Text textStyle="5xl">{alertQueue[0].headline}</Text>
                        <Text textStyle="2xl">{alertQueue[0].body}</Text>
                        
                    </Stack>}
                    </Flex>
                    </Drawer.Body>
                    <Drawer.Footer>
                    </Drawer.Footer>
                </Drawer.Content>
                </Drawer.Positioner>
            </Portal>
        </Drawer.Root>
    )
}