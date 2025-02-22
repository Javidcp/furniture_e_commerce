import Banner from "../assets/Home-banner.jpg"


const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: "smooth" });
    }
};

const HeroBanner = () => {
    return (
        <div className="lg:pt-15 pt-12">
            <div className="relative max-w-[100%] bg-cover bg-center h-[450px] md:h-[525px]" 
                style={{backgroundImage : `url(${Banner})` , backgroundPosition : 'center'}}>
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className='absolute inset-0 flex items-center justify-center text-white text-center px-4'>
                    <div className='text-center text-white px-4'>
                        <h1 className='text-3xl md:text-5xl lg:text-8xl font-bold mb-4'>
                            <span className="relative inline-block before:absolute before:-inset-1.5 before:block before:-skew-y-3 before:bg-red-500">
                                <span className="relative text-white dark:text-white">25% OFF</span>
                            </span>
                        </h1>
                        <p className='text-lg md:text-xl mb-6'>on order of ₹15,499 and more</p>
                        <button onClick={() => scrollToSection("popular-product")} className='bg-red-500 hover:bg-red-600 cursor-pointer text-white font-semibold py-2 px-4 md:py-3 md:px-6 rounded-lg transition-all duration-300'>
                            Shop Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroBanner

