export interface Credentials {
    email: string;
    password: string;
}

export default interface LoginProvider {
    isAuthenticated(): boolean;
    login(credentials: Credentials): any;
    logout(): any;
    getUsername(): string;
    [attribute: string]: any
}