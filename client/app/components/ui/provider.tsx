"use client"

import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import {
  ColorModeProvider,
  type ColorModeProviderProps,
} from "./color-mode"
import { DrawerContextProvider } from "../context/DrawerContext"
import { TerrorContextProvider } from "../context/TerrorContext"

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={defaultSystem}>
      <DrawerContextProvider>
        <TerrorContextProvider>
          <ColorModeProvider {...props} />
        </TerrorContextProvider>
      </DrawerContextProvider>
    </ChakraProvider>
  )
}
