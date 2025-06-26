import { useState, createContext, useContext, useMemo } from "react";
import { type ReactElement } from "react";

type DrawerContextProviderProps = {
  children: ReactElement | ReactElement[];
};
export type DrawerTypes =
  | "reports"
  | "newsroom"
  | "dashboard"
  | "controller"
  | "";

type InitialDrawerStateProps = {
  activeDrawer: string;
  setDrawer: (payload: DrawerTypes) => void;
  closeDrawer: () => void;
};

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