import React from "react";

export interface Credentials {
    email: string;
    password: string;
}

type FetchAuthed = (url: string, settings?: Object) => Promise<Response>;

export interface AuthenticationProvider {
    login(credentials: Credentials, ...rest: any): any;
    logout(): any;
    hasAuthenticated(): boolean;
    getUsername(): string;
    fetchAuthed: FetchAuthed;
}

export interface AuthContextType {
    login(credentials: Credentials, ...rest: any): any;
    logout(): any;
    hasAuthenticated(): boolean;
    getUsername(): string;
    fetchAuthed: FetchAuthed;
    [attribute: string]: any;
}

export const AuthContext = React.createContext<AuthContextType | undefined>(undefined);