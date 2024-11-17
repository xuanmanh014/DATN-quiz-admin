import { AxiosResponse } from "axios";
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { useAppContext } from "../../contexts/app";
import { IGetDto } from "../../types/common/index.types";

interface IUseFetchResponse<T> {
    data?: T,
    refetchData: () => void,
    setData: Dispatch<SetStateAction<T | undefined>>
}

export const useFetch = <T>(fetchFunction: (params: IGetDto) => Promise<AxiosResponse<any, any>>, params?: IGetDto): IUseFetchResponse<T> => {
    const [data, setData] = useState<T>();
    const { setLoading } = useAppContext();
    const { search } = params as IGetDto;

    const getData = () => {
        setLoading(true);
        fetchFunction(params || {}).then(response => {
            setData(response.data.data.map((item: any) => ({ ...item, key: item._id })));
        }).catch((error) => {
            console.log(error);
        }).finally(() => setLoading(false));
    }

    useEffect(() => {
        getData()
    }, [search]);

    return {
        data,
        refetchData: getData,
        setData
    }
}