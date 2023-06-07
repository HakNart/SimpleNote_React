
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthenticationContext'

export default function LoginComponent() {
    const [email, setEmail] = useState('')
    

    const [password, setPassword] = useState('')

    const [showErrorMessage, setShowErrorMessage] = useState(false)

    const navigate = useNavigate()
    const authContext = useAuth()

    function handleEmailChange(event) {
        setEmail(event.target.value)
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value)
    }

    async function handleSubmit() {
        if (await authContext.login(email, password)) {
            navigate(`/notes`)
        } else {
            setShowErrorMessage(true)
        }
    }
    return (
        <main className='login'>
            <div className='flex flex-col items-center justify-center'>
                <div className="mx-auto w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                            Sign in to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label for="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="name@company.com" value={email} onChange={handleEmailChange} />
                            </div>
                            <div>
                                <label for="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                                <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " required="" value={password} onChange={handlePasswordChange} />
                            </div>

                            <button type="button" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center 0" onClick={handleSubmit}>Sign in</button>
                            <p className="text-sm font-light text-gray-500">
                                Don't have an account yet? <a href="/signup" className="font-medium text-primary-600 hover:underline">Sign up</a>
                            </p>
                        </form>
                        {showErrorMessage && <div className="errorMessage text-red-400 p-2">Authentication Failed.
                            Please check your credentials.</div>}
                    </div>
                </div>
            </div>
        </main>
    )
}
