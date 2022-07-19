import React from "react";

export interface Credentials {
    email: string;
    password: string;
}

export type FetchAuthedFunction = (url: string, settings?: Object) => Promise<Response>;

export interface AuthenticationProvider {
    login(credentials: Credentials, ...rest: any): any;
    logout(): any;
    hasAuthenticated(): boolean;
    getUsername(): string;
    fetchAuthed: FetchAuthedFunction;
}

export interface AuthContextType {
    login(credentials: Credentials, ...rest: any): any;
    logout(): any;
    hasAuthenticated(): boolean;
    getUsername(): string;
    fetchAuthed: FetchAuthedFunction;
    [attribute: string]: any;
}

export const AuthContext = React.createContext<AuthContextType | undefined>(undefined);