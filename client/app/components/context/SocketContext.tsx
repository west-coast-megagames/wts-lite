import { useState, createContext, useContext, useMemo } from "react";
import { type ReactElement } from "react";
import { type Client } from "~/types/types";
import { io } from "socket.io-client";
import { server } from "../../config";
import { toaster } from "../ui/toaster";

type SocketEmitPayload = {
    event: string
    payload: any
};

type SocketContextProviderProps = {
  children: ReactElement | ReactElement[];
};

type InitialSocketStateProps = {
  socketOnline: boolean;
  clients: Client[];
  initConnection: (client: Client) => void;
  socketEmit: (data: SocketEmitPayload) => void;
  socketLogoff: () => void;
};

const initialSocketContext: InitialSocketStateProps = {
    socketOnline: false,
    clients: [],
    initConnection: () => null,
    socketEmit: () => null,
    socketLogoff: () => null,
};

const URL = server;
const socket = io(URL, { 
  autoConnect: false,
});

export const SocketContextProvider = ({
  children,
}: SocketContextProviderProps) => {
    const [socketOnline, setSocketOnline] = useState<boolean>(false);
    const [clients, setClients] = useState<Client[]>([]);

    // Socket Context functions
    const socketEmit = (data: SocketEmitPayload) => {
        socket.emit(data.event, data.payload);
    };

    const initConnection = (user: Client) => {
        console.log('Socket Connecting....')
        socket.auth = { 
            username: user.username,
            team: 'Nexus',
            role: 'Developer'
        }
        // DEBUG event showing any event thrown over the socket in console
        // socket.onAny((event, ...args) => {
        //   console.log(event, args);
        // });

        socket.on("connect", () => {
          setSocketOnline(true)
          toaster.create({
            type: 'success',
            description: "Connected to socket.io"
          })
        });

        socket.on("connect_error", () => {
          setSocketOnline(false);
          toaster.create({
            type: 'error',
            description: 'Socket connection error!'
          })
        });

        socket.on("reconnect", () => {
          toaster.create({
            type: 'success',
            description: 'Socket reconnected'
          })
        })

        // Event that gives all currently connected clients
        socket.on('clients', serverClientList => {
            console.log(serverClientList)
            const newClients = [...serverClientList] as Client[]
            newClients.forEach((user) => {
                user.self = user.userID === socket.id;
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
            console.log(data)
            toaster.create({
                type: data.type,
                description: data.message,
                duration: 5000
                
            });
        })

        socket.connect();
    };

    const socketLogoff = () => {
      socket.emit('logoff');
      socket.disconnect();
      socket.removeAllListeners();
      setSocketOnline(false);
      console.log('Logging off');
    };

  const value = useMemo(
    () => ({ clients, socketOnline, initConnection, socketEmit, socketLogoff, }),
    [ clients, socketOnline ]
  )

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};
export const SocketContext =
  createContext<InitialSocketStateProps>(initialSocketContext);

export const useSocketContext = () => useContext(SocketContext);