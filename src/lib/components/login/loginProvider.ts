export interface Credentials {
    email: string;
    password: string;
}

export type securableFunctionType = (...rest: any) => Promise<any>;

export interface LoginProvider {
    login: (credentials: Credentials, ...rest: any) => any;
    logout(): any;
    hasAuthenticated(): Boolean;
    getUsername(): string;
    execIfAuthed: (func: securableFunctionType) => Promise<any>;
    [attribute: string]: any;
}

export class NotAuthedError extends Error {
    static code = "NotAuthedError";
    constructor(message: string) {
        super(message);
    }
}