'use client';

import React, { createContext, useState, ReactNode, useEffect, useContext } from "react";
import { authService } from "@/services/auth/auth.service";
import { IUser, LoginRequest, RegisterRequest } from "@/libs/types";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";

interface AuthContextType {
    user: IUser | null;
    loading: boolean;
    register: (payload: RegisterRequest, file?: File) => Promise<void>;
    login: (payload: LoginRequest) => Promise<void>;
    logout: () => Promise<void>;
    refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<IUser | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const fetchUser = async () => {
        try {
            const fetchedUser = await authService.getMe();
            setUser(fetchedUser);
            if (fetchUser !== null && fetchedUser !== undefined) {
                router.push("/main");
            }
        } catch (error: unknown) {
            console.error("Error fetching user:", error);
            setUser(null);  
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const token = Cookies.get("token");
        if (token) {
            fetchUser();
        }
    }, [fetchUser]);

    if (loading === true) {
        toast.loading("Loading...", { duration: 3000, position: "top-right"});
    }

    const login = async (payload: LoginRequest) => {
        try {
            setLoading(true);
            await authService.login(payload);
            await fetchUser();
            toast.success("Logged in successfully", { duration: 3000, position: "top-right", icon: "🚀"});
            router.push("/main")
        } catch (error: unknown) {
            console.log("Error logging in:", error);
            if (error instanceof Error) {
                toast.error(error.message || "Failed to log in", { duration: 3000, position: "top-right"});
            }
        } finally {
            setLoading(false);
        }
    };

    const register = async (payload: RegisterRequest, file?: File) => {
        try {
            setLoading(true);
            await authService.register(payload, file);
            await fetchUser();
            toast.success("Registered successfully", { duration: 3000, position: "top-right", icon: "🚀"}); 
            router.push("/main")
        } catch (error: unknown) {
            console.error("Error registering:", error);
            if (error instanceof Error) {
                toast.error(error.message || "Failed to register", { duration: 3000, position: "top-right"});
            }
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            await authService.logout();
            setUser(null);
            router.push("/");
            toast.success("Logged out successfully", { duration: 3000, position: "top-right"});
        } catch (error: unknown) {
            console.error("Error logging out:", error);
            toast.error("Error logging out", { duration: 3000, position: "top-right"});
        }
    }

    return (
        <AuthContext.Provider value={{ user, loading, register, login, logout, refreshUser: fetchUser}}>
            <Toaster />
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within a AuthProvider");
    }
    return context;
};