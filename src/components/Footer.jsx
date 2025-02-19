import { FaFacebookF, FaPhoneAlt, FaMap, FaRegCopyright  } from "react-icons/fa";
import { FaXTwitter, FaInstagram, FaYoutube   } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { MdEmail } from "react-icons/md";



const Footer = () => {

    

    return (
        <div className="w-full bg-zinc-800">
            <div className="grid grid-cols-1 sm:grid-cols-2 items-center text-center py-5 bg-red-500 text-white">
                <div>
                    Get connected with us on social networks!
                </div>
                <div className="flex justify-center mt-5 md:mt-0">
                    <FaFacebookF className="mx-7 cursor-pointer" size={20} />
                    <FaXTwitter className="mx-7 cursor-pointer" size={20} />
                    <FaInstagram className="mx-7 cursor-pointer" size={20} />
                    <FaYoutube  className="mx-7 cursor-pointer" size={20} />
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  px-20 text-white py-10">
                <div className="mx-2 mt-5 place-content-center max-w-[300px]">
                    <div className='text-2xl font-extrabold'>HOME<span className="text-red-500">HAVEN</span></div>
                    <p className="py-3 text-xs">Timeless design, superior comfort – Transform your home with our exquisite furniture</p>
                </div>
                <div className="mx-2 mt-5 text-sm">
                    <span className="font-bold inline-block">PRODUCTS <hr className="w-[70%] mt-1 text-red-500 " /></span>
                    <Link to='/bed'><p className="hover:text-red-500 mt-1">Bed</p></Link>
                    <Link to='/sofa'><p className="hover:text-red-500 mt-1">Sofa</p></Link>
                    <Link to='/wardrobe'><p className="hover:text-red-500 mt-1">Wardrobe</p></Link>
                    <Link to='/chair'><p className="hover:text-red-500 mt-1">Chair</p></Link>
                    <Link to='/table'><p className="hover:text-red-500 mt-1">Table</p></Link>
                </div>
                <div className="mx-2 mt-5">
                    <span className="font-bold inline-block">CONTACT <hr className="w-[70%] mt-1 text-red-500" /></span>
                    <p className="flex text-sm mt-1"><MdEmail className="mr-5 text-gray-400 mt-1" size={15} /><a href="mailto:your@email.com" className=" hover:text-blue-500 ml-1">homehavean@gmail.com</a></p>
                    <p className="flex text-sm mt-2"><FaPhoneAlt className="mr-5 text-gray-400 mt-1" size={15} />+91 99999 99999</p>
                    <p className="flex mt-2 text-[13px]"><FaMap className="mr-5 text-gray-400 mt-1" size={15} />HomeHavean Pvt. Ltd. Address: 3rd <br /> Floor, Umiya Emporium, 97-99,Adugodi,<br /> Tavarekere, Opposite forum Mall,Hosur <br /> Road, Bangalore 560029, India</p>
                </div>
            </div>
            <div>
                <hr className=" text-white mx-auto w-[90%]" />
                <p className="text-center text-white  text-xs py-2 flex justify-center">
                    HomeHaven <FaRegCopyright className="mt-1 mx-1" size={10} /> 2020 - All Right Reserved
                </p>
            </div>
        </div>
    )
}

export default Footer