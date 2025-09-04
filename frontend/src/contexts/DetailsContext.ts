"use client"

import {createContext} from "react";

export interface Details {
    username: string;
    email: string;
}

export interface DetailsContextType {
    username: string;
    email: string;
    setUsername: (username: string) => void;
    setEmail: (email: string) => void
}

export const DetailsContext = createContext<DetailsContextType>({
    username: "Guest",
    email: "guest@gmail.com",
    setUsername: () => {},
    setEmail: () => {},
})