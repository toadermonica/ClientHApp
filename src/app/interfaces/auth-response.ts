export interface AuthResponse {
    status: any;
    user: {
        id: number,
        name: string,
        email: string,
        access_token: string,
        refresh_token: string
    };
}
