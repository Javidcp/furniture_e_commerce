import axios from "axios";
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

const UserDetails = () => {

    const { id } = useParams();
    const [ user, setUser ] = useState(null);

    useEffect(() => {
        axios
            .get(`http://localhost:5659/users/${id}`)
            .then((response) => setUser(response.data))
            .catch((error) => console.log("Error Fetching User Details",error))
    }, [id])

    if (!user) return <div>Loading...</div>

    return (
        <div className="ml-60 flex-1">
            <h2 className="text-2xl font-medium bg-gray-600 p-2 rounded mb-5">User Details</h2>
            <p>Name : {user.name}</p>
        </div>
    )
}

export default UserDetails