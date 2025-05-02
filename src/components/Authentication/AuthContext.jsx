import { createContext, useState } from "react";
import Swal from "sweetalert2";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const [token, setToken] = useState(() => localStorage.getItem("token") || null);

    const isLoggedIn = !!user && !!token;

    const login = async (email, password) => {
        try {
            const response = await fetch("http://localhost:5655/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                Swal.fire("Login Failed", data.message || "Invalid credentials", "error");
                return;
            }

            const { user, token } = data;

            setUser(user);
            setToken(token);
            
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("token", token);
            localStorage.setItem("isLoggedIn", "true");

            Swal.fire("Login Success", `Welcome ${user.name}`, "success");
        } catch (error) {
            console.error("Login error:", error);
            Swal.fire("Error", "Error connecting to the server. Please try again later.", "error");
        }
    };

    const logout = () => {
        Swal.fire("Logout", "Logout successful", "success");
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
            Authorization: `Bearer ${token}`
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