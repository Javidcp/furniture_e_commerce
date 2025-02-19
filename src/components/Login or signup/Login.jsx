import { useEffect, useState } from 'react';
import '../Login or signup/Login.css'
import { FaUser, FaLock   } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const API_USER = "http://localhost:5659/users";




const Login = () => {

    const [users, setUsers] = useState([])
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigation = useNavigate()

    useEffect(() => {
        axios
            .get(API_USER)
            .then((res) => setUsers(res.data))
            .catch((err) => console.log(err))
    },[])

    // POST User
    const addUser = () => {
        axios
            .post(API_USER, {name, email , password})
            .then((res) => {
                setUsers([...users, res.data])
                setName("")
                setEmail("")
                setPassword("")
            })
            .catch((err) => console.log(err.message))
    }


    // Check Login Details
    const checkLogin = () => {
        axios
            .get(API_USER)
            .then((res) => {
                const user = res.data.find((user) => user.email === email && user.password === password)
                if (user) {
                    alert("Login successful!")
                    navigation('/')
                } else {
                    alert("Invalid email or password. please try again")
                }
            })
            .catch((err) => console.log(err.message))
    }


    const [action, setAction] = useState("Login")

    return (
        <div className='container'>
            <div className="log-box flex flex-col m-auto pb-[30px] mt-[100px] max-w-[600px] bg-white">
                <div className="header flex flex-col items-center gap-3 w-[100%] mt-[20px]">
                    <div className="text text-red-500 text-3xl font-semibold">{action}</div>
                    <div className="underline w-14 bg-red-500 h-1 rounded"></div>
                </div>
                <div className="inputs mt-[55px] flex flex-col gap-2">
                    {
                        action === "Login" ? <div></div> : 
                        <div className="input flex items-center m-auto w-[480px] h-[60px] bg-gray-100 rounded">
                            <FaUser className='mx-[30px] text-gray-500'/>
                            <input type="text" placeholder='Name' className='h-[50px] w-[400px] outline-0 text-md' value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                    }
                    <div className="input flex items-center m-auto w-[480px] h-[60px] bg-gray-100 rounded">
                        <MdEmail className='mx-[30px] text-gray-500' />
                        <input type="email" placeholder='Email Id' className='h-[50px] w-[400px] outline-0 text-md' value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="input flex items-center m-auto w-[480px] h-[60px] bg-gray-100 rounded">
                        <FaLock className='mx-[30px] text-gray-500' />
                        <input type="password" placeholder='Password' className='h-[50px] w-[400px] outline-0 text-md' value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                </div>
                {
                    action === "Sign Up" ? <div></div> :
                    <div className="forgot-password pl-[62px] mt-2 text-gray-500 text-xs">Lost password? <span className='text-red-500 cursor-pointer'>Click here</span></div>
                }
                <div className="submit-container flex gap-5.5 justify-center my-4">
                    <div onClick={() => { setAction("Sign Up"); addUser(); }} className={action === "Login" ? "flex justify-center items-center w-[180px] h-[40px] bg-gray-200 cursor-pointer rounded-4xl text-red-500" : "flex justify-center items-center w-[180px] h-[40px] bg-red-500 cursor-pointer rounded-4xl text-white"}>Sign Up</div>
                    <div onClick={() => { setAction("Login"); checkLogin(); }} className={action === "Sign Up" ? "flex justify-center items-center w-[180px] h-[40px] bg-gray-200 cursor-pointer rounded-4xl text-red-500" : "flex justify-center items-center w-[180px] h-[40px] bg-red-500 cursor-pointer rounded-4xl text-white"}>Login</div> 
                </div>
            </div>
        </div>
    )
}

export default Login