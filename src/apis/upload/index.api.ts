import Axios_upload from "../../axios/upload";

const url = "/upload";

export const UploadApis = {
    uploadFile: async (image: any) => {
        const response = await Axios_upload.post(url, image);

        return response?.data || {};
    },
    deleteFile: async (id?: string) => {
        const response = await Axios_upload.delete(`${url}/${id}`);

        return response?.data || {};
    }
}