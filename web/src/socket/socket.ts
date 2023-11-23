import { useEffect, useState } from "react";
import { io, type Socket } from "socket.io-client";

export function useInitiateSocket() {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socket = io("http://localhost:3000", {
      transports: ["websocket"],
    });
    socket.connect();
    socket.on("connect", () => {
      console.log("Socket connected");
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    setSocket(socket);

    return () => {
      socket.disconnect();
    };
  }, []);

  return socket;
}
