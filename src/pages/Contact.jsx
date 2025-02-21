import contact from '../assets/contact.jpg'

const Contact = () => {
    return (
        <div className="mt-20">
            <div className="text-center text-2xl pt-10">
                <h2 className="uppercase font-light text-gray-400 text-2xl" style={{fontFamily : 'sans-serif'}}>Contact <span className="text-black">us</span></h2>
            </div>

            <div className="flex flex-col my-10 justify-center md:flex-row gap-10 mb-10 md:mb-30">
                <img src={contact} alt="contact image" className='w-full md:w-[350px]' />
                <div className="flex flex-col gap-6">
                    <p className='font-semibold text-xl text-gray-600'>Our Store</p>
                    <p className='text-gray-500 text-sm'>HomeHavean Pvt. Ltd <br /> 3rdFloor, Umiya Emporium,<br />
                        97-99,Adugodi,Tavarekere, <br />
                        Opposite forum Mall,Hosur <br />
                        Road, Bangalore 560029, India</p>
                    <p className='text-gray-500 text-sm'> Phone No. : 99999 99999 <br /> Email : homehavean@gmail.com</p>
                </div>
            </div>
        </div>
    )
}

export default Contact