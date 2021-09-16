import React from "react";

export interface Credentials {
    email: string;
    password: string;
}

export type securableFunctionType = (...rest: any) => Promise<any>;

export interface AuthenticationProvider {
    login(credentials: Credentials, ...rest: any): any;
    logout(): any;
    hasAuthenticated(): boolean;
    getUsername(): string;
    execIfAuthed(func: securableFunctionType): Promise<any>;
}

export interface AuthContextType {
    login(credentials: Credentials, ...rest: any): any;
    logout(): any;
    hasAuthenticated(): boolean;
    getUsername(): string;
    execIfAuthed(func: securableFunctionType): Promise<any>;
    [attribute: string]: any;
}

export const AuthContext = React.createContext<AuthContextType | undefined>(undefined);