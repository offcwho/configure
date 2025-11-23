import { BACKEND_HEADERS, BACKEND_URL } from "@/lib/constants";
import axios from "axios";

const api = axios.create({
    baseURL: BACKEND_URL,
    headers: BACKEND_HEADERS,
    withCredentials: true,
});

let refreshPromise: Promise<void> | null = null;

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (!error.response) {
            return Promise.reject(error);
        }

        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            if (!refreshPromise) {
                refreshPromise = (async () => {
                    try {
                        await api.post('/auth/refresh');
                    } finally {
                        refreshPromise = null;
                    }
                })();
            }

            try {
                await refreshPromise;
                return api(originalRequest);
            } catch (refreshError) {
                if (typeof window !== 'undefined') {
                    localStorage.removeItem('access_token');
                }
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;