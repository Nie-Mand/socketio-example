import { useCallback, useContext, useEffect } from "react";
import { SocketContext } from "./context";

export const useSocket = () => {
  const socket = useContext(SocketContext);
  if (socket === undefined)
    throw new Error("useSocket must be used within a SocketProvider");
  return socket;
};

export function usePublisher<Data>() {
  const socket = useSocket();
  return useCallback(
    (event: string, data: Data) => {
      if (socket) socket.emit(event, data);
    },
    [socket]
  );
}

export function useSubscriber<Data>(
  event: string,
  callback: (data: Data) => void
) {
  const socket = useSocket();
  useEffect(() => {
    if (socket) socket.on(event, callback);
  }, [socket, event, callback]);
}
