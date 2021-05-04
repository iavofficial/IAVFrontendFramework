export interface Credentials {
    email: string;
    password: string;
}

export interface LoginProvider {
    hasAuthenticated(): Boolean;
    login(credentials: Credentials): any;
    logout(): any;
    getUsername(): string;
    [attribute: string]: any
}