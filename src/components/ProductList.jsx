import sofa from '../assets/prd-sofa.jpg'
import bed from '../assets/prd-bed.jpg'
import wardrobe from '../assets/prd-wardrobe.jpg'
import chair from '../assets/prd-chair.jpg'
import table from '../assets/prd-table.jpg'
import shelves from '../assets/prd-shelves.jpg'
import light from '../assets/prd-decor.jpg'
import pillow from '../assets/prd-pillow.jpg'


const ProductList = () => {
    return (
        <section>
            <h2 className='text-center text-2xl md:text-4xl font-bold my-8'>Shop By Category </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-5 md:mx-20 text-center">
                <div className='mx-auto'>
                    <div className='shadow-sm w-[200px] h-[200px] rounded-full mt-5' style={{backgroundImage : `url(${sofa})` , backgroundPosition : 'center' , backgroundSize : 'cover', backgroundRepeat : 'no-repeat'}}></div>
                    <p className='my-3 font-semibold text-sm'>Sofas & Seating</p>
                </div>
                <div className='mx-auto'>
                    <div className='shadow-sm w-[200px] h-[200px] rounded-full mt-5' style={{backgroundImage : `url(${bed})` , backgroundPosition : 'center' , backgroundSize : 'cover', backgroundRepeat : 'no-repeat'}}></div>
                    <p className='my-3 font-semibold text-sm'>Beds</p>
                </div>
                <div className='mx-auto'>
                    <div className='shadow-sm w-[200px] h-[200px] rounded-full mt-5' style={{backgroundImage : `url(${wardrobe})` , backgroundPosition : 'center' , backgroundSize : 'cover', backgroundRepeat : 'no-repeat'}}></div>
                    <p className='my-3 font-semibold text-sm'>Wardrobes</p>
                </div>
                <div className='mx-auto'>
                    <div className='shadow-sm w-[200px] h-[200px] rounded-full mt-5' style={{backgroundImage : `url(${chair})` , backgroundPosition : 'bottom' , backgroundSize : 'cover', backgroundRepeat : 'no-repeat'}}></div>
                    <p className='my-3 font-semibold text-sm'>Chairs</p>
                </div>
                <div className='mx-auto'>
                    <div className='shadow-sm w-[200px] h-[200px] rounded-full mt-5' style={{backgroundImage : `url(${table})` , backgroundPosition : 'bottom' , backgroundSize : 'cover', backgroundRepeat : 'no-repeat'}}></div>
                    <p className='my-3 font-semibold text-sm'>Kitchen & Dinnig Tables</p>
                </div>
                <div className='mx-auto'>
                    <div className='shadow-sm w-[200px] h-[200px] rounded-full mt-5' style={{backgroundImage : `url(${shelves})` , backgroundPosition : 'center' , backgroundSize : 'cover', backgroundRepeat : 'no-repeat'}}></div>
                    <p className='my-3 font-semibold text-sm'>Cabinets & Shelves</p>
                </div>
                <div className='mx-auto'>
                    <div className='shadow-sm w-[200px] h-[200px] rounded-full mt-5' style={{backgroundImage : `url(${light})` , backgroundPosition : 'top' , backgroundSize : 'cover', backgroundRepeat : 'no-repeat'}}></div>
                    <p className='my-3 font-semibold text-sm'>Home Decor & Lighting</p>
                </div>
                <div className='mx-auto'>
                    <div className='shadow-sm w-[200px] h-[200px] rounded-full mt-5' style={{backgroundImage : `url(${pillow})` , backgroundPosition : 'center' , backgroundSize : 'cover', backgroundRepeat : 'no-repeat'}}></div>
                    <p className='my-3 font-semibold text-sm'>Pillows & Cushions</p>
                </div>
                
            </div>
        </section>
    )
}

export default ProductList