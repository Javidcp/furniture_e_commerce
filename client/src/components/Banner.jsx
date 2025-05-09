const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: "smooth" });
    }
};

const HeroBanner = () => {
    return (
        <div className="">
            <div className="relative max-w-[100%] bg-cover bg-center h-[450px] md:h-[590px]" 
                style={{backgroundImage : `url(https://modishhomecollections.com/cdn/shop/files/1-v3.jpg?v=1702351172&width=1500)` , backgroundPosition :'bottom'}}>
                
                <div className='absolute inset-0  flex items-center text-black px-10'>
                    <div className='text-[#1f6869] px-4'>
                        <h3 className='text-3xl  font-bold mb-5'>
                            Exclusive Deals of <br />Furniture Collections
                        </h3>
                        <p className='text-md mb-6'>Explore different categories. Find the best deals</p>
                        <button onClick={() => scrollToSection("popular-product")} className='bg-[#2d9596] hover:bg-[#1f6869] cursor-pointer text-white font-semibold py-2 px-4 md:py-3 md:px-6 rounded-lg transition-all duration-300'>
                            Shop Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroBanner

