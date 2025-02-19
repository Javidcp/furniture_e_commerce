import HeroBanner from "../components/Banner"

import CustomBanner from "../components/CustomBanner"
import HomeContent from "../components/HomeContent"
import PopularProduct from "../components/PopularProduct"
import Products from "../components/ProductList"





const Home = () => {
    return (
        <>
            <HeroBanner />
            <CustomBanner />
            <Products />
            <PopularProduct />
            <HomeContent />
            
        </>
    )
}

export default Home