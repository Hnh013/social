import { createContext, useState, useEffect } from "react";
import jwt_decode from 'jwt-decode';

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {

    const hostname = 'https://sadeqmousawi.ir';

    const [questions, setQuestions] = useState([]);

    const [rememeberMe, setRememberMe] = useState(false);

    const [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null);

    const [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);

    const [loading, setLoading] = useState(true);

    const loginUser = async (requestData) => {
        let response = await fetch(`${hostname}/api/login/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'email': requestData?.email, 'password': requestData?.password })
        });

        let data;

        switch (response.status) {
            case 200:
                data = await response.json();
                setAuthTokens(data);
                setUser(jwt_decode(data.access))
                if (rememeberMe) {
                    localStorage.setItem('authTokens', JSON.stringify(data));
                }
                return { status: response.status, message: 'success' };
            case 404:
            case 400:
                data = await response.json();
                return { status: response.status, message: data[0] };
            case 500:
                return { status: response.status, message: 'API Error! No response from server' };
            default:
                return { status: response.status, message: 'Sorry, an unknown error has occured' };
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

        let data;

        switch (response.status) {
            case 201:
                data = await response.json();
                setAuthTokens(data);
                setUser(jwt_decode(data.access))
                if (rememeberMe) {
                    localStorage.setItem('authTokens', JSON.stringify(data));
                }
                return { status: response.status, message: 'success' };
            case 500:
                return { status: response.status, message: 'API Error! No response from server' };
            default:
                return { status: response.status, message: 'Sorry, an unknown error has occured' };
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

    const updateUser = async (requestData) => {
        const requestBody = new FormData();
        for (let key in requestData) {
            requestBody.append(key, requestData[key]);
        }

        let myHeaders = new Headers();
        myHeaders.append('Authorization', `Bearer ${authTokens.access}`)

        let response = await fetch(`${hostname}/api/profiles/${requestData.id}/edit/`, {
            method: 'PATCH',
            headers: myHeaders,
            body: requestBody
        });

        let res = await response.json();
        
        if (response.status !== 200) {
            return { status: response.status, message: 'failed', data: null };
        } else {
            return { status: response.status, message: res.message, data: res.data };
        }
    }

    const fetchUser = async () => {
        let response = await fetch(`${hostname}/api/profiles/${user.user_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        let data = await response.json();

        if (response.status !== 200) {
            return { status: response.status, message: 'failed', data: null };
        } else {
            return { status: response.status, message: 'success', data: data };
        }
    }


    const contextData = {
        loginUser: loginUser,
        logoutUser: logoutUser,
        registerUser: registerUser,
        setRememberMe: setRememberMe,
        updateUser: updateUser,
        fetchUser: fetchUser,
        questions: questions,
        rememeberMe: rememeberMe,
        user: user
    }

    useEffect(() => {
        if (!(questions && questions.length)) {
            fetchSecurityQuestions();
        }

        let i = setInterval(() => {
            if (authTokens && localStorage.getItem('authTokens')) {
                updateToken();
            }
        }, 24000)
        return () => clearInterval(i);
    }, [authTokens, loading])

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}