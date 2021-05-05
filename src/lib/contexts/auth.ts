import React from "react";
import { LoginProvider, Credentials } from "../components/login/loginProvider";

const placeholderContext: LoginProvider = {
    hasAuthenticated: () => false,
    login: (credentials: Credentials) => false,
    logout: () => false,
    getUsername: () => "PLACEHOLDER",
    execIfAuthed: (func: Function) => func()
}

const authContext = React.createContext<LoginProvider>(placeholderContext);

export { authContext as AuthContext };