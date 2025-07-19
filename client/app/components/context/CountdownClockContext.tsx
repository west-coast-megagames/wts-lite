import { useState, createContext, useContext, useMemo } from "react";
import { type ReactElement } from "react";

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
    setCountdownTime: () => null,
};

export const CountdownClockContextProvider = ({
    children,
}: CountdownClockContextProviderProps) => {1
    const [countdownDate, setCountdownDate] = useState<Date>(new Date("Jul 19, 2025 08:30:00"));

    const setCountdownTime = (minutes: number) => {
        setCountdownDate(new Date(Date.now() + minutes * MS_PER_MINUTE));
    }

    const value = { countdownDate, setCountdownTime };

    return (
        <CountdownClockContext.Provider value={value}>{children}</CountdownClockContext.Provider>
    );
};

export const CountdownClockContext =
    createContext<InitialCountdownClockStateProps>(initialCountdownClockContext);

export const useCountdownClockContext = () => useContext(CountdownClockContext);
