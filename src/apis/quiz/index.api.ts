import Axios_instance from "../../axios/config";

const url = "/quiz";

export const QuizApis = {
    getAll: async () => {
        const response = await Axios_instance.get(url);

        return response.data || [];
    },
}