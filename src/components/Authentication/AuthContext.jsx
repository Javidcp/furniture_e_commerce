import { createContext, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from "./api";


export const AuthContext = createContext({
    user: null,
    token: null,
    isLoggedIn: false,
    login: () => {},
    logout: () => {},
    fetchWithAuth: () => {}
});


// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const [token, setToken] = useState(() => localStorage.getItem("token") || null);

    const isLoggedIn = !!user && !!token;

    const login = async (email, password) => {
        try {
            const response = await api.post("/api/auth/login", { email, password })

            const { user, token } = response.data;
            console.log("authhhh", token);
            

            setUser(user);
            setToken(token);
            
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("token", token);
            localStorage.setItem("isLoggedIn", "true");

            api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

            toast.success(`Login Success, Welcome ${user.name}`);
        } catch (error) {
            console.error("Login error:", error);
            toast.error( "Please try again later.");
        }
    };

    const logout = () => {
        toast.success( "Logout successful");
        setUser(null);
        setToken(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("isLoggedIn");
    };

    const fetchWithAuth = async (url, options = {}) => {
        const headers = {
            "Content-Type": "application/json",
            ...(options.headers || {}),
            Authorization: `Bearer ${token || ''}`
        };
    
        const config = {
            ...options,
            headers
        };
    
        const response = await fetch(url, config);
        return response.json();
    };
    

    return (
        <AuthContext.Provider value={{ user, token, isLoggedIn, login, logout, fetchWithAuth }}>
            {children}
        </AuthContext.Provider>
    );
};