"use client"

import { useState, type ReactNode } from "react";
import {DetailsContext} from "@/contexts/DetailsContext.ts";

export const DetailsProvider = ({ children } : { children: ReactNode }) => {
    const [username, setUsername] = useState("Guest");
    const [email, setEmail] = useState("Guest@gmail.com");

    return (
        <DetailsContext.Provider value={{
            setUsername, username, setEmail, email
        }}>
            {children}
        </DetailsContext.Provider>
    )
}