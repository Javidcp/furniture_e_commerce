import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
function ProductList({ categoryName, numProducts = 4 }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
        try {
            const response = await axios.get(`http://localhost:5659/products?category=${categoryName}`);
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

    if (loading) return <div>Loading products...</div>
    if (error) return <div>Error: {error.message}</div>
    if (products.length === 0) return <div>No {categoryName} products found.</div>
    

    return (
        <section className='max-w-7xl mx-2 md:mx-10 px-4 my-10' id='popular-product'>
            <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <Link to={`/category/${product.category}/product/${product.id}`} key={product.id} className="bg-gray-100 overflow-hidden  relative flex flex-col ">
                        <span className='absolute m-2 px-2 py-0.5 bg-[#2d9596]  text-white text-sm rounded-full'>-{product.off}%</span>
                        <img src={product.image} alt={product.name} className="w-full h-70 object-cover p-10" />
                        <div className=' bg-white p-2 px-3 text-center '>
                                <h6 className='text-sm'>{product.shortname}</h6>
                                <small className=''>₹{product.price.toLocaleString("en-IN")}</small>
                        </div>
                        
                    </Link>
                ))}
            </div>
        </section>

    );
}

const PopularProduct = () => {
    return (
        <section className="mx-15 my-10">
            <h2 className='text-center text-2xl md:text-4xl font-bold my-8'>Popular Product</h2>
            <div className="products-container">
                <ProductList categoryName="bed" />
                <ProductList categoryName="sofa" />
            </div>
        </section>
    )
}

export default PopularProduct