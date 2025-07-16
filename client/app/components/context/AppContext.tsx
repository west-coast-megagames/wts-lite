import { useState, createContext, useContext, useMemo, useEffect } from "react";
import { type ReactElement } from "react";
import { type Team, type User } from "~/types/types";
import { teamArray } from "data/teams";
import { server } from "~/config";
import { toaster } from "../ui/toaster";

type AppContextProviderProps = {
  children: ReactElement | ReactElement[];
};

type DisplayModes = 'projector' | 'user' | 'loading'

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
  loadTeams: () => void;
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
  loadTeams: () => null
};

export const AppContextProvider = ({
  children,
}: AppContextProviderProps) => {
  const [displayMode, setDisplayMode] = useState<DisplayModes>('loading');
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

  const loadTeams = () => {
    console.log('Attempting to load...')
    fetch(`${ server }api/teams`).then((res) => {
      console.log(res.body)
      !res.ok ? toaster.create({ type: 'error', description: `Failed to load Teams`, duration: 5000}) : toaster.create({ type: 'success', description: 'Teams loaded', duration: 5000})
      return res.json()
    }).then(json => {setTeams(json); setDisplayMode('user'); console.log(json)})
  }

  const value = useMemo(
    () => ({ teams, team, user, view, displayMode, setTeams, selectTeam, selectView, selectDisplayMode, selectUser, loadTeams }),
    [teams, team, user, view]
  )

  return (
    <AppContext.Provider value={value}>{children}</AppContext.Provider>
  );
};
export const AppContext =
  createContext<InitialAppStateProps>(initialAppContext);

export const useAppContext = () => useContext(AppContext);