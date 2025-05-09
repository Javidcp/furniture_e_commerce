import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { FaArrowRight } from "react-icons/fa6";
import { MdOutlineModeEdit } from "react-icons/md";



const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5655/products/${id}`);
                setProduct(response.data);
            } catch (err) {
                setError("Product not found");
                console.log("Error Fetching", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProductDetails();
    }, [id]);

    if (loading) return <p className="text-xl">Loading product details...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="p-6 max-w-7xl mx-auto bg-white mt-10">
            <h3 className="text-xl font-bold mb-6 rounded bg-gray-200 p-2">Product Detail Page</h3>
            <div className="flex justify-end">
                <Link to={`/dashboard/products/edit/${product._id}`} className="flex py-2 px-5 bg-green-500 w-fit text-white mb-3 rounded cursor-pointer">Edit <MdOutlineModeEdit className="mt-1 ml-1.5" /></Link>
            </div>
            <div className="flex gap-3 mb-10">
                <div className="text-center">
                    <img src={product.image} alt={product.name} className="w-full h-fit object-cover rounded mb-4" />
                    <h4>Main Image</h4>
                </div>
                <div className="text-center">
                    <img src={product.image1} alt={product.name} className="w-full h-fit object-cover rounded mb-4" />
                    <h4>Image-2</h4>
                </div>
                <div className="text-center">
                    <img src={product.image2} alt={product.name} className="w-full h-fit object-cover rounded mb-4" />
                    <h4>Image-3</h4>
                </div>
                <div className="text-center">
                    <img src={product.image3} alt={product.name} className="w-full h-fit object-cover rounded mb-4" />
                    <h4>Image-4</h4>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="max-w-2xl w-full">
                    <p className="text-gray-600 mb-2 relative border-b p-2 border-gray-400">
                        <strong>Name:</strong> 
                        <span className="absolute right-0">{product.shortname}</span>
                    </p>
                    <p className="text-gray-600 mb-2 relative border-b p-2 border-gray-400">
                        <strong>Description:</strong> 
                        <span className="absolute right-0">{product.name}</span>
                    </p>
                    <p className="text-gray-600 mb-2 relative border-b p-2 border-gray-400">
                        <strong>Brand:</strong>
                        <span className="absolute right-0">{product.brand}</span>
                        </p>
                    <p className="text-gray-600 mb-2 relative border-b p-2 border-gray-400">
                        <strong>Category:</strong> 
                        <span className="absolute right-0">{product.category}</span>
                    </p>
                    <p className="text-gray-600 mb-2 relative border-b p-2 border-gray-400">
                        <strong>Price:</strong> 
                        <span className="absolute right-0">₹ {product.price.toLocaleString("en-IN")}</span>
                    </p>
                    <p className="text-gray-600 mb-2 relative border-b p-2 border-gray-400">
                        <strong>Old Price:</strong> 
                        <span className="absolute right-0">{product.oldprice}</span>
                    </p>
                    <p className="text-gray-600 mb-2 relative border-b p-2 border-gray-400">
                        <strong>Materail:</strong> 
                        <span className="absolute right-0">{product.materail}</span>
                    </p>
                    <p className="text-gray-600 mb-2 relative border-b p-2 border-gray-400">
                        <strong>Collection:</strong> 
                        <span className="absolute right-0">{product.collections}</span>
                    </p>
                    <p className="text-gray-600 mb-2 relative border-b p-2 border-gray-400">
                        <strong>Dimension in cm:</strong> 
                        <span className="absolute right-0">{product.dimensionscm}</span>
                    </p>
                    <p className="text-gray-600 mb-2 relative border-b p-2 border-gray-400">
                        <strong>Dimensions in Inch:</strong> 
                        <span className="absolute right-0">{product.dimensionsinch}</span>
                    </p>
                    <p className="text-gray-600 mb-2 relative border-b p-2 border-gray-400">
                        <strong>Type:</strong> 
                        <span className="absolute right-0">{product.type}</span>
                    </p>
                    <p className="text-gray-600 mb-2 relative border-b p-2 border-gray-400">
                        <strong>Height:</strong> 
                        <span className="absolute right-0">{product.seatingheight}</span>
                    </p>
                    <p className="text-gray-600 mb-2 relative border-b p-2 border-gray-400">
                        <strong>Weight:</strong> 
                        <span className="absolute right-0">{product.weight}</span>
                    </p>
                    <p className="text-gray-600 mb-2 relative border-b p-2 border-gray-400">
                        <strong>Discount:</strong> 
                        <span className="absolute right-0">{product.off}</span>
                    </p>
                    <p className="text-gray-600 mb-2 relative border-b p-2 border-gray-400">
                        <strong>Reviews:</strong> 
                        <span className="absolute right-0">{product.rating}</span>
                    </p>
                    <p className="text-gray-600 mb-2 relative border-b p-2 border-gray-400">
                        <strong>Rating:</strong> 
                        <span className="absolute right-0">{product.ratingstar}</span>
                    </p>
                </div>
            </div>
            
            <div className="flex justify-end">
                <Link to="/dashboard/products" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded flex">Back to Products <FaArrowRight className="mt-1.5 ml-2" size={15} /></Link>
            </div>
        </div>
    );
};

export default ProductDetails;
