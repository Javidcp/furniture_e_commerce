import { Link } from 'react-router-dom';
import { useWishlist } from '../components/wishlist/wishlistContext';
import { MdOutlineDelete } from "react-icons/md";



const Wishlist = () => {

    const { wishlist, removeFromWishlist } = useWishlist();


    if (wishlist === null) {
        return <div>Loading wishlist...</div>;
    }   

    return (
        <div className='mt-15 min-h-[37.6vh] mb-8'>
        <div className='mx-5 md:mx-20 lg:mx-50'>
            <h2 className='text-xl font-semibold py-2 border-b-1 border-gray-500'>
            My Wishlist ({wishlist.length})
            </h2>
            <ul>
                {wishlist.filter(item => item).map(item => (
                    <li key={item.productId || item._id} className='py-2 flex justify-between border-b border-gray-200 relative'>
                        <div className='flex gap-2'>
                            <Link to={`/category/${item.category}/product/${item.productId || item._id}`}>
                                <img src={item.image} className='w-20 sm:w-30 rounded' alt={item.name} />
                            </Link>
                            <div>
                                <Link to={`/category/${item.category}/product/${item.productId || item._id}`}>
                                    <p className='text-xs md:text-lg font-semibold'>{item.shortname}</p>
                                    <p className=' text-xs italic text-gray-600'>{item.name}</p>
                                </Link>
                                <div className='flex gap-2'>
                                    <p className='text-xs md:text-lg'>₹ {item.price}</p>
                                    <p className='text-xs relative top-2 line-through text-gray-400'>₹ {item.oldprice}</p>
                                </div>
                            </div>
                        </div>
                        <button onClick={() => removeFromWishlist(item.productId || item._id)} className='bg-red-500 rounded text-white text-sm absolute top-1 right-1 p-2'>
                            <MdOutlineDelete size={15} />
                        </button>
                    </li>
                ))}
            </ul>

        </div>
        </div>
    )
}

export default Wishlist