import { Outlet, useLocation } from "react-router-dom"
import Navbar from "../components/Navbar/Navbar"
import Footer from "../components/Footer"
import { useEffect } from "react"


const RootLayout = () => {

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
        <Navbar />
        <Outlet />
        <Footer />
    </>
  )
}

export default RootLayout