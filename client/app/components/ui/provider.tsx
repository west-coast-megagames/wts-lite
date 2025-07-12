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

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={defaultSystem}>
      <AppContextProvider>
        <SocketContextProvider>
          <DrawerContextProvider>
            <TerrorContextProvider>
              <ColorModeProvider {...props} />
            </TerrorContextProvider>
          </DrawerContextProvider>
        </SocketContextProvider>
      </AppContextProvider>
    </ChakraProvider>
  )
}
