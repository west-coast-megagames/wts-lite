"use client"

import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import {
  ColorModeProvider,
  type ColorModeProviderProps,
} from "./color-mode"
import { DrawerContextProvider } from "../context/DrawerContext"
import { TerrorContextProvider } from "../context/TerrorContext"
import { SocketContextProvider } from "../context/SocketContext"
import { AppContextProvider } from "../context/AppContext"
import { MediaContextProvider } from "../context/MediaContext"
import { NewsAlertContextProvider } from "../context/AlertContext"
import { CountdownClockContextProvider } from "../context/CountdownClockContext"

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={defaultSystem}>
      <AppContextProvider>
        <CountdownClockContextProvider>
          <NewsAlertContextProvider>
            <TerrorContextProvider>
              <MediaContextProvider>
              <SocketContextProvider>
                <DrawerContextProvider>
                    <ColorModeProvider {...props} />
            </DrawerContextProvider>
          </SocketContextProvider>
          </MediaContextProvider>
               </TerrorContextProvider>
                </NewsAlertContextProvider>
        </CountdownClockContextProvider>
      </AppContextProvider>
    </ChakraProvider>
  )
}
