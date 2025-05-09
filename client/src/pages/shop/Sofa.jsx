import { useEffect, useState } from "react";
import axios from "axios";
import sofa  from '../../assets/sofa.jpg';
import { Link } from "react-router-dom";
import { useWishlist } from "../../components/wishlist/wishlistContext";
import { GoHeart, GoHeartFill  } from "react-icons/go";


const API_BED = "http://localhost:5655/products"

const Sofa = () => {


  const [ products, setProducts ] = useState([])
  const [ loading, setLoading ] = useState(true)
  const [ error, setError ] = useState(null)

    const { toggleWishlist, isInWishlist } = useWishlist()
  

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_BED}?category=sofa`);
        setProducts(response.data);
      } catch (err) {
        console.error("Error fetching products", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchProducts();
  }, []);
  

  if (loading) return <h1 className="text-center">Loading...</h1>
  if (error) return <h1 className="text-center">{error}</h1>
  if (products.length === 0) return <h1 className="text-center py-10">No sofa products found</h1>;

  return (
    <section className="mb-20">
      
        <div className="relative max-w-[100%] bg-cover bg-center h-[250px] mt-15 md:h-[325px] w-[100%]" 
              style={{backgroundImage : `url(${sofa})` , backgroundPosition : 'center'}}>
          <div className="absolute inset-0 bg-black opacity-30"></div>
          <div className='absolute inset-0 flex items-center justify-start text-white px-4'>
            <div className='text-white px-4'>
              <h1 className='text-2xl md:text-3xl lg:text-5xl font-bold mb-4'>Lounge In Style</h1>
              <p className='text-lg md:text-xl mb-6'>Shop Contemporary 3 Seater Sofas</p>
            </div>
          </div>
        </div>

        <div className="max-w-[100%] mx-10 md:mx-20 px-4 my-10">
            <h2 className="text-center text-4xl font-bold text-gray-800 my-8">Our Collection</h2>
                    
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((product) => (
                  <div className="relative" key={product._id}>
                  <Link to={`/category/sofa/product/${product._id}`} className="bg-gray-100 rounded-2xl mb-4 overflow-hidden  relative flex flex-col">
                      <span className='absolute m-2 px-2 py-0.5 bg-[#2d9596]  text-white text-sm rounded-full'>-{product.off}%</span>
                      <img src={product.image} alt={product.name} className="w-full h-70 object-cover p-10 hover:p-8 transition-all duration-400" />
                      <div className=' bg-white p-2 px-3'>
                        <h6 className='text-sm'>{product.shortname}</h6>
                          <div className="flex">
                            <small className=''>₹{product.price.toLocaleString("en-IN")}</small>
                            <small className='line-through text-[10px] mt-1 ml-2'>₹{product.price.toLocaleString("en-IN")}</small>
                          </div>
                      </div>
                  </Link>
                  <button onClick={() => toggleWishlist(product)} className="text-black bg-white rounded-full p-2 z-30 cursor-pointer border-0 outline-0 absolute top-1 right-1">
                    {isInWishlist(product._id) ? <GoHeartFill className='text-red-700' size={18} /> : <GoHeart size={18} />}
                  </button>
                  </div>
              ))}
            </div>
        </div>
    </section>
  )
}

export default Sofa