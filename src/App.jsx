import './App.css'
import { createHashRouter, RouterProvider } from "react-router-dom"
import RootLayout from "./pages/RootLayout"
import Home from "./pages/Home"
import NewArrivals from './pages/NewArriavals'
import Offers from "./pages/Offers"
import BestSeller from "./pages/BestSeller"
import Bed from "./pages/shop/Bed"
import Sofa from "./pages/shop/Sofa"
import Cart from "./pages/Cart"
import './App.css'
import Login from './components/Login or signup/Login'
import ProductDetail from './components/InsideProduct'





const router = createHashRouter([
  {path: '', element: <RootLayout />, children: [
    { path: '/', element: <Home /> },
    { path: '/new-arrivals', element: <NewArrivals /> },
    { path: '/bestseller', element: <BestSeller /> },
    { path: '/offers', element: <Offers /> },
    { path: '/bed', element: <Bed /> },
    { path: '/sofa', element: <Sofa /> },
    { path: '/cart', element: <Cart /> },
    { path: '/login', element: <Login /> },
    { path: '/category/:category/product/:id', element: <ProductDetail /> }
  ]}
])



function App() {



  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
