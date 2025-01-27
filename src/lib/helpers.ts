import  { jwtDecode, JwtPayload } from 'jwt-decode';
import { toast } from 'sonner';

// auth helpers

const refresh = localStorage.getItem("refresh");
const access = localStorage.getItem("access");

interface TokenPayload {
    exp: number;
}

export const isTokenExpired = (token: string): boolean => {
    try {
        const decoded = jwtDecode<TokenPayload>(token);
        const currentTime = Date.now() / 1000;
        return decoded.exp < currentTime;
    } catch (error) {
        toast.error(`Error decoding token: ${error}`);
        return true;
    }
};

export const isAuthenticated = () => {
    if (access !== null && refresh !== null) {
        return true;
    } else {
        return false;
    }
};

export const decodeToken = (token: string) => {
    try {
        const result = jwtDecode<JwtPayload & { user_id: string, token_type: string }>(token);
        return {
            token_type: result.token_type,
            exp: result.exp,
            jti: result.jti,
            user_id: result.user_id,
            iat: result.iat,
        }
    } catch (error) {
        toast.error(`Error decoding token: ${error}`);
        return null;
    }
}