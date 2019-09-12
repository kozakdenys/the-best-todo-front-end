export interface AuthPayload {
    token: string;
    user: User;
}

export interface User {
    id: string;
    name: string;
}
