import { instance } from "./api.config.ts";

export default class AuthService {
    login(login: string, password: string) {
        return instance.post("/auth/login", {login, password });
    }

    refreshToken() {
        return instance.get("/auth/refresh-token");
    }

    logout() {
        return instance.post("/auth/logout");
    }
}
