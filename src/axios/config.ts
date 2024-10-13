import axios from "axios";

const token = localStorage.getItem("AccessToken");

const Axios_instance = axios.create({
    baseURL: `http://localhost:3000/api/v1`,
    headers: {
        "content-Type": "application/json",
    },
});

Axios_instance.interceptors.response.use(
    response => response,
    error => {
        if (error.response) {
            const { url } = error.response?.config;
            if (error.response.status === 403 && url !== "/auth") {
                if (typeof window !== "undefined") {
                    window.location.href = "/error/403";
                }
            } else if (error.response.status === 401 && url !== "/auth") {
                if (typeof window !== "undefined") {
                    window.localStorage.clear();
                }
            }
        }

        return Promise.reject(error);
    }
);

Axios_instance.interceptors.request.use((config) => {
    config.headers["Authorization"] = `Bearer ${token}`;

    return config;
});

export default Axios_instance;