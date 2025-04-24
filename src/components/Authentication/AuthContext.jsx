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
            // Fetch only the user with the matching email
            const response = await fetch(`http://localhost:5659/users?email=${email}`);
            const users = await response.json();
            

            if (users.length === 0) {
                Swal.fire({
                    title: "Error",
                    text: "Invalid Email or Password",
                    icon: "error"
                });
                return;
            }

            const foundUser = users[0]; // get the first user that matches

            // Check if password matches
            if (foundUser.password !== password) {
                Swal.fire({
                    title: "Error",
                    text: "Invalid Email or Password",
                    icon: "error"
                });
                return;
            }

            

            const userData = {
                id: foundUser.id,
                email: foundUser.email,
                name: foundUser.name,
                role: foundUser.role || "user",
                blocked: foundUser.blocked || false,
                cart: foundUser.cart || [],
                purchaseHistory: foundUser.purchaseHistory || [],
            };

            setUser(userData);
            localStorage.setItem("user", JSON.stringify(userData));
            localStorage.setItem("isLoggedIn", "true");

        // eslint-disable-next-line no-unused-vars
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Error connecting to the server. Please try again later.",
                icon: "error"
            });
        }
    };

    const logout = () => {
        Swal.fire("Logout","Logout successfull","success")
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("isLoggedIn");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
