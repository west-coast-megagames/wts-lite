import { useState, createContext, useContext, useMemo, useEffect } from "react";
import { type ReactElement } from "react";
import { type Role, type Team, type User } from "~/types/types";
import { teamArray } from "data/teams";
import { server } from "~/config";
import { toaster } from "../ui/toaster";
import { createListCollection, type ListCollection } from "@chakra-ui/react";

type AppContextProviderProps = {
  children: ReactElement | ReactElement[];
};

type DisplayModes = 'projector' | 'user' | 'loading'

type InitialAppStateProps = {
  displayMode: DisplayModes;
  teams: Team[];
  roles: Role[];
  role: Role | undefined;
  team: Team | undefined;
  user: User | undefined;
  view: Team | undefined;
  selectTeam: (code: string) => void;
  selectUser: (user: User) => void;
  selectRole: (role: string) => void;
  selectView: (team: Team) => void;
  selectDisplayMode: (mode: DisplayModes) => void;
  setTeams: (teams: Team[]) => void;
  loadTeams: () => void;
  loadRoles: () => void;
  dataUplink: () => void;
};

const initialAppContext: InitialAppStateProps = {
  displayMode: 'user',
  teams: teamArray,
  roles: [],
  role: undefined,
  team: undefined,
  user: undefined,
  view: undefined,
  selectTeam: () => null,
  selectUser: () => null,
  selectRole: () => null,
  selectView: () => null,
  selectDisplayMode: () => null,
  setTeams: () => null,
  loadTeams: () => null,
  loadRoles: () => null,
  dataUplink: () => null,
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
    toaster.create({ type: 'success', description: `Team set as the ${selectedTeam?.name}`, duration: 5000})
    if (selectedTeam) selectView(selectedTeam);
  };
  const [ roles, setRoles ] = useState<Role[]>([]);
  const [ role, setRole ] = useState<Role | undefined>(undefined);
  const selectRole = (_id: string) => {
    const selectRole = roles.find((el) => el._id === _id);
    setRole(selectRole);
    toaster.create({ type: 'success', description: `Role set as the ${selectRole?.team?.shortName}s ${selectRole?.title}`, duration: 5000})
  }
  const [ openRoles, setOpenRoles ] = useState<ListCollection<Role>>([])
  const [ user, setUser ] = useState<User | undefined>(undefined);
  const selectUser = (user: User) => setUser(user);
  const [ view, setView ] = useState<Team | undefined>(undefined);
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

  const loadRoles = async () => {
    console.log('Attempting to load Roles');
    await fetch(`${server}api/roles`).then((res) => {
      !res.ok ? toaster.create({ type: 'error', description: `Failed to load Teams`, duration: 5000}) : undefined;
      return res.json();
    }).then(json => { 
      setRoles(json);
      setOpenRoles(createListCollection({
        items: json,
        itemToString: (item) => item.title,
        itemToValue: (item) => item._id,
      }))
      toaster.create({ type: 'success', description: `${json.length} Roles loaded`, duration: 5000});
      console.log(json);
    });
    console.log('Role load completed');
  };

  const dataUplink = async () => {
    await loadTeams();
    await loadRoles();
    toaster.create({ type: 'success', description: `Data load succesfull, hydration complete`, duration: 5000});
  }

  const value = useMemo(
    () => ({ teams, team, user, roles, role, view, displayMode, openRoles, setTeams, selectTeam, selectRole, selectView, selectDisplayMode, selectUser, loadTeams, loadRoles, dataUplink }),
    [teams, team, user, view, roles, role, displayMode, openRoles]
  )

  return (
    <AppContext.Provider value={value}>{children}</AppContext.Provider>
  );
};
export const AppContext =
  createContext<InitialAppStateProps>(initialAppContext);

export const useAppContext = () => useContext(AppContext);