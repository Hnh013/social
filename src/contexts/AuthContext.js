import { createContext, useState, useEffect } from "react";
import jwt_decode from 'jwt-decode';
 
const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({children}) => {
       
    const [user,setUser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null);

    const [authTokens,setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);

    const [loading,setLoading]  = useState(true);

    const loginUser = async (requestData) => {
        let response = await fetch('https://sadeqmousawi.ir/api/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'email': requestData?.email, 'password': requestData?.password })
        });

        let data = await response.json();

        if (response.status !== 200) {
            alert('Oops, Something went wrong!')
            return { message: 'failed' };
        } else {
            setAuthTokens(data);
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data));
            return { message: 'success' };
        }
    }

    const logoutUser = async () => {
        let response = await fetch('https://sadeqmousawi.ir/api/token/blacklist/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'refresh': authTokens.refresh })
        });

        let data = await response.json();

        if (response.status === 200 && data && data.length && data[0] === 'Token Blacklisted') {
            setAuthTokens(null);
            setUser(null);
            localStorage.removeItem('authTokens')
            return { message: 'success' };
        } else {
            alert('Oops, Something went wrong!')
            return { message: 'failed' };
        }
    }

    const updateToken = async () => {
        let response = await fetch('https://sadeqmousawi.ir/api/token/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'refresh': authTokens.refresh })
        });

        let data = await response.json();

        if (response.status === 200) {
            setAuthTokens(data);
            setUser(jwt_decode(data.access));
            localStorage.setItem('authTokens', JSON.stringify(data));
        } else {
            logoutUser();
        }
    }

    const registerUser = async (requestData) => {
        let response = await fetch('https://sadeqmousawi.ir/api/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'name': `${requestData?.firstName} ${requestData?.lastName}` , 'email': requestData?.email, 'password': requestData?.password })
        });

        let data = await response.json();

        if (response.status !== 201) {
            alert('Oops, Something went wrong!')
            return { message: 'failed' };
        } else {
            // setAuthTokens(data);
            // setUser(jwt_decode(data.access))
            // localStorage.setItem('authTokens', JSON.stringify(data));
            return { message: 'success' };
        }
    }

    const contextData = {
        loginUser: loginUser,
        logoutUser: logoutUser,
        registerUser: registerUser,
        user: user
    }

    useEffect( () => {
        
        let i = setInterval( () => {
            if (authTokens) {
               updateToken();
            }
        },24000)
        return () => clearInterval(i);
    }, [ authTokens, loading])

    return(
        <AuthContext.Provider value={ contextData }>
            {children}
        </AuthContext.Provider>
    )
}