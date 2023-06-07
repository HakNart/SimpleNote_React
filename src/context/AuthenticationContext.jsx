import { createContext, useContext, useState } from "react";
import { executeJwtAuthenticationService, executeRegistrationAuthenticationService } from "../api/AuthenticationApiService";
import { apiClient } from "../api/ApiClient";
import { async } from "postcss-js";

export const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export default function AuthProvider({ children }) {

    const [isAuthenticated, setAuthenticated] = useState(false);
    const [username, setUsername] = useState(null) // In this case, username = user email
    const [token, setToken] = useState(null)

    async function login(username, password) {

        try {

            const response = await executeJwtAuthenticationService(username, password)

            if (response.status == 200) {

                const jwtToken = 'Bearer ' + response.data.accessToken

                setAuthenticated(true)
                setUsername(username)
                setToken(jwtToken)

                apiClient.interceptors.request.use(
                    (config) => {
                        config.headers.Authorization = jwtToken
                        return config
                    }
                )

                return true
            } else {
                logout()
                return false
            }
        } catch (error) {
            logout()
            return false
        }
    }



    function logout() {
        setAuthenticated(false)
        setToken(null)
        setUsername(null)
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, username, token }}>
            {children}
        </AuthContext.Provider>
    )

}