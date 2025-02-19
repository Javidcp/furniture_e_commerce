import { TbTruckDelivery } from "react-icons/tb";
import { FaPhoneAlt } from "react-icons/fa";
import { FaGift } from "react-icons/fa";





const CustomBanner = () => {
    return (
        <div className="hidden md:block py-10 px-20">
            <div className="flex justify-center items-center">
                <div className="mx-auto flex max-w-sm items-center gap-x-4   ">
                    <TbTruckDelivery className="size-8 shrink-0 text-red-500" />
                    <div>
                        <div className="text-xl font-medium text-black">Free Delivery</div>
                        <p className="text-gray-500">on order abover ₹499</p>
                    </div>
                </div>
                <div className="mx-auto flex max-w-sm items-center gap-x-4">
                    <FaPhoneAlt className="size-8 shrink-0 text-red-500" />
                    <div>
                        <div className="text-xl font-medium text-black">Premium Support</div>
                        <p className="text-gray-500">24/7 including holiday</p>
                    </div>
                </div>
                <div className="mx-auto flex max-w-sm items-center gap-x-4">
                    <FaGift className="size-8 shrink-0 text-red-500" />
                    <div>
                        <div className="text-xl font-medium text-black">Members Discount</div>
                        <p className="text-gray-500">up to 30% off</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomBanner