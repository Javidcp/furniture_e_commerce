import HeroBanner from "../components/Banner"

import CustomBanner from "../components/CustomBanner"

import Photo from "../components/Photo"
import PopularProduct from "../components/PopularProduct"
import Products from "../components/ProductList"






const Home = () => {
    return (
        <>
            <HeroBanner />
            <Products />
            <Photo />
            <PopularProduct />
            <CustomBanner />
            
            
        </>
    )
}

export default Home