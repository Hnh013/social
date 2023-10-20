import { createContext, useState, useEffect } from "react";
import jwt_decode from 'jwt-decode';
 
const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({children}) => {

    const hostname = 'https://sadeqmousawi.ir';

    const [questions,setQuestions] = useState([]);

    const [rememeberMe,setRememberMe] = useState(false);

    const [user,setUser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null);

    const [authTokens,setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);

    const [loading,setLoading]  = useState(true);

    const loginUser = async (requestData) => {
        let response = await fetch(`${hostname}/api/login/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'email': requestData?.email, 'password': requestData?.password })
        });

        let data = await response.json();

        if (response.status !== 200) {
            return { status: response.status , message: data[0] };
        } else {
            setAuthTokens(data);
            setUser(jwt_decode(data.access))
            if (rememeberMe) {    
                localStorage.setItem('authTokens', JSON.stringify(data));
            }
            return { status: response.status, message: 'success' };
        }
    }

    const logoutUser = async () => {
        let response = await fetch(`${hostname}/api/token/blacklist/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'refresh': authTokens.refresh })
        });

        if (response.status === 200) {
            setAuthTokens(null);
            setUser(null);
            localStorage.removeItem('authTokens')
            return { message: 'success' };
        } else {
            setAuthTokens(null);
            setUser(null);
            localStorage.removeItem('authTokens')
            alert('Oops an error has occured! Please refresh this page and login again')
            return { message: 'failed' };
        }
    }

    const updateToken = async () => {
        let response = await fetch(`${hostname}/api/token/refresh/`, {
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
        let response = await fetch(`${hostname}/api/register/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });

        let data = await response.json();

        if (response.status !== 201) {
            return { status: response.status, message: 'failed' };
        } else {
            setAuthTokens(data);
            setUser(jwt_decode(data.access))
            if (rememeberMe) {
                localStorage.setItem('authTokens', JSON.stringify(data));
            }
            return { status: response.status, message: 'success' };
        }
    }

    const fetchSecurityQuestions = async () => {
        let response = await fetch(`${hostname}/api/security_questions`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        let data = await response.json();

        if (response.status === 200) {
            setQuestions([...data.questions])
        }
    }

    const contextData = {
        loginUser: loginUser,
        logoutUser: logoutUser,
        registerUser: registerUser,
        setRememberMe: setRememberMe,
        questions: questions,
        rememeberMe: rememeberMe,
        user: user
    }

    useEffect( () => {
        if (!(questions && questions.length)) {
            fetchSecurityQuestions();
        }

        let i = setInterval( () => {
            if (authTokens && localStorage.getItem('authTokens')) {
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