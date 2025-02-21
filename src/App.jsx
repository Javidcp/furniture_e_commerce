import './App.css'
import { createHashRouter, RouterProvider } from "react-router-dom"
import RootLayout from "./pages/RootLayout"
import Home from "./pages/Home"
import Bed from "./pages/shop/Bed"
import Sofa from "./pages/shop/Sofa"
import Cart from "./pages/Cart"
import './App.css'
import Login from './components/Login or signup/Login'
import ProductDetail from './components/InsideProduct'
import { CartProvider } from './components/cart/CartContext'
import Table from './pages/shop/Table'
import Chair from './pages/shop/Chair'
import Wardrobe from './pages/shop/Wardrobe'
import Cabinets from './pages/shop/Cabinets'
import HomeDecor from './pages/shop/HomeDecor'
import Cushion from './pages/shop/Cushion'
import Payment from './components/Payment'
import Order from './components/Order'
import About from './pages/About'
import Contact from './pages/Contact'
import OrderHistory from './components/OrderHistory'




const router = createHashRouter([
  {path: '', element: <RootLayout />, children: [
    { path: '/', element: <Home /> },
    { path: '/table', element: <Table /> },
    { path: '/chair', element: <Chair /> },
    { path: '/wardrobe', element: <Wardrobe /> },
    { path: '/cabinets', element: <Cabinets /> },
    { path: '/homedecors', element: <HomeDecor /> },
    { path: '/cushions', element: <Cushion /> },
    { path: '/bed', element: <Bed /> },
    { path: '/sofa', element: <Sofa /> },
    { path: '/cart', element: <Cart /> },
    { path: '/login', element: <Login /> },
    { path: '/payment', element: <Payment /> },
    { path: '/order', element: <Order /> },
    { path: 'orderhistory', element: <OrderHistory /> },
    { path: '/about', element: <About /> },
    { path: '/contact', element: <Contact /> },
    { path: '/category/:category/product/:id', element: <ProductDetail /> }
  ]}
])



function App() {



  return (
    <>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </>
  )
}

export default App
