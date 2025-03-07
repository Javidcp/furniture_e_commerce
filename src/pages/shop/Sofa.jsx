import { useEffect, useState } from "react";
import axios from "axios";
import sofa  from '../../assets/sofa.jpg';
import { Link } from "react-router-dom";

const API_BED = "http://localhost:5659/products"

const Sofa = () => {

  const [products, setProducts] = useState([]);

    useEffect(() => {
        axios
            .get(API_BED)
            .then((response) => {
              // filtering Sofa category from JSON-server
              const filteredSofa = response.data.filter(product => product.category === "sofa")
              setProducts(filteredSofa)
            })
            .catch((error) => console.error("Error fetching products:", error));
    }, []);

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
                    <Link to={`/category/sofa/product/${product.id}`} key={product.id} className="bg-white shadow-md rounded overflow-hidden transform transition duration-300 hover:scale-101 relative">
                        <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                        
                        <div className="p-4">
                            <h5 className="text-lg font-semibold text-black truncate">{product.name}</h5>
                            <div className="flex relative">
                                <p className="text-black mt-2">₹ {product.price.toLocaleString("en-IN")}</p>
                                <p className="text-gray-500 mt-3.5 ml-2 line-through text-xs">₹ {product.oldprice.toLocaleString("en-IN")}</p>
                                <p className='absolute right-0.5 bottom-0 text-xs text-green-800 font-medium'>{product.off}% off</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    </section>
  )
}

export default Sofa