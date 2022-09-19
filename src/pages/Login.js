import React from 'react'
import jwtDecode from "jwt-decode"
import { useRef, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";

import axios from "../api/axios";
import { IsLoading } from '../components/IsLoading';
const LOGIN_URL = "/auth";
const intro = () => {
    return (

        <div className='text-2xl w-fit h-fit p-4 text-center capitalize '>
            " share thoughts via blogging "
            <br />
            <br />
            <div className='text-sm leading-7'>
                write a blog get likes and comments by others


                <br />
                <br />
                --share opinions about others blog by comments
                <br />
                <br />
                <h1 className='text-lg'>

                    --Features
                </h1>
                <ul className=' pl-10 list-disc text-left'>
                    <li>
                        like counting

                    </li>
                    <li>
                        uploading profile picture

                    </li>
                    <li>
                        share pics in blog

                    </li>
                </ul>

            </div>
        </div>
    )
}
const Login = () => {
    const { setAuth } = useAuth();

    const userRef = useRef();
    const errRef = useRef();

    const [userName, setUserName] = useState("");
    const [passwd, setpasswd] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg("");
    }, [userName, passwd]);

    const handleSubmit = async (e) => {
        setIsLoading(true)
        e.preventDefault();
        try {

            const response = await axios.post(
                LOGIN_URL,
                JSON.stringify({ username: userName, passwd }),
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );
            const accessToken = response?.data?.accessToken;

            setAuth({ accessToken, user: { userId: response.data._id, username: response.data.username, gmail: response.data.gmail, fullname: response.data.fullname } });



            setUserName('');
            setpasswd('');
            localStorage.setItem("persist", "true")
            window.location.href = '/'


            setIsLoading(false)
        } catch (err) {
            setIsLoading(false)
            if (!err?.response) {
                setErrMsg("No Server Response");
            } else if (err.response?.status === 400) {
                setErrMsg("Missing Username or Password");
            } else if (err.response?.status === 401) {
                setErrMsg("Unauthorized");
            } else {
                setErrMsg("Login Failed");
            }
            errRef.current.focus();
        }
    };
    return (
        <>
            {
                isLoading ? (<IsLoading/>) : (
                    <section className="h-fit ">
                        <div className=" px-6 py-12 h-full text-center mb-4">
                            <p
                                ref={errRef}
                                className={`text-red-700 text-4xl ${errMsg ? "visible" : "invisible"}`}
                                aria-live="assertive"
                            >
                                {errMsg}
                            </p>
                            <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800 ">
                                <div className="bg-blue-50 px-20 md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
                                    {intro()}
                                </div>

                                <br />
                                <div className="md:w-8/12 lg:w-5/12 lg:ml-20 bg-slate-50 p-7">
                                    <h1 className='text-xl font-bold mb-4 text-center'>
                                        Signing In
                                    </h1>
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-6">
                                            <input
                                                ref={userRef}
                                                onChange={(e) => setUserName(e.target.value)}
                                                type="text"
                                                className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                placeholder="Username"
                                            />
                                        </div>


                                        <div className="mb-6">
                                            <input
                                                onChange={(e) => setpasswd(e.target.value)}
                                                type="password"
                                                className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                placeholder="Password"
                                            />
                                        </div>


                                        {/* Submit button */}
                                        <button
                                            type="submit"
                                            className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                                            data-mdb-ripple="true"
                                            data-mdb-ripple-color="light"
                                        >
                                            Sign in
                                        </button>
                                        <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                                            <p className="text-center font-semibold mx-4 mb-0">OR</p>
                                        </div>


                                    </form>
                                    <div className='mt-5 mb-4'>
                                        Not Having An Account &nbsp;
                                        < Link to="/register">  <button className='bg-blue-500 text-white p-2 hover:bg-blue-700 '>Sign Up</button></Link>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                )
            }


        </>
    )
}

export default Login