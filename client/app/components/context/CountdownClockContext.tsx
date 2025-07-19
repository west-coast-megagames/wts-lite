import { useState, createContext, useContext, useMemo } from "react";
import { type ReactElement } from "react";
import { type Post } from "~/types/types";
import { toaster } from "../ui/toaster";
import { server } from "~/config";

const MS_PER_MINUTE = 60000;

type CountdownClockContextProviderProps = {
    children: ReactElement | ReactElement[];
};

type InitialCountdownClockStateProps = {
    countdownDate: Date,
    setCountdownTime: (arg0: number) => void;
};

const initialCountdownClockContext: InitialCountdownClockStateProps = {
    countdownDate: new Date("Jul 19, 2025 08:30:00"),
    setCountdownTime: (_: number) => null,
};

export const CountdownClockContextProvider = ({
    children,
}: CountdownClockContextProviderProps) => {
    const [countdownDate, _setCountdownDate] = useState<Date>(new Date("Jul 19, 2025 08:30:00"));

    const setCountdownTime = (minutes: number) => {
        _setCountdownDate(new Date(Date.now() + minutes * MS_PER_MINUTE));
    }

    const value = useMemo(
        () => ({ countdownDate, setCountdownTime }),
        [countdownDate, setCountdownTime]
    )

    return (
        <CountdownClockContext.Provider value={value}>{children}</CountdownClockContext.Provider>
    );
};
export const CountdownClockContext =
    createContext<InitialCountdownClockStateProps>(initialCountdownClockContext);

export const useCountdownClockContext = () => useContext(CountdownClockContext);
