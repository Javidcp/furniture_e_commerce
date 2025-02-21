import { useState, useEffect } from 'react';
import axios from 'axios';
import { IoCartOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';

function ProductList({ categoryName, numProducts = 4 }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
        try {
            const response = await axios.get(`http://localhost:5050/products?category=${categoryName}`); // Fetch all products
            setProducts(response.data.slice(0, numProducts));
        } catch (err) {
            setError(err);
            console.error("Error fetching products:", err);
        } finally {
            setLoading(false);
        }
        };

        fetchProducts();
    }, [categoryName, numProducts]);

    if (loading) return <div>Loading products...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (products.length === 0) return <div>No {categoryName} products found.</div>;
    

    return (
        <section className='max-w-7xl mx-2 md:mx-20 px-4 my-10' id='popular-product'>
            <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <Link to={`/category/${product.category}/product/${product.id}`} key={product.id} className="bg-white shadow-md rounded-md overflow-hidden transform transition duration-300 hover:scale-105 relative flex flex-col">
                        <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                        
                        <div className="p-4">
                            <h5 className="text-lg font-semibold text-black truncate">{product.name}</h5>
                            <div className="flex items-center relative">
                                <p className="text-black mt-2">₹ {product.price.toLocaleString("en-IN")}</p>
                                <p className="text-gray-500 mt-3.5 ml-2 line-through text-xs">₹ {product.oldprice.toLocaleString("en-IN")}</p>
                                <p className='absolute right-0.5 bottom-0 text-xs text-green-800 font-medium'>{product.off  }% off</p>
                            </div>
                        </div>

                        <button className="absolute top-1.5 right-2 px-2 py-2 rounded-full bg-gray-100 opacity-85">
                            <IoCartOutline className="text-black transition duration-300 text-xl" />
                        </button>
                    </Link>
                ))}
            </div>
        </section>

    );
}

const PopularProduct = () => {
    return (
        <section className="mx-20 my-10">
            <h2 className='text-center text-2xl md:text-4xl font-bold my-8'>Popular Product</h2>
            <div className="products-container">
                <ProductList categoryName="bed" />
                <ProductList categoryName="sofa" />
                {/* Add more categories as needed */}
            </div>
        </section>
    )
}

export default PopularProduct