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

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={defaultSystem}>
      <AppContextProvider>
        <SocketContextProvider>
          <DrawerContextProvider>
            <MediaContextProvider>
            <TerrorContextProvider>
              <ColorModeProvider {...props} />
            </TerrorContextProvider>
            </MediaContextProvider>
          </DrawerContextProvider>
        </SocketContextProvider>
      </AppContextProvider>
    </ChakraProvider>
  )
}
