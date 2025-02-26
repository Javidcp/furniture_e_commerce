import HeroBanner from "../components/Banner"

import CustomBanner from "../components/CustomBanner"
import HomeContent from "../components/HomeContent"
import Photo from "../components/Photo"
import PopularProduct from "../components/PopularProduct"
import Products from "../components/ProductList"
import Sofabanner from "../components/Sofabanner"





const Home = () => {
    return (
        <>
            <HeroBanner />
            <CustomBanner />
            <Products />
            <Sofabanner />
            <Photo />
            <PopularProduct />
            <HomeContent />
            
        </>
    )
}

export default Home