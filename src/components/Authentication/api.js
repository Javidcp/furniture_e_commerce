import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5655",
    withCredentials: true,
});


api.interceptors.request.use(
    config => {
        const token = localStorage.getItem("token");
        if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

api.interceptors.response.use(
    res => res,
    async error => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
            const { data } = await axios.get("/api/auth/refresh", {
            baseURL: "http://localhost:5655",
            withCredentials: true,
            });

            const newToken = data.token;
            localStorage.setItem("token", newToken);
            api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
            originalRequest.headers["Authorization"] = `Bearer ${newToken}`;

            return api(originalRequest);
        } catch (err) {
            console.error("Refresh failed:", err.message);
            return Promise.reject(err);
        }
        }

        return Promise.reject(error);
    }
);

export default api;
