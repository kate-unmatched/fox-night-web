import { makeAutoObservable } from "mobx";
import AuthService from "../api/api.auth.ts";

class AuthStore {
    isAuth = false;
    isAuthInProgress = false;
    authService = new AuthService();
    role = "";
    id = 0;

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    async login(login: string, password: string) {
        this.isAuthInProgress = true;
        try {
            const resp = await this.authService.login(login, password);
            localStorage.setItem("token", resp.data.data.accessToken);
            this.isAuth = true;
            setTimeout(() => {
                window.location.href = "http://localhost:5173/users";
            }, 500);
        } catch (err) {
            console.log("login error");
        } finally {
            this.isAuthInProgress = false;
        }
    }

    async checkAuth() {
        this.isAuthInProgress = true;
        try {
            const resp = await this.authService.refreshToken();
            localStorage.setItem("token", resp.data.data.refreshToken);
            this.isAuth = true;
            this.role = resp.data.data.role;
            this.id = resp.data.data.id;
        } catch (err) {
            console.log("auth error");
        } finally {
            this.isAuthInProgress = false;
        }
    }

    async logout() {
        this.isAuthInProgress = true;
        try {
            await this.authService.logout();
            this.isAuth = false;
            localStorage.removeItem("token");
        } catch (err) {
            console.log("logout error");
        } finally {
            this.isAuthInProgress = false;
        }
    }

    get getUserId() {
        return this.id;
    }
}

export default new AuthStore();
