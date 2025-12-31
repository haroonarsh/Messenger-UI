'use client';

import { useEffect, useState } from "react";
import { useAuth } from "../auth/useAuth"
import { Socket } from "socket.io-client";
import { disconnectSocket, getSocket, initSocket } from "@/services/socket/socket.service";
import { get } from "http";
import { User } from "@/libs/types";
import toast from "react-hot-toast";

export const useSocket = () => {
    const { user, logout } = useAuth();
    const [socket, setSocket] = useState<Socket | null>(null);


    useEffect(() => {
        const currentSocket = getSocket();
        if (currentSocket) {
            // Friend request received
            currentSocket.on("friendRequest", (data: { from: User; message: string }) => {
                toast(`New friend request from ${data.from.username}`);
            });

            //Request accepted
            currentSocket.on("friendRequestAccepted", (data: { from: User }) => {
                toast(`${data.from.username} accepted your friend request!`);
                // Refresh friend list
                // window.location.reload();
            });
        }

        return () => {
            if (currentSocket) {
                currentSocket.off("friendRequest");
                currentSocket.off("friendRequestAccepted");
            }
        };
    }, []);

    useEffect(() => {
        if (user) {
            initSocket();
            setSocket(getSocket());
        }

        return () => {
            if (!user) disconnectSocket();
        };
    }, [user]);

    useEffect(() => {
        const currentSocket = getSocket();
        if (currentSocket) {
            currentSocket.on("authentication_error", () => {
                logout();
            }); 
        }

        return () => {
            if (currentSocket) currentSocket.off("authentication_error");
        };
    }, [logout]);

    useEffect(() => {
        if (!socket) return;

        const onlineUsers = new Set<string>();

        socket.on("userOnline", ({ userId }: { userId: string }) => {
        onlineUsers.add(userId);
        // You can use a global state or context to update online status
        // For now, we'll handle in component
        });

        socket.on("userOffline", ({ userId }: { userId: string }) => {
            onlineUsers.delete(userId);
        });

        return () => {
            socket.off("userOnline");
            socket.off("userOffline");
        };
    }, [socket]);

    const joinConversation = (conversationId: string) => {
        const currentSocket = getSocket();
        if (currentSocket && conversationId) {
            currentSocket.emit("join-conversation", { conversationId });
        }
    };

    const leaveConversaton = (conversationId: string) => {
        const currentSocket = getSocket();
        if (currentSocket && conversationId) {
            currentSocket.emit("leave-conversation", { conversationId });
        }
    };
    
    const sendMessage = (payload: { conversationId: string; text: string }) => {
        socket?.emit("send-message", payload);
    };

    return { socket, joinConversation, leaveConversaton, sendMessage };
};