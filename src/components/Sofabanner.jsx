import sofa from '../assets/Sofa-Download-PNG.png'

const Sofabanner = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 mt-0 md:mt-20 my-10 py-20 bg-red-100">
            <div className='text-center my-5 sm:my-0 mt-5 sm:mt-15'>
                <h3 className="text-xl md:text-3xl font-bold">Up To 40% Off</h3>
                <p className="text-gray-700 mt-5">We bring solutions to make life <br /> esier for our customer</p>
            </div>
            <div>
                <img src={sofa} alt="" />
            </div>
        </div>
    )
}

export default Sofabanner