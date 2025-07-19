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
import { CountdownClockContextProvider } from "../context/CountdownClockContext"

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={defaultSystem}>
      <AppContextProvider>
        <CountdownClockContextProvider>
          <SocketContextProvider>
            <DrawerContextProvider>
              <MediaContextProvider>
                <TerrorContextProvider>
                  <ColorModeProvider {...props} />
                </TerrorContextProvider>
              </MediaContextProvider>
            </DrawerContextProvider>
          </SocketContextProvider>
        </CountdownClockContextProvider>
      </AppContextProvider>
    </ChakraProvider>
  )
}
