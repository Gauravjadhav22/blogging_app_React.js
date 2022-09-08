import axios from "../api/axios";
import useAuth from "./useAuth";

const useLogout = () => {
    const { setAuth } = useAuth();

    const logout = async () => {
        setAuth({});
        localStorage.removeItem("persist")
        try {
            await axios('/logout', {
                withCredentials: true
            });

            window.location.href='/'
            

        } catch (err) {
            console.error(err);
        }
    }

    return logout;
}

export default useLogout