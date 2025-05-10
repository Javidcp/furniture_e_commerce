import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";
import { IoCartOutline } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import van from '../assets/van.svg'
import warranty from '../assets/warranty.svg'
import installation from '../assets/installation.svg'
import { CartContext } from "./cart/CartContext";
import { useWishlist } from "./wishlist/wishlistContext";
import { GoHeart, GoHeartFill  } from "react-icons/go";

function ProductDetail() {
    const { id } = useParams(); 
    const navigate = useNavigate()
    const { addToCart } = useContext(CartContext);
    
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [openIndex, setOpenIndex] = useState(null);

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };
    
    const items = [
        { title: "How is the foam density? Is it hard/soft to sit on?", content: `The foam density is perfect for sitting. The ${product.category} is neither too hard nor too soft.` },
        { title: "Is assembling or carpentry work required after delivery?", content: `These ${product.category} will come completely assembled. Only the legs are DIY.` },
        { title: "Are all the cushions removable?", content: `No, the cushions of this ${product.category} aren’t removable` },
        { title: "Does it heat up the body if we sit for a long duration?", content: `No, the ${product.category} does not heat up even if you lounge all day long!` },
    ];



    const API = `http://localhost:5655`; 

    const fetchProducts = useCallback(async () => {
        try {
            const response = await axios.get(`${API}/products/${id}`)
            setProduct(response.data)
            return response.data.category;
        } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch product details")
            
        } finally {
            setLoading(false)
        }
    }, [id])


    

    
        const fetchRelatedProducts = useCallback(async (category) => {
            try {
                const response = await axios.get(`${API}/products?category=${category}`);
                const filteredProducts = response.data.filter((p) => p._id !== id).slice(0, 4);
                setRelatedProducts(filteredProducts);
            } catch (err) {
                console.error("Error fetching related products:", err);
            }
        }, [id]); 
        

        useEffect(() => {
            const loadData = async () => {
                try {
                    const category = await fetchProducts()
                    if (category) {
                        await fetchRelatedProducts(category)
                    }
                } catch (err) {
                    console.error("Data loading error", err)
                }
            }
            loadData()
            window.scrollTo({ top: 0, behavior: "smooth" });
        }, [id, fetchProducts, fetchRelatedProducts])

        const { toggleWishlist, isInWishlist } = useWishlist()

    

    if (loading) return <div className="text-center text-xl">Loading product...</div>;
    if (error) return <div className="text-center text-xl text-red-500">Error: {error}</div>;
    if (!product?._id) return <div>Product not found.</div>

    

    return (
        <section>
        <div className="max-w-7xl mx-auto p-6 flex flex-col md:flex-row gap-10 mt-20 mb-10">
            <div className="w-full md:w-2/5">
                <div className="grid grid-cols-2 gap-2">
                    {product.image && <img src={product.image} alt="" className="w-60 h-45 rounded-2xl shadow-sm" />}
                    {product.image1 && <img src={product.image1} alt="" className="w-60 h-45 rounded-2xl shadow-sm" />}
                    {product.image2 && <img src={product.image2} alt="" className="w-60 h-45 rounded-2xl shadow-sm" />}
                    {product.image3 && <img src={product.image3} alt="" className="w-60 h-45 rounded-2xl shadow-sm" />}
                </div>
            </div>

            
            <div className="w-full md:w-3/5">
                <p className="text-gray-600">{product.shortname}</p>
                <p className="text-lg text-gray-500 font-semibold">{product.name}</p>

                <br /><br />

                {/* price details */}
                <div className="mt-1.5 mb-1.5">
                    <p className="text-2xl font-semibold text-black">₹ {product.price.toLocaleString("en-IN")}<span className="text-gray-500 line-through text-[15px] font-light px-2">₹ {product.oldprice.toLocaleString("en-IN")}</span><span className="text-xs text-gray-500 font-normal">( Incl of all Taxes ) </span></p>
                    
                    <p className="text-green-600 font-medium">{product.off || 0}% off</p>
                </div>


                <span className="flex text-sm border mb-3 max-w-[95px] px-2 py-1 mt-2 rounded border-gray-400 text-gray-500 relative">{product.ratingstar || "0.0"} <FaStar className="mt-1 ml-1 mr-3 text-amber-300" /> <span className="absolute left-[50%] right-[50%] top-0.5"> | </span> {product.rating || 0}</span>

                <br /><br />

                {/* quatity */}
                <div className="flex items-center p-1.5 rounded-full bg-gray-100 text-gray-700 gap-1.5 w-fit">
                    
                    <button type="button" className="px-1.5 rounded-full text-lg bg-white disabled:opacity-50" onClick={() => setQuantity((prev) => Math.max(1, prev - 1))} disabled={quantity <= 1}>
                        −
                    </button>
                    <span className="min-w-[20px] text-center">{quantity === 10 ? '': '0'}{quantity}</span>
                    <button type="button" className="px-1.5 rounded-full text-lg bg-white disabled:opacity-50" onClick={() => setQuantity((prev) => Math.min(10, prev + 1))} disabled={quantity >= 10}>
                        +
                    </button>
                    </div>

                


                {/* add to cart button */}
                <div className="grid grid-cols-2 mt-2 gap-2">
                    <button onClick={() =>  product._id && toggleWishlist(product)} className="flex justify-center items-center hover:bg-gray-200 bg-gray-100 text-black  gap-2 rounded-lg">
                        {isInWishlist(product._id) ? <GoHeartFill className='text-red-700' size={18} /> : <GoHeart size={18} />} Wishlist
                    </button>
                    <button onClick={() => addToCart(product, quantity)} className="w-full bg-[#2d9596] text-white py-3 rounded-lg flex justify-center items-center gap-2 text-lg hover:bg-[#1f6869] transition duration-300">
                        <IoCartOutline className="text-2xl" />
                        Add To Cart
                    </button>
                </div>
            </div>

        </div>



        {/* product details */}
        <div className="bg-gray-100 px-20 py-10">
            <h2 className="text-2xl font-semibold inline-block mb-6" style={{fontFamily : 'monospace'}}>Product Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
                <div className="my-3">
                    <h2 className="text-md font-semibold text-gray-700">Brand</h2>
                    <p className="text-gray-500 text-md">{product.brand || "Not Availabe"}</p>
                </div>

                <div className="my-3">
                    <h2 className="text-md font-semibold text-gray-700">Materials</h2>
                    <p className="text-gray-500 text-md">{product.material || "Not Availabe"}</p>
                </div>

                <div className="my-3">
                    <h2 className="text-md font-semibold text-gray-700">Collections</h2>
                    <p className="text-gray-500 text-md">{product.collections || "Not Availabe"}</p>
                </div>

                <div className="my-3">
                    <h2 className="text-md font-semibold text-gray-700">Dimensions ( Centimeter )</h2>
                    <p className="text-gray-500 text-md">{product.dimensionscm || "Not Availabe"}</p>
                </div>

                <div className="my-3">
                    <h2 className="text-md font-semibold text-gray-700">Dimensions in ( Inches )</h2>
                    <p className="text-gray-500 text-md">{product.dimensionsinch || "Not Availabe"}</p>
                </div>

                <div className="my-3">
                    <h2 className="text-md font-semibold text-gray-700">Type</h2>
                    <p className="text-gray-500 text-md">{product.type || "Not Availabe"}</p>
                </div>

                <div className="my-3">
                    <h2 className="text-md font-semibold text-gray-700">Height (Inches)</h2>
                    <p className="text-gray-500 text-md">{product.seatingheight || "Not Availabe"}</p>
                </div>

                <div className="my-3">
                    <h2 className="text-md font-semibold text-gray-700">Weight</h2>
                    <p className="text-gray-500 text-md">{product.weight || "Not Availabe"}KG</p>
                </div>
            </div>
        </div>


            {/* product policies */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-20 mb-20 bg-gray-950 text-white py-9">
                <div className="flex my-5 md:my-0">
                    <img src={van} className="w-18 mr-5" alt="" />
                    <div className="text-sm max-w-[180px]">
                        <p className="text-md font-semibold mb-3">Shipping</p>
                        <p className="text-xs text-gray-400">Directly from Factory/Warehouse, Delivered in multiple boxes.</p>
                    </div>
                </div>

                <div className="flex my-5 md:my-0">
                    <img src={warranty} className="w-18 mr-5" alt="" />
                    <div className="text-sm max-w-[180px]">
                        <p className="text-md font-semibold mb-3">Warranty</p>
                        <p className="text-xs text-gray-400">1 year manufacturer warranty, MDF boards are not covered under warranty</p>
                    </div>
                </div>

                <div className="flex my-5 md:my-0">
                    <img src={installation} className="w-18 mr-5" alt="" />
                    <div className="text-sm max-w-[180px]">
                        <p className="text-md font-semibold mb-3">Installation</p>
                        <p className="text-xs text-gray-400">Installation/Assembly will be done within 4 working days of delivery</p>
                    </div>
                </div>
            </div>

            {/* related products section */}
            <div className="mx-5 md:mx-20 mt-10">
                <h2 className="text-2xl font-semibold mb-6 inline-block">You May Also Like <hr className="border-2 w-[47%] mt-1 border-[#2d9596] rounded-2xl" /></h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct) => (
                        <div key={relatedProduct.id} className="border border-gray-200 p-4 rounded-lg">
                            <img src={relatedProduct.image} alt={relatedProduct.shortname} className="w-full h-40 object-cover rounded-lg mb-3" />
                            <p className="font-semibold">{relatedProduct.shortname}</p>
                            <p className="text-gray-500">₹ {relatedProduct.price?.toLocaleString("en-IN")}</p>
                            <button onClick={() => navigate(`/product/${relatedProduct.id}`)} className="mt-2 w-full bg-[#2d9596] text-white py-2 rounded-lg">View Details</button>
                        </div>
                    ))}
                </div>
            </div>



            {/* accordion */}
            <div className="px-15 my-10">
                <h2 className="text-3xl font-semibold inline-block" style={{fontFamily : 'monospace'}}>FAQ <hr className="w-[70%] border-2 border-[#2d9596] rounded-sm" /></h2>
                <div className="mt-5 space-y-2">
                    {items.map((item, index) => (
                        <div key={index} className="border-b-1 overflow-hidden">
                            <button
                                onClick={() => toggleAccordion(index)}
                                className="w-full text-left p-2 font-medium flex  items-center"
                            >
                                <span>{openIndex === index ? <RiArrowDropUpLine size={30} /> : <RiArrowDropDownLine size={30} />}</span>
                                <span>{item.title}</span>
                            </button>
                            <div
                                className={`transition-all duration-300 ease-in-out ${
                                openIndex === index ? "max-h-40 p-3" : "max-h-0 p-0"
                                } overflow-hidden`}
                            >
                                <p className="text-gray-700">{item.content}</p>
                            </div>
                        </div>
                    ))}
                    </div>
            </div>

        </section>
    );
}

export default ProductDetail;
