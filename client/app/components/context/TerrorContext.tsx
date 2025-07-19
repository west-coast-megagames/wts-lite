import { useState, createContext, useContext, useMemo } from "react";
import { type ReactElement } from "react";
import { regionList } from "../../../data/regions"
import { type Region } from "~/types/types";

type TerrorContextProviderProps = {
  children: ReactElement | ReactElement[];
};

type InitialTerrorStateProps = {
  terrorTrack: Region[];
  setTerror: (region: Region) => void;
  getTerror: () => void;
};

const initialTerrorContext: InitialTerrorStateProps = {
  terrorTrack: regionList,
  setTerror: () => null,
  getTerror: () => null,
};

export const TerrorContextProvider = ({
  children,
}: TerrorContextProviderProps) => {
  const [terrorTrack, setterrorTrack] = useState<Region[]>(regionList);

  const setTerror = (payload: Region) => {
    console.log(payload)
    const newTrack: Region[] = []
    terrorTrack.forEach((el, i) => {
        if (el.name === payload.name) newTrack.push(payload);
        else newTrack.push(el);
        
        setterrorTrack(newTrack);
    });
  }

  const getTerror = () => terrorTrack


  const value = useMemo(
    () => ({ terrorTrack, setTerror, getTerror }),
    [terrorTrack, getTerror]
  )

  return (
    <TerrorContext.Provider value={value}>{children}</TerrorContext.Provider>
  );
};
export const TerrorContext =
  createContext<InitialTerrorStateProps>(initialTerrorContext);

export const useTerrorContext = () => useContext(TerrorContext);