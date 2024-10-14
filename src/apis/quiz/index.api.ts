import Axios_instance from "../../axios/config";
import { IQuiz } from "../../types/quiz/index.type";

const url = "/quiz";

export const QuizApis = {
    getAll: async () => {
        const response = await Axios_instance.get(url);

        return response.data || [];
    },
    getById: async (id?: string) => {
        const response = await Axios_instance.get(`${url}/${id}`);

        return response.data || {};
    },
    create: async (quiz?: IQuiz) => {
        const response = await Axios_instance.post(url, quiz);

        return response.data || {};
    },
    update: async (id?: string, quiz?: IQuiz) => {
        const response = await Axios_instance.patch(`${url}/${id}`, quiz);

        return response.data || {};
    },
    remove: async (id?: string) => {
        const response = await Axios_instance.delete(`${url}/${id}`);

        return response.data || {};
    },
}