"use client"

import { getUser, UserProps } from "@/services/auth.service";
import { createContext, useContext, useEffect, useState } from "react";

interface UserContext {
    user: UserProps | undefined;
    setUser: (user: UserProps | undefined) => void;
    error: boolean;
}

const UserContext = createContext<UserContext | undefined>(undefined)

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<UserProps>();
    const [error, setError] = useState(true);

    const fetchData = async () => {
        try {
            const response = await getUser();
            if (response) setUser(response);
            setError(false)
        } catch (err) {
            setError(true)
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    const value: UserContext = {
        user,
        setUser,
        error
    }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within an AuthProvider');
    }
    return context;
}