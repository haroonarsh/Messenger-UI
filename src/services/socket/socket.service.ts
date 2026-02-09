import { io, Socket } from "socket.io-client";
import Cookies from "js-cookie";
import { SOCKET_URL } from "@/libs/api";

let socket: Socket | null = null;

export const initSocket = () => {
    const token = Cookies.get('token');
    if (!token || socket) return; // already initialized

    socket = io(SOCKET_URL, {
        withCredentials: true,
        auth: { token },
        reconnection: true,
        transports: ["websocket", "polling"],
        reconnectionAttempts: 5,
    });

    socket.on("connect", () => {
        console.log("Socket connected");
        // Join user room automatically
        socket?.emit("join", { userId: token });
    })

    socket.on("connect_error", (error) => {
        console.error("Socket connection error:", error.message);
    });

    socket.on("disconnect", (reason) => {
        console.log("Socket disconnected:", reason);
    });

    // Global error handler
    socket.on("error", (data) => {
        console.error("Socket error:", data);
    });
};

export const getSocket = (): Socket | null => socket;

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
};