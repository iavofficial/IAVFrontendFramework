import React from "react";

export interface Credentials {
    email: string;
    password: string;
}

export type EnsureAuthHoF = (url: string, func: SecurableFunctionType, settings?: Object) => Promise<any>;
export type SecurableFunctionType = (response: Response, ...rest: any) => any;

export interface AuthenticationProvider {
    login(credentials: Credentials, ...rest: any): any;
    logout(): any;
    hasAuthenticated(): boolean;
    getUsername(): string;
    execIfAuthed: EnsureAuthHoF;
}

export interface AuthContextType {
    login(credentials: Credentials, ...rest: any): any;
    logout(): any;
    hasAuthenticated(): boolean;
    getUsername(): string;
    execIfAuthed: EnsureAuthHoF;
    [attribute: string]: any;
}

export const AuthContext = React.createContext<AuthContextType | undefined>(undefined);