'use client';

import { useSocket } from "@/hooks/socket/useSocket";
import React, { createContext, useContext, useEffect, useState } from "react";

interface OnlineUsersContextType {
    onlineUsers: Set<string>;
}

const OnlineUsersContext = createContext<OnlineUsersContextType>({
  onlineUsers: new Set(),
});

export const OnlineUsersProvider = ({ children }: { children: React.ReactNode }) => {
  const [onlineUsers, setOnlineUsers] = useState<Set<string>>(new Set());
  const { socket } = useSocket();

  useEffect(() => {
    if (!socket) return;

    socket.on("userOnline", ({ userId }: { userId: string }) => {
      setOnlineUsers(prev => new Set(prev).add(userId));
    });

    socket.on("userOffline", ({ userId }: { userId: string }) => {
      setOnlineUsers(prev => {
        const newSet = new Set(prev);
        newSet.delete(userId);
        return newSet;
      });
    });

    return () => {
      socket.off("userOnline");
      socket.off("userOffline");
    };
  }, [socket]);

  return (
    <OnlineUsersContext.Provider value={{ onlineUsers }}>
      {children}
    </OnlineUsersContext.Provider>
  );
};

export const useOnlineUsers = () => useContext(OnlineUsersContext);