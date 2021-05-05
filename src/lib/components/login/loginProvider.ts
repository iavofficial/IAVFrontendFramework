export interface Credentials {
    email: string;
    password: string;
}

export interface LoginProvider {
    hasAuthenticated(): Boolean;
    login(credentials: Credentials, ...rest: any): any;
    logout(): any;
    getUsername(): string;
    [attribute: string]: any;
}