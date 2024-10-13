import React, { Dispatch, FC, SetStateAction, useContext, useEffect, useState } from "react"
import { useLocation } from "react-router-dom";
import { FIRST_LEVEL_PATH } from "../../constants";
import { notification, Spin } from "antd";

export interface IAppContext {
    breadCrumb: string
    setBreadCrumb: Dispatch<SetStateAction<string>>
    firstLevelPath: string
    loading: boolean,
    setLoading: Dispatch<SetStateAction<boolean>>
    openNotiSuccess: (title?: string, description?: string) => void
    openNotiError: (title?: string, description?: string) => void
}

const AppContext = React.createContext<IAppContext | null>(null);

export const useAppContext = () => {
    const context = useContext(AppContext);

    if (!context) {
        throw new Error("useAppContext must be used within AppContextProvider!");
    }

    return context;
}

interface IAppContextProviderProps {
    children: React.ReactNode
}

const AppContextProvider: FC<IAppContextProviderProps> = ({ children }) => {
    const { pathname } = useLocation();
    const firstLevelPath = pathname.replace("/", "");
    const [breadCrumb, setBreadCrumb] = useState("");
    const [loading, setLoading] = useState(false);
    const [api, contextHolder] = notification.useNotification();

    const openNotiSuccess = (title?: string, description?: string) => {
        api.success({
            message: `${title} success!`,
            description: description,
            placement: "topRight",
            duration: 2,
        });
    };

    const openNotiError = (title?: string, description?: string) => {
        api.error({
            message: `${title} failed!`,
            description: description,
            placement: "topRight",
            duration: 2,
        });
    };

    useEffect(() => {
        switch (firstLevelPath) {
            case FIRST_LEVEL_PATH.QUIZ:
                setBreadCrumb("All quiz");
                break;
            case FIRST_LEVEL_PATH.TOPIC:
                setBreadCrumb("All topic");
                break;
            default:
                setBreadCrumb("");
                break;
        }
    }, [firstLevelPath])

    const values = {
        breadCrumb, setBreadCrumb,
        firstLevelPath,
        loading, setLoading,
        openNotiError, openNotiSuccess
    }

    return (
        <AppContext.Provider value={values}>
            <Spin spinning={loading}>{children}</Spin>
            {contextHolder}
        </AppContext.Provider>
    )
}

export default AppContextProvider