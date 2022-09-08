import React, { useContext, useDebugValue } from 'react'
import Authcontext from "../context/AuthProvider"

const useAuth = () => {
    const { auth } = useContext(Authcontext);


    useDebugValue(auth, auth => auth?.user ? "Logged In" : "Logged Out")
    return useContext(Authcontext)
}

export default useAuth