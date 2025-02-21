import { useEffect, useState } from "react";
import axios from "axios";
import { IoCartOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import bed from '../../assets/bed.jpg'


const API_BED = "http://localhost:5050/products"

const Bed = () => {

  const [products, setProducts] = useState([]);

    useEffect(() => {
        axios
            .get(API_BED)
            .then((response) => {
              // filtering Bed category from JSON-server
              const filteredBed = response.data.filter(product => product.category === "bed")
              setProducts(filteredBed)
            })
            .catch((error) => console.error("Error fetching products:", error));
    }, []);

  return (
    <section>
        <div className="relative max-w-[100%] bg-cover bg-center h-[250px] mt-15 md:h-[325px] w-[100%]" 
              style={{backgroundImage : `url(${bed})` , backgroundPosition : 'center'}}>
          <div className="absolute inset-0 bg-black opacity-30"></div>
          <div className='absolute inset-0 flex items-center justify-start text-white px-4'>
            <div className='text-white px-4'>
              <h1 className='text-lg md:text-2xl font-bold mb-4'>Confused?</h1>
              <p className=' text-2xl md:text-3xl lg:text-5xl mb-6'>Find your perfect mattreses</p>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-20 px-4 my-20">
                    <h2 className="text-center text-4xl font-bold text-gray-800 my-8">Our Collection</h2>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <Link to={`/category/bed/product/${product.id}`} key={product.id} className="bg-white shadow-md rounded-md overflow-hidden transform transition duration-300 hover:scale-105 relative">
                                <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                                
                                <div className="p-4">
                                    <h5 className="text-lg font-semibold text-black truncate">{product.name}</h5>
                                    <div className="flex relative">
                                        <p className="text-black mt-2">₹ {product.price.toLocaleString("en-IN")}</p>
                                        <p className="text-gray-500 mt-3.5 ml-2 line-through text-xs">₹ {product.oldprice.toLocaleString("en-IN")}</p>
                                        <p className='absolute right-0.5 bottom-0 text-xs text-green-800 font-medium'>{product.off}% off</p>
                                    </div>
                                        <button className="absolute top-1.5 right-2 px-2 py-2 rounded-full bg-gray-100 opacity-85">
                                            <IoCartOutline className="text-black transition duration-300 text-xl" />
                                        </button>
                                    
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
      
    </section>
  )
}

export default Bed


// {
//   "id": ,
//   "categoryId": 1,
//   "name": "",
//   "price": 1,
//   "oldprice": 1,
//   "rating": 434,
//   "stock": 15,
//   "image": "",
//   "image1": "",
//   "image2": "",
//   "image3": ""
// }