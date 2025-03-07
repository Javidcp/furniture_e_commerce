import axios from "axios"
import { useEffect, useState } from "react"
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { Link } from "react-router-dom";

const Products = () => {
    const [products, setProducts] = useState([])
    const [filteredProduct, setFilteredProduct] = useState([])
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState("All Category")

    const fetchProduct = async () => {
        try {
            const response = await axios.get(`http://localhost:5659/products`)
            setProducts(response.data)
            setFilteredProduct(response.data)
            extractCategory(response.data)
        }
        catch (err) {
            console.log("Error Fetching Products : ",err);
        }
    }

    const extractCategory = (products) => {
        const uniqueCategories = ["All Category", ... new Set(products.map((p) => p.category))]
        setCategories(uniqueCategories)
    }

    useEffect(() => {
        fetchProduct()
    }, [])

    const handleCategory = (event) => {
        const category = event.target.value;
        setSelectedCategory(category)

        if (category ===  "All Category") {
            setFilteredProduct(products)
        } else {
            setFilteredProduct(products.filter((p) => p.category === category))
        }
    }

    // delete product
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure about deleting this product")) {
            try {
                await axios.delete(`http://localhost:5659/products/${id}`)
                setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id))
            } catch (error) {
                console.log("Error deleting product", error);
                
            }
        }
    }

    return (
        <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4 rounded bg-gray-200 p-2">Product List</h2>
            
            <div className="flex justify-between">
                <div className="mb-4">
                    <label className="mr-2">Filter by Category:</label>
                    <select 
                        className="p-2 bg-gray-200  border border-gray-200 rounded outline-0" 
                        value={selectedCategory} 
                        onChange={handleCategory}
                    >
                        {categories.map((category) => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                </div>
                <div className="mt-3">
                    <Link to={`/dashboard/products/add`} className="py-2 px-8 bg-black text-white">
                        Add
                    </Link>
                </div>
            </div>

            <table className="border w-full border-gray-200">
                <thead>
                    <tr className="border-b border-gray-300 bg-gray-200">
                        <th className="p-1.5 pr-5">ID Code</th>
                        <th className="p-1.5 pr-5 text-left">Product Name</th>
                        <th className="p-1.5 pr-5">Category</th>
                        <th className="p-1.5 pr-5 text-left">Price</th>
                        <th className="p-1.5 pr-5">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProduct.map((product) => (
                        <tr key={product.id} className=" border-b border-gray-200">
                            <td className="p-1.5 text-center border-r border-gray-200">#{product.id}</td>
                            <td className="p-1.5 flex">
                                <img src={product.image} alt="" className="w-12" /> 
                                    <div className="block pl-5">
                                        <div className="block">{product.name}</div>
                                        <div className="block text-sm text-gray-400">{product.brand}</div>
                                    </div>
                            </td>
                            <td className="p-1.5 text-center">{product.category}</td>
                            <td className="p-1.5 ">₹ {product.price}</td>
                            <td className="p-1.5 text-center ">
                                <div className="flex items-center justify-center space-x-3">
                                    <Link to={`/dashboard/products/${product.id}`} className="text-blue-400 cursor-pointer">
                                                <FaRegEye size={18} />
                                    </Link>
                                    <button onClick={() => handleDelete(product.id)} className="text-red-600">
                                        <MdDeleteOutline size={18} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Products