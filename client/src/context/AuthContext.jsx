import React, { useContext } from 'react'
import { createContext, useEffect, useState } from 'react'

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}


//main function Provider
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (userData) => {
        setUser(userData)
    }

    const logout = () => {
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ login, logout, user }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext