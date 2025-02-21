import about from '../assets/about.jpg'

const About = () => {
    return (
        <div className="my-20 mx-5 md:mx-20">
            <div className="uppercase text-center">
                <h2 className="uppercase font-light text-gray-400 text-2xl" style={{fontFamily : 'sans-serif'}}>about <span className="text-black">us</span></h2>
            </div>
            <div className="my-10 flex flex-col md:flex-row gap-16">
                <img src={about} alt="About image" className='w-full md:w-[350px]' />
                <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600 text-justify">
                    <p>Forever was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of products from the comfort of their homes.</p>
                    <p>Since our inception, we&apos;ve worked tirelessly to curate a diverse selection of high-quality products that cater to every taste and preference. From fashion and beauty to electronics and home essentials, we offer an extensive collection sourced from trusted brands and suppliers.</p>
                    <b>Our mission</b>
                    <p>Our mission at forever is to empower customers with choice, convenience, and confidence. We&apos;re dedicated to providing a seamless shopping experience that exceeds expectation, from browsing and ordering to delivery and beyond.</p>
                </div>
            </div>

            <div className="text-xl py-5">
                    <h2 className="uppercase font-semibold text-gray-400 text-2xl" style={{fontFamily : 'sans-serif'}}>why <span className="text-black">choose us</span></h2>
            </div>
                <div className="flex flex-col md:flex-row text-sm">
                    <div className="border border-gray-300 px-10 md:px-16 py-8 sm:py-15 flex flex-col gap-5">
                        <b>Quality Assurance:</b>
                        <p className='text-gray-600'>We meticulously select and vet each product to ensure it meets our stringent quality standards</p>
                    </div>
                    <div className="border border-gray-300 px-10 md:px-16 py-8 sm:py-15 flex flex-col gap-5">
                        <b>Convenience:</b>
                        <p className='text-gray-600'>With our user-friendly interface and hassle-free ordering process, shopping has been easier</p>
                    </div>
                    <div className="border border-gray-300 px-10 md:px-16 py-8 sm:py-15 flex flex-col gap-5">
                        <b>Expectional Customer Service:</b>
                        <p className='text-gray-600'>Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority</p>
                    </div>
                </div>

        </div>
    )
}

export default About