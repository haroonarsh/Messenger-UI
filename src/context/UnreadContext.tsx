'use client';

import React, { createContext, useContext, useState } from "react";

interface UnreadContextType {
    unreadCounts: { [friendId: string]: number };
    incrementUnread: (friendId: string) => void;
    resetUnread: (friendId: string) => void;
}

const UnreadContext = createContext<UnreadContextType>({
    unreadCounts: {},
    incrementUnread: () => {},
    resetUnread: () => {},
});

export const UnreadProvider = ({ children }: { children: React.ReactNode }) => {
    const [unreadCounts, setUnreadCounts] = useState<{ [friendId: string]: number }>({});

    const incrementUnread = (friendId: string) => {
        setUnreadCounts(prev => ({
            ...prev,
            [friendId]: (prev[friendId] || 0) + 1
        }));
    };

    const resetUnread = (friendId: string) => {
        setUnreadCounts(prev => ({
            ...prev,
            [friendId]: 0
        }));
    };
    
    return (
        <UnreadContext.Provider value={{ unreadCounts, incrementUnread, resetUnread }}>
            {children}
        </UnreadContext.Provider>
    );
};

export const useUnread = () => useContext(UnreadContext);