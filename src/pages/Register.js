import React, { useRef, useEffect, useState } from 'react'
import { BsCheck } from "react-icons/bs"
import { ImCross } from "react-icons/im"
import { FcInfo } from "react-icons/fc"
import axios from '../api/axios'
import { Link } from "react-router-dom"
import { IsLoading } from '../components/IsLoading'
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const Passwd_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const GMAIL_REGEX = /^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$/;
const REGISTER_URL = "/register";



const intro = () => {
    return (
        <div className='relative text-2xl w-fit h-fit p-4 text-center capitalize '>
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
const Register = () => {
    const userNameRef = useRef();
    const errRef = useRef();
    const [isLoading, setIsLoading] = useState(false);

    const [userName, setUserName] = useState("");
    const [fullName, setFullName] = useState("");
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserNameFocus] = useState(false);

    const [passwd, setPasswd] = useState("");
    const [validPasswd, setValidPasswd] = useState(false);
    const [PasswdFocus, setPasswdFocus] = useState(false);

    const [matchPasswd, setMatchPasswd] = useState("");
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);


    const [gmail, setGmail] = useState("");
    const [validGmail, setValidGmail] = useState(false);
    const [gmailFocus, setGmailFocus] = useState(false);

    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userNameRef.current.focus();
    }, []);

    useEffect(() => {
        setValidName(USER_REGEX.test(userName));
    }, [userName]);
    useEffect(() => {
        setValidGmail(GMAIL_REGEX.test(gmail));
    }, [gmail]);

    useEffect(() => {
        setValidPasswd(Passwd_REGEX.test(passwd));
        setValidMatch(passwd === matchPasswd);
    }, [passwd, matchPasswd]);

    useEffect(() => {
        setErrMsg("");
    }, [userName, passwd, matchPasswd]);

    const handleSubmit = async (e) => {
        setIsLoading(true)

        e.preventDefault();
        // if button enabled with JS hack
        const v1 = USER_REGEX.test(userName);
        const v2 = Passwd_REGEX.test(passwd);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {

            await axios.post(
                REGISTER_URL,
                JSON.stringify({
                    username: userName,
                    passwd,
                    fullname: fullName,
                    gmail: gmail && gmail
                }),
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );


            //clear state and controlled inputs
            setSuccess(true);
            setUserName("");
            setPasswd("");
            setMatchPasswd("");
            setIsLoading(false)

        } catch (err) {
            setIsLoading(false)

            if (!err?.response) {
                setErrMsg("No Server Response");
            } else if (err.response?.status === 409) {
                setErrMsg(`Username Taken......... Choose Another One`);
            } else {
                setErrMsg("Registration Failed");
            }
            errRef.current.focus();
        }
    };




    return (
        <>
            {success ? (
                <section className=' text-xl flex flex-col justify-center items-center '>
                    <h1 >Success!</h1>
                    <p>
                        <a href="/login" className='bg-blue-600 p-4 text-white text-center'>Sign In</a>
                    </p>
                </section>
            ) : isLoading ? <IsLoading /> : (
                <>
                    <div className='flex justify-center items-center mb-7 text-4xl text-red-500'>

                        <p
                            ref={errRef}
                            className={errMsg ? "errmsg" : "invisible"}
                            aria-live="assertive"
                        >
                            {errMsg}
                        </p>
                    </div>
                    <section className="h-fit flex justify-center sm:flex-col  items-center lg:flex-row md:flex-col xl:flex-row ">
                        <div className="bg-blue-50 px-20 md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
                            {intro()}
                        </div>
                        <br />
                        <div style={{ boxShadow: "1px 1px 12px " }} className="border-4 border-blue-100 w-128 mb-16">
                            <h1 className='text-xl font-bold mb-4 text-center'>
                                Creating New Account
                            </h1>
                            <form className='flex flex-col items-center justify-center' onSubmit={handleSubmit}>
                                <div className="mb-6 flex justify-between items-center w-96">

                                    <input
                                        type="text"
                                        required
                                        ref={userNameRef}
                                        value={userName}
                                        onChange={(e) => setUserName(e.target.value)}
                                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        placeholder="Username"
                                        onFocus={() => setUserNameFocus(true)}
                                        onBlur={() => setUserNameFocus(false)}
                                    />
                                    <BsCheck
                                        className={`text-6xl w-fit text-blue-600 ${validName ? "visible" : "invisible"}`}
                                    />
                                    <ImCross
                                        style={{ marginLeft: "-29px" }}

                                        className={`text-red-700 w-fit text-xl ${!validName || !userName ? "visible" : "invisible"}`}
                                    />

                                </div>
                                <p
                                    className={`flex text-xs ${userFocus && userName && !validName ? "visible" : "invisible"
                                        }`}
                                >
                                    <FcInfo />
                                    &nbsp;
                                    4 to 24 characters.
                                    Must begin with a letter.
                                    <br />
                                    Letters, numbers, underscores, hyphens allowed.
                                </p>
                                {/* Email input */}

                                <div className="mb-6 flex justify-between items-center w-96">
                                    <input

                                        type="text"
                                        value={gmail}
                                        onChange={(e) => setGmail(e.target.value)}
                                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        placeholder="Email Address (optional)"
                                        onFocus={() => setGmailFocus(true)}
                                        onBlur={() => setGmailFocus(false)}
                                    />
                                    <BsCheck
                                        className={`text-6xl text-blue-600 w-fit ${validGmail ? "visible" : "invisible"}`}
                                    />
                                    <ImCross

                                        style={{ marginLeft: "-29px" }}

                                        className={`text-red-700 text-lg ${!validGmail || !gmail ? "visible" : "invisible"}`}
                                    />


                                </div>
                                <p
                                    style={{ marginTop: "-25px" }}
                                    className={` ${gmailFocus && !validGmail ? "visible" : "invisible"}`}
                                >

                                    <span className='flex items-center text-xl '> <FcInfo /> &nbsp; Enter a valid Gmail</span>
                                </p>
                                {/* fullname input */}
                                <div className="mb-6 w-96 pr-10">
                                    <input
                                        type="text"
                                        required
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        placeholder="Fullname"
                                    />
                                </div>
                                <div className="mb-6 w-96 flex items-center">
                                    <input
                                        type="password"
                                        required
                                        onChange={(e) => setPasswd(e.target.value)}
                                        value={passwd}
                                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        placeholder="Password"
                                        onFocus={() => setPasswdFocus(true)}
                                        onBlur={() => setPasswdFocus(false)}
                                    />
                                    <BsCheck
                                        className={`text-6xl w-fit text-blue-700 ${validPasswd ? "visible" : "invisible"}`}
                                    />
                                    <ImCross
                                        style={{ marginLeft: "-29px" }}

                                        className={`text-red-700 text-lg ${!validPasswd ? "visible" : "invisible"}`}
                                    />

                                </div>
                                <p
                                    style={{ marginTop: "-20px" }}
                                    className={`flex justify-center items-center text-xl ${!validPasswd && PasswdFocus ? "visible" : "invisible"}`}
                                >
                                    <FcInfo style={{ marginTop: "-50px", width: "125px" }} className="text-3xl" />
                                    8 to 24 characters.
                                    Must include uppercase and lowercase letters, a number and a
                                    special character.
                                    <br />
                                    <span aria-label="exclamation mark">Allowed special characters:{" "}!@#$%</span>{" "}

                                </p>
                                <div className="mb-6 w-96 flex items-center">
                                    <input
                                        type="password"
                                        onChange={(e) => setMatchPasswd(e.target.value)}
                                        value={matchPasswd}
                                        required
                                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        placeholder="Confirm Password"
                                        onFocus={() => setMatchFocus(true)}
                                        onBlur={() => setMatchFocus(false)}
                                    />
                                    <BsCheck
                                        className={`text-6xl w-fit text-blue-700 ${validMatch && matchPasswd ? "visible" : "invisible"}`}
                                    />
                                    <ImCross
                                        style={{ marginLeft: "-29px" }}

                                        className={`text-red-700 text-lg ${!validMatch || !matchPasswd ? "visible" : "invisible"}`}
                                    />
                                </div>
                                <p
                                    className={`flex items-center mb-2 ${matchFocus && !validMatch ? "visible" : "invisible"}`}
                                >
                                    <FcInfo />
                                    <span>  &nbsp; Must match the first password input field.
                                    </span>
                                </p>
                                {/* Submit button */}
                                <button
                                    type="submit"
                                    className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                                    data-mdb-ripple="true"
                                    data-mdb-ripple-color="light"
                                >
                                    Sign up
                                </button>




                            </form>
                            <div className='mt-5 mb-4 text-xl'>
                                Having An Account &nbsp;

                                < Link to="/login">  <button className='bg-blue-500 text-white p-2 hover:bg-blue-700 '>Sign In</button></Link>


                            </div>
                        </div>
                    </section>
                </>)}


        </>

    )
}

export default Register