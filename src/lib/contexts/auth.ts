import React from "react";

export interface Credentials {
    email: string;
    password: string;
}

export type ensureAuthHoF = (url: string, settings: Object, func: securableFunctionType) => Promise<any>;
export type securableFunctionType = (response: Response, ...rest: any) => any;

export interface AuthenticationProvider {
    login(credentials: Credentials, ...rest: any): any;
    logout(): any;
    hasAuthenticated(): boolean;
    getUsername(): string;
    execIfAuthed: ensureAuthHoF;
}

export interface AuthContextType {
    login(credentials: Credentials, ...rest: any): any;
    logout(): any;
    hasAuthenticated(): boolean;
    getUsername(): string;
    execIfAuthed: ensureAuthHoF;
    [attribute: string]: any;
}

export const AuthContext = React.createContext<AuthContextType | undefined>(undefined);