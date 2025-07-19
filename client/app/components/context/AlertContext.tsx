import { useState, createContext, useContext, useMemo } from "react";
import { type ReactElement } from "react";
import { type Post } from "~/types/types";

type NewsAlertContextProviderProps = {
  children: ReactElement | ReactElement[];
};

type InitialNewsAlertProps = {
  alertQueue: Post[];
  alertActive: boolean;
  addAlert: (post: Post) => void;
  startAlert: () => void;
  stopAlert: () => void;
};

const initialNewsAlertContext: InitialNewsAlertProps = {
  alertQueue: [],
  alertActive: false,
  addAlert: () => null,
  startAlert: () => null,
  stopAlert: () => null,
};

export const NewsAlertContextProvider = ({
  children,
}: NewsAlertContextProviderProps) => {
  const [ alertQueue, setAlertQueue ] = useState<Post[]>([]);
  const [ alertActive, setAlertActive ] = useState<boolean>(false); 
  const startAlert = () => setAlertActive(true);
  const stopAlert = () => {
    setAlertActive(false);
    removeAlert(0);
};
  const addAlert = (data: Post) => {
    console.log('Alert Triggered')
    const track = [...alertQueue];
    track.push(data);
    setAlertQueue(track);
    startAlert();
  };
  const removeAlert = (i: number) => {
    const track = [...alertQueue];
    track.splice(i, 1);
  }


  const value = useMemo(
    () => ({ alertActive, alertQueue, startAlert, stopAlert, addAlert, removeAlert }),
    [ alertActive, alertQueue, startAlert, stopAlert, addAlert, removeAlert ]
  )

  return (
    <NewsAlertContext.Provider value={value}>{children}</NewsAlertContext.Provider>
  );
};
export const NewsAlertContext =
  createContext<InitialNewsAlertProps>(initialNewsAlertContext);

export const useNewsAlertContext = () => useContext(NewsAlertContext);