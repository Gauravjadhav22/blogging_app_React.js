import axios from '../api/axios';
import useAuth from './useAuth';
import jwtDecode from "jwt-decode"

const useRefreshToken = () => {
    const { auth, setAuth } = useAuth();

    const refresh = async () => {

        try {
            const response = await axios.get('/token', {
                withCredentials: true
            });

            console.log(response.data);



            const dd = jwtDecode(response.data.accessToken)
console.log(dd);
            setAuth((prev) => ({ ...prev, accessToken: response.data.accessToken, user:dd.user }))
            console.log(auth);


            return response.data.accessToken;

        } catch (error) {
            console.log(error);
            window.location.href = '/login'
            localStorage.removeItem("persist")

        }


    }
    return refresh;
};

export default useRefreshToken;