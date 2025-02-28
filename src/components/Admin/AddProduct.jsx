import { useNavigate } from "react-router-dom"
import { useState } from "react";
import axios from "axios";

const AddProduct = () => {

    const navigate = useNavigate()

    const [product, setProduct] = useState({
            name: "",
            brand: "",
            category: "",
            price: 0,
            oldprice: 0,
            materail: "",
            collections: "",
            dimensionscm: "",
            dimensionsinch: "",
            type: "",
            seatingheight: "",
            weight: 0,
            off: 0,
            rating: 0,
            ratingstar: "",
            image: "",
            image1: "",
            image2: "",
            image3: "",
        });

    const handleAdd = (e) => {
        const { name, value } = e.target;
        setProduct((prev) => ({
            ...prev,
            [name]: ["price", "oldprice", "weight", "rating", "off"].includes(name) ? Number(value) || 0 : value
        }))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        
        axios
            .post("http://localhost:5659/products",product)
            .then (() => {
                alert("Product Added Succesfull")
                navigate('/dashboard/products')
            })
            .catch ((err) => {
                console.log("Error Adding Product", err)
            })
        
    }

    return (
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
            <h2 className="text-2xl font-bold mb-6">Add Product</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-600">Name:</label>
                    <input type="text" name="name"value={product.name} onChange={handleAdd} placeholder="Product Name" className="w-full border rounded p-2" required />
                </div>
                <div>
                    <label className="block text-gray-600">Brand:</label>
                    <input type="text" name="brand" value={product.brand} onChange={handleAdd} placeholder="Brand Name" className="w-full border rounded p-2"/>
                </div>
                <div>
                    <label className="block text-gray-600">Category:</label>
                    <input type="text" name="category" value={product.category} onChange={handleAdd} placeholder="Category" className="w-full border rounded p-2" required />
                </div>
                <div className="flex">
                    <div className="w-full mr-1">
                        <label className="block text-gray-600">Price:</label>
                        <input type="number" name="price" value={product.price} onChange={handleAdd} placeholder="Our Price" className="w-full border rounded p-2" required />
                    </div>
                    <div className="w-full ml-1">
                        <label className="block text-gray-600">Old Price:</label>
                        <input type="number" name="oldprice" value={product.oldprice} onChange={handleAdd} placeholder="Market Price" className="w-full border rounded p-2"/>
                    </div>
                </div>
                <div>
                    <label className="block text-gray-600">Materails:</label>
                    <input type="text" name="materail" value={product.materail} onChange={handleAdd} placeholder="Materail" className="w-full border rounded p-2"/>
                </div>
                <div>
                    <label className="block text-gray-600">Collections:</label>
                    <input type="text" name="collections" value={product.collections} onChange={handleAdd} placeholder="Collection" className="w-full border rounded p-2"/>
                </div>
                <div className="flex">
                    <div className="w-full mr-1">
                        <label className="block text-gray-600">Dimension in CM:</label>
                        <input type="text" name="dimensionscm" value={product.dimensionscm} onChange={handleAdd} placeholder="Dimension in CM" className="w-full border rounded p-2"/>
                    </div>
                    <div className="w-full ml-1">
                        <label className="block text-gray-600">Dimension in Inch:</label>
                        <input type="text" name="dimensionsinch" value={product.dimensionsinch} onChange={handleAdd} placeholder="Dimension in Inch" className="w-full border rounded p-2"/>
                    </div>
                </div>
                <div>
                    <label className="block text-gray-600">Type:</label>
                    <input type="text" name="type" value={product.type} onChange={handleAdd} placeholder="Type" className="w-full border rounded p-2"/>
                </div>
                <div>
                    <label className="block text-gray-600">Seating Height:</label>
                    <input type="text" name="seatingheight" value={product.seatingheight} onChange={handleAdd} placeholder="Height" className="w-full border rounded p-2"/>
                </div>
                <div>
                    <label className="block text-gray-600">Weight:</label>
                    <input type="number" name="weight" value={product.weight} onChange={handleAdd} placeholder="Weight" className="w-full border rounded p-2"/>
                </div>
                <div>
                    <label className="block text-gray-600">Discount:</label>
                    <input type="number" name="discount" value={product.off} onChange={handleAdd} placeholder="Discount" className="w-full border rounded p-2"/>
                </div>
                {/* <div className="flex">
                    <div className="w-full mr-1">
                        <label className="block text-gray-600">Reviews:</label>
                        <input type="number" name="rating" value={product.rating.toLocaleString("en-IN")} onChange={handleAdd} placeholder="Review Count" className="w-full border rounded p-2"/>
                    </div>
                    <div className="w-full ml-1">
                        <label className="block text-gray-600">Rating:</label>
                        <input type="text" name="ratingstar" value={product.ratingstar} onChange={handleAdd} placeholder="Rating" className="w-full border rounded p-2"/>
                    </div>
                </div> */}
                
                {["image", "image1", "image2", "image3"].map((img, index) => (
                    <div key={index}>
                        <label className="block text-gray-600">Image {index}:</label>
                        <img src={product[img]} className="w-30 h-30 p-2" alt={`Product ${index + 1}`} />
                        <input type="text" name={img} value={product[img]} onChange={handleAdd} placeholder={`Image ${index + 1} URL`} className="w-full border rounded p-2"/>
                    </div>
                ))}
                
                
                <div className="flex justify-between">
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Product</button>
                    <button type="button" onClick={() => navigate(-1)} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default AddProduct