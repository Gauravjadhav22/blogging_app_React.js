import axios from '../api/axios';
import useAuth from './useAuth';
import jwtDecode from "jwt-decode"

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {

        try {
            const response = await axios.get('/token', {
                withCredentials: true
            });
    
            setAuth(prev => {
    
                return {
                    ...prev,
                    accessToken: response.data.accessToken
                }
            });
    
            //     setDecoded(jwtDecode(response.data.accessToken))
            const dd = jwtDecode(response.data.accessToken)
            setAuth((prev) => ({ ...prev, user: dd.user }))
            //     console.log(decoded);
            //    JSON.stringify(localStorage.setItem("decoded",decoded))
    
            return response.data.accessToken;
            
        } catch (error) {
            console.log(error);
            window.location.href='/login'
            localStorage.removeItem("persist")
            
        }

     
    }
    return refresh;
};

export default useRefreshToken;