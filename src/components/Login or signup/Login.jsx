import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import axios from 'axios';
import { AuthContext } from '../Authentication/AuthContext';
import Swal from 'sweetalert2';

const API_BASE = "http://localhost:5655/api";

const Login = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [action, setAction] = useState("Login");
    const [loading, setLoading] = useState(false);

    const { user, login } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            user.role === "admin" ? navigate("/dashboard") : navigate("/");
        }
    }, [user, navigate]);

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePassword = (password) => /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&.,#^()-+=])[A-Za-z\d@$!%*?&.,#^()-+=]{8,}$/.test(password);

    const addUser = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        if (!name || !email || !password) {
            setError("All fields are required!");
            setLoading(false);
            return;
        }

        if (!validateEmail(email)) {
            setError("Invalid Email format!");
            setLoading(false);
            return;
        }

        if (!validatePassword(password)) {
            setError("Password must be at least 8 characters, contain an uppercase letter, a number, and a special character.");
            setLoading(false);
            return;
        }

        try {
            await axios.post(`${API_BASE}/register`, { name, email, password });

            setName("");
            setEmail("");
            setPassword("");
            setError("");
            Swal.fire({
                title: "Success",
                text: "Sign up successful, please login!",
                icon: "success"
            });
            setAction("Login");
        } catch (err) {
            if (err.response && err.response.data?.message) {
                setError(err.response.data.message);
            } else {
                console.log("Error registering user:", err.message);
                setError("Error registering user.");
            }
        }
        setLoading(false);
    };

    const checkLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        if (!email || !password) {
            setError("Email and password are required!");
            setLoading(false);
            return;
        }

        try {
            const res = await axios.post(`${API_BASE}/login`, { email, password });
            const { user, token } = res.data;
            login(user, token);
            console.log(email, password)
        } catch (err) {
            if (err.response && err.response.data?.message) {
                setError(err.response.data.message, 'vddd');
            } else {
                console.log("Error during login:", err.message);
                setError("Error logging in.");
            }
        }
        setLoading(false);
    };

    return (
        <div className='w-full h-screen bg-red-500'>
            <form className="p-10" onSubmit={action === "Sign Up" ? addUser : checkLogin}>
                <div className="flex flex-col mx-auto pb-[30px] mt-5 md:mt-20 max-w-[600px] bg-white">
                    <div className="flex flex-col items-center gap-3 w-[100%] mt-[20px]">
                        <div className="text-red-500 text-3xl font-semibold">{action}</div>
                        <div className="underline w-14 bg-red-500 h-1 rounded"></div>
                    </div>
                    {error && <p className="text-red-500 text-center text-sm mt-2">{error}</p>}

                    <div className="mt-[55px] flex flex-col gap-2 overflow-hidden">
                        {action === "Sign Up" && (
                            <div className="flex items-center m-auto w-[350px] md:w-[480px] h-[60px] bg-gray-100 rounded">
                                <FaUser className='mx-[30px] text-gray-500' />
                                <input type="text" placeholder='Name' className='h-[50px] max-w-[400px] outline-0 text-md'
                                    value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                        )}
                        <div className="flex items-center m-auto w-[340px] md:w-[480px] h-[60px] bg-gray-100 rounded">
                            <MdEmail className='mx-[30px] text-gray-500' />
                            <input type="email" placeholder='Email Id' className='h-[50px] max-w-[400px] outline-0 text-md'
                                value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="flex items-center m-auto w-[340px] md:w-[480px] h-[60px] bg-gray-100 rounded">
                            <FaLock className='mx-[30px] text-gray-500' />
                            <input type="password" placeholder='Password' className='h-[50px] max-w-[400px] outline-0 text-md'
                                value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </div>

                    <div className="flex gap-5.5 justify-center my-4">
                        <button type="submit" className="w-[100px] md:w-[180px] h-[40px] bg-red-500 text-white rounded-4xl" disabled={loading}>
                            {loading ? "Loading..." : action}
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
        </div>
    );
};

export default Login;
