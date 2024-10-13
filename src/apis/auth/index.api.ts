import Axios_instance from "../../axios/config"

const url = "/auth";

export const AuthApis = {
    login: async (values: any) => {
        const response = await Axios_instance.post(`${url}/login`, values);
        return response.data || "";
    }
}

export const handleLogout = () => {
    localStorage.removeItem("AccessToken");
    window.location.href = "/";
}