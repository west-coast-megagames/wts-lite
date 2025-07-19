import { useState, createContext, useContext, useMemo } from "react";
import { type ReactElement } from "react";
import { server } from "~/config";
import { toaster } from "../ui/toaster";

const MS_PER_MINUTE = 60000;

type CountdownClockContextProviderProps = {
    children: ReactElement | ReactElement[];
};

type InitialCountdownClockStateProps = {
    countdownDate: Date,
    currentTurn: number,
    setCountdownDate: (arg: Date) => void;
    setCurrentTurn: (arg: number) => void;
};

const initialCountdownClockContext: InitialCountdownClockStateProps = {
    countdownDate: new Date("Jul 19, 2025 08:30:00"),
    currentTurn: 1,
    setCountdownDate: () => null,
    setCurrentTurn: () => null,
};

export const CountdownClockContextProvider = ({
    children,
}: CountdownClockContextProviderProps) => {
    const [countdownDate, setCountdownDate] = useState<Date>(new Date("Jul 19, 2025 08:30:00"));
    const [currentTurn, setCurrentTurn] = useState<number>(1);

    const value = { countdownDate, currentTurn, setCountdownDate, setCurrentTurn };

    return (
        <CountdownClockContext.Provider value={value}>{children}</CountdownClockContext.Provider>
    );
};

export const CountdownClockContext =
    createContext<InitialCountdownClockStateProps>(initialCountdownClockContext);

export const useCountdownClockContext = () => useContext(CountdownClockContext);
