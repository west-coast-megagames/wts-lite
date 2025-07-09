import { useState, createContext, useContext, useMemo } from "react";
import { type ReactElement } from "react";
import { regionList } from "../../../data/regions"
import { type Region } from "~/types/types";

type TerrorContextProviderProps = {
  children: ReactElement | ReactElement[];
};

type DisplayModes = 'projector' | 'user'

type InitialTerrorStateProps = {
  displayMode: DisplayModes;
  terrorTrack: Region[];
  setTerror: (region: Region) => void;
};

const initialTerrorContext: InitialTerrorStateProps = {
  displayMode: 'user',
  terrorTrack: regionList,
  setTerror: () => null,
};

export const TerrorContextProvider = ({
  children,
}: TerrorContextProviderProps) => {
  const [displayMode, setDisplayMode] = useState<DisplayModes>('user');
  const [terrorTrack, setterrorTrack] = useState<Region[]>(regionList);
  const setTerror = (payload: Region) => {
    const newTrack: Region[] = []
    terrorTrack.forEach((el, i) => {
        if (el.name === payload.name) newTrack.push(payload);
        else newTrack.push(el);
        
        setterrorTrack(newTrack);
    })
  }

  const value = useMemo(
    () => ({ displayMode, terrorTrack, setTerror }),
    [terrorTrack]
  )

  return (
    <TerrorContext.Provider value={value}>{children}</TerrorContext.Provider>
  );
};
export const TerrorContext =
  createContext<InitialTerrorStateProps>(initialTerrorContext);

export const useTerrorContext = () => useContext(TerrorContext);