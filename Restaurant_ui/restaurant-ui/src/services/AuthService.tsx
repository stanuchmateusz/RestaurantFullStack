import axios, {AxiosError} from 'axios';
import {jwtDecode, JwtPayload} from 'jwt-decode';

const API_URL = process.env.REACT_APP_API_URL as string;
const LOGIN_URL = `${API_URL}auth/authenticate`
const REGISTER_URL = `${API_URL}auth/register`
const JWT = "JWT";
const ERROR_MESSAGE = "Something went wrong. Please try again later.";

const AVAILABLE_ROLES: string[] = ["ROLE_USER", "ROLE_ADMIN, ROLE_MANAGER"];

class AuthService {
    async login(email: string, password: string): Promise<boolean> {
        const data = {email, password};

        try {
            const response = await axios.post(LOGIN_URL, data);

            if (response.data.access_token) {
                this.saveToken(response.data.access_token);
                return Promise.resolve(true);
            }
        } catch (error: any) {
            if (error instanceof AxiosError) {
                // Unauthorized
                if (error.response?.status === 401) {
                    return Promise.resolve(false);
                } else { // Other error
                    console.error(error);
                    throw new Error(ERROR_MESSAGE);
                }
            }
        }
        return Promise.resolve(false);
    }

    async register(firstname: string, lastname: string, email: string, password: string): Promise<boolean> {
        try {
            const response = await axios.post(REGISTER_URL, {firstname, lastname, email, password});

            if (response.data.access_token) {
                this.saveToken(response.data.access_token);
                return Promise.resolve(true);
            }
        } catch (error: any) {
            if (error instanceof AxiosError) {
                // Email already exists
                if (error.response?.status === 401) {
                    return Promise.resolve(false);
                } else { // Other error
                    console.error(error);
                    throw new Error(ERROR_MESSAGE);
                }
            }
        }

        return Promise.resolve(false);
    };

    private saveToken(token: string) {
        localStorage.setItem(JWT, JSON.stringify(token).replaceAll(`"`, ''));
    }

    isAuthenticated(): boolean {
        return localStorage.getItem(JWT) !== null && this.getCurrentUser() !== null;
    }

    logout(): void {
        localStorage.removeItem(JWT);
    }

    getCurrentUser(): string | null {
        return jwtDecode(localStorage.getItem(JWT) || '{}').sub || null;
    }

    getUserRole(): string[] | string | null {
        return jwtDecode<JWT>(localStorage.getItem(JWT) || '{}').role || null;
    }

    hasModeratorPermission(): boolean {
        let userRole = ""
        try {
            userRole = this.getUserRole() as string;
        } catch (error) {
            return false;
        }
        return userRole === "ROLE_ADMIN" || userRole === "ROLE_MANAGER";
    }
}

interface JWT extends JwtPayload {
    role: string
}

export default new AuthService();
