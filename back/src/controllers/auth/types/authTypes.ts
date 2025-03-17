import { JwtPayload as DefaultJwtPayload } from 'jsonwebtoken';

export interface AuthRequestBody {
    username: string;
    password: string;
}

export interface RefreshRequestBody {
    refreshToken?: string;
}

export interface JwtPayload extends DefaultJwtPayload {
    username: string;
}
