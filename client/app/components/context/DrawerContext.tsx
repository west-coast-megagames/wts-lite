import { useState, createContext, useContext, useMemo } from "react";
import { type ReactElement } from "react";
import { type DrawerTypes } from "~/types/types";

// Local TYPE for the properties expected
type DrawerContextProviderProps = {
  children: ReactElement | ReactElement[];
};

// Local TYPE for the expected State of the context
type InitialDrawerStateProps = {
  activeDrawer: string;
  setDrawer: (payload: DrawerTypes) => void;
  closeDrawer: () => void;
};

// Initial State of the Context
const initialDrawerContext: InitialDrawerStateProps = {
  activeDrawer: "",
  setDrawer: () => null,
  closeDrawer: () => null,
};

export const DrawerContextProvider = ({
  children,
}: DrawerContextProviderProps) => {
  const [activeDrawer, setActiveDrawer] = useState<DrawerTypes>("");
  const setDrawer = (payload: DrawerTypes) => setActiveDrawer(payload);
  const closeDrawer = () => setActiveDrawer("");

  const value = useMemo(
    () => ({ activeDrawer, setDrawer, closeDrawer }),
    [activeDrawer]
  )

  return (
    <DrawerContext.Provider value={value}>{children}</DrawerContext.Provider>
  );
};
export const DrawerContext =
  createContext<InitialDrawerStateProps>(initialDrawerContext);

export const useDrawerContext = () => useContext(DrawerContext);