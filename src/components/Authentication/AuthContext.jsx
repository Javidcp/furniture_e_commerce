import { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const login = async (email, password) => {
        console.log("🔍 Attempting login with:", email, password);

        try {
            // ✅ Fetch only the user with the matching email
            const response = await fetch(`http://localhost:5659/users?email=${email}`);
            const users = await response.json();
            console.log("📝 Fetched users:", users);

            if (users.length === 0) {
                console.log("❌ User not found");
                alert("Invalid email or password!");
                return;
            }

            const foundUser = users[0]; // Get the first user that matches

            // ✅ Check if password matches
            if (foundUser.password !== password) {
                console.log("❌ Incorrect password for:", foundUser.email);
                alert("Invalid email or password!");
                return;
            }

            console.log("✅ User authenticated:", foundUser);

            const userData = {
                id: foundUser.id,
                email: foundUser.email,
                name: foundUser.name,
                role: foundUser.role || "user",
                cart: foundUser.cart || [],
                purchaseHistory: foundUser.purchaseHistory || [],
            };

            setUser(userData);
            localStorage.setItem("user", JSON.stringify(userData));
            localStorage.setItem("isLoggedIn", "true");

        } catch (error) {
            console.error("❌ Error fetching user:", error);
            alert("Error connecting to the server. Please try again later.");
        }
    };

    const logout = () => {
        console.log("🔴 Logging out user:", user?.email);
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
