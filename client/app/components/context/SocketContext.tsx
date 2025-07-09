import { useState, createContext, useContext, useMemo } from "react";
import { type ReactElement } from "react";
import { type Client } from "~/types/types";
import { io } from "socket.io-client";
import { server } from "../../config";
import { toaster } from "../ui/toaster";

type SocketEmitPayload = {
    event: string
    payload: 'string'
};

type SocketContextProviderProps = {
  children: ReactElement | ReactElement[];
};

type InitialSocketStateProps = {
  socketOnline: boolean;
  clients: Client[];
  initConnection: (client: Client) => void;
};

const initialSocketContext: InitialSocketStateProps = {
    socketOnline: false,
    clients: [],
    initConnection: () => null,
};

export const SocketContextProvider = ({
  children,
}: SocketContextProviderProps) => {
    const [socketOnline, setSocketOnline] = useState<boolean>(false);
    const [clients, setClients] = useState<Client[]>([]);
    const URL = server;
    const socket = io(URL, { 
        autoConnect: false
    });

    const initConnection = (user: Client) => {
        console.log('Socket Connecting....')
        socket.auth = { 
            username: user.username,
            team: 'Nexus',
            role: 'Developer'
        }
    
        console.log(socket);
        socket.connect();
    }

    // DEBUG event showing any event thrown over the socket in console
    socket.onAny((event, ...args) => {
    console.log(event, args);
    });

    socket.on("connect", () => setSocketOnline(true));
    socket.on("disconnect", () => setSocketOnline(false));

    // Event that gives all currently connected clients
    socket.on('clients', serverClientList => {
        console.log(serverClientList)
        const newClients = [...serverClientList] as Client[]
        newClients.forEach((user) => {
            user.self = user.id === socket.id;
        });
        newClients.sort((a, b) => {
        if (a.self) return -1;
        if (b.self) return 1;
        if (a.username < b.username) return -1;
            return 1;
        });
        setClients(newClients);
    });

    // Alert event for all messages from the server
    socket.on('alert', data => {
        toaster.create({
            type: data.type,
            description: data.message,
            duration: 5000
            
        });
    })

    const socketEmit = (data: SocketEmitPayload) => {
        socket.emit(data.event, data.payload);
    }


  const value = useMemo(
    () => ({ socket, clients, socketOnline, initConnection, socketEmit }),
    [clients, socketOnline]
  )

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};
export const SocketContext =
  createContext<InitialSocketStateProps>(initialSocketContext);

export const useSocketContext = () => useContext(SocketContext);