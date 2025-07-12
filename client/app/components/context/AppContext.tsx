import { useState, createContext, useContext, useMemo } from "react";
import { type ReactElement } from "react";
import { type Team, type User } from "~/types/types";
import { teamArray } from "data/teams";

type AppContextProviderProps = {
  children: ReactElement | ReactElement[];
};

type DisplayModes = 'projector' | 'user'

type InitialAppStateProps = {
  displayMode: DisplayModes;
  teams: Team[];
  team: Team | undefined;
  user: User | undefined;
  view: Team | undefined;
  selectTeam: (code: string) => void;
  selectUser: (user: User) => void;
  selectView: (team: Team) => void;
  selectDisplayMode: (mode: DisplayModes) => void;
  setTeams: (teams: Team[]) => void;
};

const initialAppContext: InitialAppStateProps = {
  displayMode: 'user',
  teams: teamArray,
  team: undefined,
  user: undefined,
  view: undefined,
  selectTeam: () => null,
  selectUser: () => null,
  selectView: () => null,
  selectDisplayMode: () => null,
  setTeams: () => null,
};

export const AppContextProvider = ({
  children,
}: AppContextProviderProps) => {
  const [displayMode, setDisplayMode] = useState<DisplayModes>('user');
  const selectDisplayMode = (mode: DisplayModes) => setDisplayMode(mode);
  const [teams, setTeams] = useState<Team[]>(teamArray);
  const [team, setTeam] = useState<Team | undefined>(undefined);
  const selectTeam = (code: string) => {
    const selectedTeam = teams.find(el => el.code === code)
    setTeam(selectedTeam);
    if (selectedTeam) selectView(selectedTeam);
  };
  const [user, setUser] = useState<User | undefined>(undefined);
  const selectUser = (user: User) => setUser(user);
  const [view, setView] = useState<Team | undefined>(undefined);
  const selectView = (team: Team) => setView(team);



  const value = useMemo(
    () => ({ teams, team, user, view, displayMode, setTeams, selectTeam, selectView, selectDisplayMode, selectUser }),
    [teams, team, user, view]
  )

  return (
    <AppContext.Provider value={value}>{children}</AppContext.Provider>
  );
};
export const AppContext =
  createContext<InitialAppStateProps>(initialAppContext);

export const useAppContext = () => useContext(AppContext);