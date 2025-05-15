import { useEffect, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import api from "../Authentication/api";

const SearchButton = () => {
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [showInput, setShowInput] = useState(false);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get("/products/all");
                setProducts(response.data);
                setFilteredProducts(response.data);
            } catch (error) {
                console.error('Error Fetching Products:', error.response ? error.response.data : error.message); 
            }
        };
        

        fetchProducts();
    }, []);

    useEffect(() => {
        if (searchQuery.trim() === "") {
            setFilteredProducts([]);
        } else {
        const filtered = products.filter((product) =>
        product.name && product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

            setFilteredProducts(filtered);
        }
    }, [searchQuery, products]);

    const handleProductClick = () => {
        setSearchQuery("");
        setFilteredProducts([]);
        setShowInput(false);
    };

    return (
        <div className="relative">
            <div className="relative w-fit">
                {showInput && (
                    <input
                        type="text"
                        className="px-4 py-2 bg-[#343434] border-0 rounded-full outline-0 text-white placeholder:text-[#d7d7d7] transition-all duration-300"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        autoFocus
                    />
                )}
                <button
                    className={`absolute right-[0px] top-[-17px] text-white bg-black p-1.5 rounded-full ${showInput === true ? 'top-[0px] right-[0px]': ''}`}
                    onClick={() => setShowInput((prev) => !prev)}
                >
                    <IoSearchSharp size={20} />
                </button>
            </div>

            {filteredProducts.length > 0 && (
                <>
                <ul className="absolute px-2 z-50 bg-white w-screen ">
                    {filteredProducts.map((product) => (
                        <>
                        
                        <Link
                            key={product._id}
                            to={`/category/${product.category}/product/${product._id}`}
                            onClick={handleProductClick}
                        >
                            <li className="border-b px-2 py-1 flex gap-2">
                                <span>
                                    <img src={product.image} className="w-10 h-10" alt="" />
                                </span>
                                <span className="text-black">{product.name}</span>
                            </li>
                        </Link>
                        </>
                    ))}
                </ul>
                </>
            )}
        </div>
    );
};

export default SearchButton;
