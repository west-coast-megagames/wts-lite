import { useState, createContext, useContext, useMemo, useEffect } from "react";
import { type ReactElement } from "react";
import { type Role, type Team, type User } from "~/types/types";
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
  roles: Role[];
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
  roles: [],
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
  const [roles, setRoles] = useState<Role[]>([]);
  const [user, setUser] = useState<User | undefined>(undefined);
  const selectUser = (user: User) => setUser(user);
  const [view, setView] = useState<Team | undefined>(undefined);
  const selectView = (team: Team) => setView(team);

  const loadTeams = async () => {
    console.log('Attempting to load Teams...')
    await fetch(`${ server }api/teams`).then((res) => {
      console.log(res.body)
      !res.ok ? toaster.create({ type: 'error', description: `Failed to load Teams`, duration: 5000}) : undefined;
      return res.json();
    }).then(json => {
      setTeams(json);
      toaster.create({ type: 'success', description: `${json.length} Teams loaded`, duration: 5000})
      setDisplayMode('user');
      console.log(json)
    });
    console.log('Team Load Complete...')
  };

  const loadRoles

  const value = useMemo(
    () => ({ teams, team, user, roles, view, displayMode, setTeams, selectTeam, selectView, selectDisplayMode, selectUser, loadTeams }),
    [teams, team, user, view, roles]
  )

  return (
    <AppContext.Provider value={value}>{children}</AppContext.Provider>
  );
};
export const AppContext =
  createContext<InitialAppStateProps>(initialAppContext);

export const useAppContext = () => useContext(AppContext);