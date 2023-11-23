import { createContext } from "react";
import { type Socket } from "socket.io-client";
import { useInitiateSocket } from "./socket";

export const SocketContext = createContext<Socket | null>(null);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const socket = useInitiateSocket();
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
