import React from 'react'

const Footer = () => {
    return (
        <footer className="p-4 bg-white sm:p-6 dark:bg-gray-900">
            {!true ? (
                <div className="md:flex md:justify-between">

                    <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                        <div className='text-white'>
                            <p>
                                Features:-<br />
                                Search user by username<br />
                                Write blogs ,<br />
                                Write comments,<br />
                                Like blog <br />
                            </p>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                                Follow us
                            </h2>
                            <ul className="text-gray-600 dark:text-gray-400">
                                <li className="mb-4">
                                    <a
                                        href="https://github.com/themesberg/flowbite"
                                        className="hover:underline "
                                    >
                                        Github
                                    </a>
                                </li>
                                <li>
                                    <a href="https://discord.gg/4eeurUVvTy" className="hover:underline">
                                        Discord
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                                Legal
                            </h2>
                            <ul className="text-gray-600 dark:text-gray-400">
                                <li className="mb-4">
                                    <a href="#" className="hover:underline">
                                        Privacy Policy
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:underline">
                                        Terms &amp; Conditions
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                </div>) :
                (<>


                    <div className="sm:flex sm:items-center sm:justify-center">
                        <span className="text-sm text-gray-200 sm:text-center dark:text-gray-400">
                            © 2022{" "}
                         
                                Blogging App
                          
                            . All Rights Reserved.
                        </span>

                    </div>
                </>)
            }
        </footer>

    )
}

export default Footer