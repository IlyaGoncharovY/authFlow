export interface LoginLocalResponse {
    token: string;
    refreshToken: string;
    username: string;
}

export interface LoginCookieResponse {
    message: string;
}

export interface AuthRequestBody {
    username: string;
    password: string;
}

export interface RegisterResponse {
    token: string;
    refreshToken: string;
    username: string;
}
