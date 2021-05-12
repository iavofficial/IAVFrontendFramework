import React from "react";
import { LoginProvider, Credentials } from "../components/login/loginProvider";
import { securableFunctionType } from "../components/login/loginProvider"

export const placeholderContext: LoginProvider = {
    hasAuthenticated: () => false,
    login: (credentials: Credentials) => false,
    logout: () => false,
    getUsername: () => "PLACEHOLDER",
    execIfAuthed: (func: securableFunctionType) => func()
}

const authContext = React.createContext<LoginProvider>(placeholderContext);

export { authContext as AuthContext };