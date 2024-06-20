import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";

export const instance = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:8084",
});

instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
});

instance.interceptors.response.use(
    (config: AxiosResponse) => {
        return config;
    },
    async (error) => {
        const originalRequest = { ...error.config };
        originalRequest._isRetry = true;
        if (
            error.response.status === 401 &&
            error.config &&
            !error.config._isRetry
        ) {
            try {
                const resp = await instance.get("/auth/refresh-token");
                localStorage.setItem("token", resp.data.data.refreshToken);
                return instance.request(originalRequest)
            } catch (error) {
                console.log("AUTH ERROR");
            }
        }
        throw error;
    }
);
