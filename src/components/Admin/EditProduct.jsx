import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();

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

    
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:5655/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.log("Error fetching product:", error);
            }
        };
        fetchProduct();
    }, [id]);

    
    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5655/products/${id}`, product);
            Swal.fire({
                title: "Updated",
                text: "Your product has been updated",
                icon: "success"
            });
            navigate(`/dashboard/products/${id}`);
        } catch (error) {
            console.log("Error updating product:", error);
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
            <h2 className="text-2xl font-bold mb-6">Edit Product</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-600">Name:</label>
                    <input type="text" name="name" value={product.shortname} onChange={handleChange} className="w-full border rounded p-2"/>
                </div>
                <div>
                    <label className="block text-gray-600">Description:</label>
                    <input type="text" name="name" value={product.name} onChange={handleChange} className="w-full border rounded p-2"/>
                </div>
                <div>
                    <label className="block text-gray-600">Brand:</label>
                    <input type="text" name="brand" value={product.brand} onChange={handleChange} className="w-full border rounded p-2"/>
                </div>
                <div>
                    <label className="block text-gray-600">Category:</label>
                    <input type="text" name="category" value={product.category} onChange={handleChange} className="w-full border rounded p-2"/>
                </div>
                <div className="flex">
                    <div className="w-full mr-1">
                        <label className="block text-gray-600">Price:</label>
                        <input type="number" name="price" value={product.price} onChange={handleChange} className="w-full border rounded p-2"/>
                    </div>
                    <div className="w-full ml-1">
                        <label className="block text-gray-600">Old Price:</label>
                        <input type="number" name="oldprice" value={product.oldprice} onChange={handleChange} className="w-full border rounded p-2"/>
                    </div>
                </div>
                <div>
                    <label className="block text-gray-600">Materails:</label>
                    <input type="text" name="materail" value={product.materail} onChange={handleChange} className="w-full border rounded p-2"/>
                </div>
                <div>
                    <label className="block text-gray-600">Collections:</label>
                    <input type="text" name="collections" value={product.collections} onChange={handleChange} className="w-full border rounded p-2"/>
                </div>
                <div className="flex">
                    <div className="w-full mr-1">
                        <label className="block text-gray-600">Dimension in CM:</label>
                        <input type="text" name="dimensionscm" value={product.dimensionscm} onChange={handleChange} className="w-full border rounded p-2"/>
                    </div>
                    <div className="w-full ml-1">
                        <label className="block text-gray-600">Dimension in Inch:</label>
                        <input type="text" name="dimensionsinch" value={product.dimensionsinch} onChange={handleChange} className="w-full border rounded p-2"/>
                    </div>
                </div>
                <div>
                    <label className="block text-gray-600">Type:</label>
                    <input type="text" name="type" value={product.type} onChange={handleChange} className="w-full border rounded p-2"/>
                </div>
                <div>
                    <label className="block text-gray-600">Seating Height:</label>
                    <input type="text" name="seatingheight" value={product.seatingheight} onChange={handleChange} className="w-full border rounded p-2"/>
                </div>
                <div>
                    <label className="block text-gray-600">Weight:</label>
                    <input type="number" name="weight" value={product.weight} onChange={handleChange} className="w-full border rounded p-2"/>
                </div>
                <div>
                    <label className="block text-gray-600">Discount:</label>
                    <input type="number" name="discount" value={product.off} onChange={handleChange} className="w-full border rounded p-2"/>
                </div>
                <div className="flex">
                    <div className="w-full mr-1">
                        <label className="block text-gray-600">Reviews:</label>
                        <input type="number" name="rating" value={product.rating.toLocaleString("en-IN")} onChange={handleChange} className="w-full border rounded p-2"/>
                    </div>
                    <div className="w-full ml-1">
                        <label className="block text-gray-600">Rating:</label>
                        <input type="text" name="ratingstar" value={product.ratingstar} onChange={handleChange} className="w-full border rounded p-2"/>
                    </div>
                </div>

                <div>
                    <label className="block text-gray-600">Main Image:</label>
                    <img src={product.image} className="w-30 p-2" alt="" />
                    <input type="text" name="image" value={product.image} onChange={handleChange} className="w-full border rounded p-2"/>
                </div>
                <div>
                    <label className="block text-gray-600">Image 1:</label>
                    <img src={product.image1} className="w-30 p-2" alt="" />
                    <input type="text" name="image" value={product.image1} onChange={handleChange} className="w-full border rounded p-2"/>
                </div>
                <div>
                    <label className="block text-gray-600">Imagev2:</label>
                    <img src={product.image2} className="w-30 p-2" alt="" />
                    <input type="text" name="image" value={product.image2} onChange={handleChange} className="w-full border rounded p-2"/>
                </div>
                <div>
                    <label className="block text-gray-600">Image 3:</label>
                    <img src={product.image3} className="w-30 p-2" alt="" />
                    <input type="text" name="image" value={product.image3} onChange={handleChange} className="w-full border rounded p-2"/>
                </div>
                
                
                <div className="flex justify-between">
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Update Product</button>
                    <button type="button" onClick={() => navigate(-1)} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default EditProduct;
