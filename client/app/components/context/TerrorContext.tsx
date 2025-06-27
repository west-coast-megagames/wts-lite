import { useState, createContext, useContext, useMemo } from "react";
import { type ReactElement } from "react";
import { regionList } from "../../../data/regions"


type TerrorContextProviderProps = {
  children: ReactElement | ReactElement[];
};
export type Region = {
    name: string,
    code: string,
    terror: number,
    type: string
}

type InitialTerrorStateProps = {
  terrorTrack: Region[];
  setTerror: (region: Region) => void;
};

const initialTerrorContext: InitialTerrorStateProps = {
  terrorTrack: regionList,
  setTerror: () => null,
};

export const TerrorContextProvider = ({
  children,
}: TerrorContextProviderProps) => {
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
    () => ({ terrorTrack, setTerror }),
    [terrorTrack]
  )

  return (
    <TerrorContext.Provider value={value}>{children}</TerrorContext.Provider>
  );
};
export const TerrorContext =
  createContext<InitialTerrorStateProps>(initialTerrorContext);

export const useTerrorContext = () => useContext(TerrorContext);