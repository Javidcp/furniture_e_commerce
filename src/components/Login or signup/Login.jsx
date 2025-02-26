import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import axios from 'axios';
import { AuthContext } from '../Authentication/AuthContext';

const API_USER = "http://localhost:5659/users";

const Login = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [action, setAction] = useState("Login");

    const { user, login } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            console.log("✅ User logged in:", user);
            user.role === "admin" ? navigate("/dashboard") : navigate("/");
        }
    }, [user, navigate]); // ⏳ Runs when `user` updates

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePassword = (password) => /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&.,#^()-+=])[A-Za-z\d@$!%*?&.,#^()-+=]{8,}$/.test(password);

    // Register New User
    const addUser = async (e) => {
        e.preventDefault();
        setError("");

        if (!name || !email || !password) {
            setError("All fields are required!");
            return;
        }

        if (!validateEmail(email)) {
            setError("Invalid Email format!");
            return;
        }

        if (!validatePassword(password)) {
            setError("Password must be at least 8 characters, contain an uppercase letter, a number, and a special character.");
            return;
        }

        try {
            const res = await axios.get(`${API_USER}?email=${email}`);
            if (res.data.length > 0) {
                setError("User with this email already exists!");
                return;
            }

            const newUser = {
                name,
                email,
                password,
                createdAt: new Date(),
                role: "user",
                cart: [],
                purchaseHistory: []
            };

            await axios.post(API_USER, newUser);

            setName("");
            setEmail("");
            setPassword("");
            setError("");
            alert("Signup successful! Please log in.");
            setAction("Login");
        } catch (err) {
            console.log("❌ Error registering user:", err.message);
            setError("Error registering user.");
        }
    };

    // Login User
    const checkLogin = async (e) => {
        e.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Email and password are required!");
            return;
        }

        try {
            console.log("🚀 Sending login request...");
            await login(email, password); // ✅ Waits for login to complete
        } catch (err) {
            console.log("❌ Error during login:", err.message);
            setError("Error logging in.");
        }
    };

    return (
        <form className="w-full h-full bg-red-500 p-10" onSubmit={action === "Sign Up" ? addUser : checkLogin}>
            <div className="flex flex-col m-auto pb-[30px] mt-[50px] md:mt-[100px] max-w-[600px] bg-white">
                <div className="flex flex-col items-center gap-3 w-[100%] mt-[20px]">
                    <div className="text-red-500 text-3xl font-semibold">{action}</div>
                    <div className="underline w-14 bg-red-500 h-1 rounded"></div>
                </div>
                {error && <p className="text-red-500 text-center text-sm mt-2">{error}</p>}
                
                <div className="mt-[55px] flex flex-col gap-2">
                    {action === "Sign Up" && (
                        <div className="flex items-center m-auto w-[350px] md:w-[480px] h-[60px] bg-gray-100 rounded">
                            <FaUser className='mx-[30px] text-gray-500' />
                            <input type="text" placeholder='Name' className='h-[50px] max-w-[400px] outline-0 text-md'
                                value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                    )}
                    <div className="flex items-center m-auto w-[350px] md:w-[480px] h-[60px] bg-gray-100 rounded">
                        <MdEmail className='mx-[30px] text-gray-500' />
                        <input type="email" placeholder='Email Id' className='h-[50px] max-w-[400px] outline-0 text-md'
                            value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="flex items-center m-auto w-[350px] md:w-[480px] h-[60px] bg-gray-100 rounded">
                        <FaLock className='mx-[30px] text-gray-500' />
                        <input type="password" placeholder='Password' className='h-[50px] max-w-[400px] outline-0 text-md'
                            value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                </div>

                <div className="flex gap-5.5 justify-center my-4">
                    <button type="submit" className="w-[100px] md:w-[180px] h-[40px] bg-red-500 text-white rounded-4xl">
                        {action}
                    </button>
                    <button type="button"
                        onClick={() => {
                            setAction(action === "Login" ? "Sign Up" : "Login");
                            setError("");
                        }} 
                        className="w-[100px] md:w-[180px] h-[40px] bg-gray-200 text-red-500 rounded-4xl">
                        {action === "Login" ? "Sign Up" : "Login"}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default Login;
