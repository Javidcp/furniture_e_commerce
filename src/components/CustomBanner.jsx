import payment from '../assets/payment.png'
import returned from '../assets/return.png'
import customer from '../assets/customer.png'




const CustomBanner = () => {
    return (
        <div className="hidden md:block py-15 px-20 bg-[#eaf4f1] font-serif ">
            <h2 className="text-center text-3xl font-semibold mb-10 ">Benefits for your expendiency</h2>
            <div className="flex justify-center items-center mt-18">
                <div className="mx-auto max-w-sm items-center gap-x-4  flex flex-col">
                    <img src={payment} alt="" className='w-10 mb-5' />
                    <div>
                        <div className="text-xl font-medium text-black">Payment Method</div>
                        
                    </div>
                </div>
                <div className="mx-auto max-w-sm items-center gap-x-4 flex flex-col">
                    <img src={returned} alt="" className='w-10 mb-5' />
                    <div>
                        <div className="text-xl font-medium text-black">Return Policy</div>
                    </div>
                </div>
                <div className="mx-auto max-w-sm items-center gap-x-4 flex flex-col">
                    <img src={customer} alt="" className='w-10 mb-5' />
                    <div>
                        <div className="text-xl font-medium text-black">Customer Supporter</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomBanner