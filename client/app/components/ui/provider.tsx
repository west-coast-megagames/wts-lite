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

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={defaultSystem}>
      <AppContextProvider>
        <SocketContextProvider>
          <DrawerContextProvider>
            <MediaContextProvider>
              <NewsAlertContextProvider>
                <TerrorContextProvider>
                  <ColorModeProvider {...props} />
                </TerrorContextProvider>
              </NewsAlertContextProvider>
            </MediaContextProvider>
          </DrawerContextProvider>
        </SocketContextProvider>
      </AppContextProvider>
    </ChakraProvider>
  )
}
