import sofa from '../assets/prd-sofa.jpg'
import bed from '../assets/prd-bed.jpg'
import wardrobe from '../assets/prd-wardrobe.jpg'
import chair from '../assets/prd-chair.jpg'
import table from '../assets/prd-table.jpg'
import shelves from '../assets/prd-shelves.jpg'
import light from '../assets/prd-decor.jpg'
import pillow from '../assets/prd-pillow.jpg'
import { Link } from 'react-router-dom'


const ProductList = () => {
    

    return (
        <section>
            <h2 className='text-center text-2xl md:text-4xl font-bold my-8'>Shop By Category </h2>
            <div className="grid  lg:grid-cols-[300px_1fr] md:mx-20 text-center">
            <div className='hidden lg:flex flex-col text-start gap-6 text-[#164a4b] font-semibold text-lg my-30 relative '>
                <hr className='rotate-90 absolute top-48.5 z-30 right-29 h-2 w-[368px]'/>
                <li className=""><Link to='/sofa'>Sofas</Link></li>
                <li className=""><Link to='/bed'>Beds</Link></li>
                <li className=""><Link to='/wardrobe'>Wardrobes</Link></li>
                <li className=""><Link to='/chair'>Chairs</Link></li>
                <li className=""><Link to='/table'>Table</Link></li>
                <li className=""><Link to='/cabinets'>Cabinets</Link></li>
                <li className=""><Link to='/homedecors'>Home Decor</Link></li>
                <li className=""><Link to='/cushions'>Cushions</Link></li>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 '>                
                <Link to='/sofa' className="mx-auto relative w-[250px] h-[200px] mt-1.5 rounded-xl shadow-md overflow-hidden group" style={{ backgroundImage: `url(${sofa})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
                    <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <div className='bg-black opacity-30 w-full h-full absolute'></div>
                        <span className="text-white text-xl mb-2 z-10">Sofas</span>
                        <button className="bg-white text-black px-4 py-1 rounded z-10">Explore</button>
                    </div>
                </Link>

                <Link to='/bed' className='mx-auto relative w-[250px] shadow-md h-[200px] mt-1.5 rounded-xl overflow-hidden group' style={{backgroundImage : `url(${bed})` , backgroundPosition : 'center' , backgroundSize : 'cover', backgroundRepeat : 'no-repeat'}}>
                    <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <div className='bg-black opacity-30 w-full h-full absolute'></div>
                        <span className="text-white text-xl mb-2 z-10">Beds</span>
                        <button className="bg-white text-black px-4 py-1 rounded z-10">Explore</button>
                    </div>
                </Link>
                <Link to='/wardrobe' className='mx-auto relative w-[250px] shadow-md h-[200px] mt-1.5 rounded-xl overflow-hidden group' style={{backgroundImage : `url(${wardrobe})` , backgroundPosition : 'center' , backgroundSize : 'cover', backgroundRepeat : 'no-repeat'}}>
                    <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <div className='bg-black opacity-30 w-full h-full absolute'></div>
                        <span className="text-white text-xl mb-2 z-10">Wardrobes</span>
                        <button className="bg-white text-black px-4 py-1 rounded z-10">Explore</button>
                    </div>
                </Link>
                <Link to='/chair' className='mx-auto relative w-[250px] shadow-md h-[200px] mt-4 rounded-xl overflow-hidden group' style={{backgroundImage : `url(${chair})` , backgroundPosition : 'bottom' , backgroundSize : 'cover', backgroundRepeat : 'no-repeat'}}>
                    <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <div className='bg-black opacity-30 w-full h-full absolute'></div>
                        <span className="text-white text-xl mb-2 z-10">Chairs</span>
                        <button className="bg-white text-black px-4 py-1 rounded z-10">Explore</button>
                    </div>
                </Link>
                <Link to='/table' className='mx-auto relative w-[250px] shadow-md h-[200px] mt-4 rounded-xl overflow-hidden group' style={{backgroundImage : `url(${table})` , backgroundPosition : 'bottom' , backgroundSize : 'cover', backgroundRepeat : 'no-repeat'}}>
                    <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <div className='bg-black opacity-30 w-full h-full absolute'></div>
                        <span className="text-white text-xl mb-2 z-10">Tables</span>
                        <button className="bg-white text-black px-4 py-1 rounded z-10">Explore</button>
                    </div>
                </Link>
                <Link to='/cabinets' className='mx-auto relative w-[250px] shadow-md h-[200px] mt-4 rounded-xl overflow-hidden group' style={{backgroundImage : `url(${shelves})` , backgroundPosition : 'center' , backgroundSize : 'cover', backgroundRepeat : 'no-repeat'}}>
                    <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <div className='bg-black opacity-30 w-full h-full absolute'></div>
                        <span className="text-white text-xl mb-2 z-10">Cabinets</span>
                        <button className="bg-white text-black px-4 py-1 rounded z-10">Explore</button>
                    </div>
                </Link>
                <Link to='/homedecors' className='mx-auto relative w-[250px] shadow-md h-[200px] mt-4 rounded-xl overflow-hidden group' style={{backgroundImage : `url(${light})` , backgroundPosition : 'top' , backgroundSize : 'cover', backgroundRepeat : 'no-repeat'}}>
                    <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <div className='bg-black opacity-30 w-full h-full absolute'></div>
                        <span className="text-white text-xl mb-2 z-10">Home Decor</span>
                        <button className="bg-white text-black px-4 py-1 rounded z-10">Explore</button>
                    </div>
                </Link>
                <Link to='/cushions' className='mx-auto relative w-[250px] shadow-md h-[200px] mt-4 rounded-xl overflow-hidden group' style={{backgroundImage : `url(${pillow})` , backgroundPosition : 'center' , backgroundSize : 'cover', backgroundRepeat : 'no-repeat'}}>
                    <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <div className='bg-black opacity-30 w-full h-full absolute'></div>
                        <span className="text-white text-xl mb-2 z-10">Cushions</span>
                        <button className="bg-white text-black px-4 py-1 rounded z-10">Explore</button>
                    </div>
                </Link>
                </div>
            </div>
        </section>
    )
}

export default ProductList