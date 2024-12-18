import Axios_instance from "../../axios/config";
import { IGetDto } from "../../types/common/index.types";
import { ITopic } from "../../types/topic/index.type";

const url = "/topic";

export const TopicApis = {
    getAll: async (query?: IGetDto) => {
        const response = await Axios_instance.get(url, { params: query });

        return response.data || [];
    },
    getById: async (id?: string) => {
        const response = await Axios_instance.get(`${url}/${id}`);

        return response.data || {};
    },
    create: async (topic?: ITopic) => {
        const response = await Axios_instance.post(url, topic);

        return response.data || {};
    },
    update: async (id?: string, topic?: ITopic) => {
        const response = await Axios_instance.patch(`${url}/${id}`, topic);

        return response.data || {};
    },
    remove: async (id?: string) => {
        const response = await Axios_instance.delete(`${url}/${id}`);

        return response.data || {};
    },
}