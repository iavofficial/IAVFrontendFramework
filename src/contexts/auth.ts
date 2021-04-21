import React from "react";
import LoginProvider, { Credentials } from "../components/login/loginProvider";

const placeholderContext: LoginProvider = {
    isAuthenticated: () => false,
    login: (credentials: Credentials) => false,
    logout: () => false,
    getUsername: () => "PLACEHOLDER"
}

export default React.createContext<LoginProvider>(placeholderContext);