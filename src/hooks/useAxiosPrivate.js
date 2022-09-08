import { privateRequest } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";
import { useLocation } from "react-router-dom";
const useAxiosPrivate = () => {
    const location = useLocation()
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {

        const requestIntercept = privateRequest.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = privateRequest.interceptors.response.use(
            response => response,
            async (error) => {
              

                const prevRequest = error?.config;
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return privateRequest(prevRequest);
                }


                return Promise.reject(error);
            }
        );

        return () => {
            privateRequest.interceptors.request.eject(requestIntercept);
            privateRequest.interceptors.response.eject(responseIntercept);
        }
    }, [auth, refresh])

    return privateRequest;
}

export default useAxiosPrivate;