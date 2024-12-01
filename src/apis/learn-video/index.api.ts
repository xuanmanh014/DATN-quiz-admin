import Axios_instance from "../../axios/config";
import { ILearnVideo } from "../../types/learn-video/index.type";

const url = "/learn-video";

export const LearnVideoApis = {
    getAll: async () => {
        const response = await Axios_instance.get(url);

        return response.data || [];
    },
    getById: async (id?: string) => {
        const response = await Axios_instance.get(`${url}/${id}`);

        return response.data || {};
    },
    create: async (quiz?: ILearnVideo) => {
        const response = await Axios_instance.post(url, quiz);

        return response.data || {};
    },
    update: async (id?: string, quiz?: ILearnVideo) => {
        const response = await Axios_instance.patch(`${url}/${id}`, quiz);

        return response.data || {};
    },
    remove: async (id?: string) => {
        const response = await Axios_instance.delete(`${url}/${id}`);

        return response.data || {};
    },
}