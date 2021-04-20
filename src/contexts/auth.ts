import React from "react";
import LoginProvider, { Credentials } from "../components/login/loginProvider";

class PlaceholderContext implements LoginProvider {
    isAuthenticated = () => false
    login = (credentials: Credentials) => false
    logout = () => false
    getUsername = () => "PLACEHOLDER"
}

export default React.createContext<LoginProvider>(new PlaceholderContext());