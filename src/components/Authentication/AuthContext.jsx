import { createContext, useState } from "react";
import Swal from "sweetalert2";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const login = async (email, password) => {
        try {
            const response = await fetch("http://localhost:5655/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password }),
                credentials: "include"
            });

            const data = await response.json();

            if (!response.ok) {
                Swal.fire("Login Failed", data.message || "Invalid credentials", "error");
                return;
            }

            const { user, token } = data;

            setUser(user);
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("token", token); // Store token for future requests
            localStorage.setItem("isLoggedIn", "true");

            Swal.fire("Login Success", `Welcome ${user.name}`, "success");
        } catch (error) {
            console.error("Login error:", error); // 👈 Helps see what went wrong
            Swal.fire("Error", "Error connecting to the server. Please try again later.", "error");
        }
    };

    const logout = () => {
        Swal.fire("Logout", "Logout successful", "success");
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("isLoggedIn");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
