export interface Credentials {
    email: String;
    password: String;
}

interface LoginProvider {
    isAuthenticated: () => boolean;
    login: (credentials: Credentials) => any;
    logout: () => any;
    getUsername: () => String;
}

export default LoginProvider;