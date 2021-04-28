import React from "react";
import { LoginProvider, Credentials } from "../components/login/loginProvider";

const placeholderContext: LoginProvider = {
    isAuthenticated: () => false,
    login: (credentials: Credentials) => false,
    logout: () => false,
    getUsername: () => "PLACEHOLDER"
}

const authContext = React.createContext<LoginProvider>(placeholderContext);

export { authContext as AuthContext };