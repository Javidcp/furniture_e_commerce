import './App.css'
import { createHashRouter, RouterProvider } from "react-router-dom"
import RootLayout from "./pages/RootLayout"
import Home from "./pages/Home"
import Bed from "./pages/shop/Bed"
import Sofa from "./pages/shop/Sofa"
import Cart from "./pages/Cart"
import './App.css'
import ProductDetail from './components/InsideProduct'
import { CartProvider } from './components/cart/CartContext'
import Table from './pages/shop/Table'
import Chair from './pages/shop/Chair'
import Wardrobe from './pages/shop/Wardrobe'
import Cabinets from './pages/shop/Cabinets'
import HomeDecor from './pages/shop/HomeDecor'
import Cushion from './pages/shop/Cushion'
import Payment from './components/Payment'
import About from './pages/About'
import Contact from './pages/Contact'
import OrderHistory from './components/OrderHistory'
import Error from './pages/Error'
import Login from './components/Login or signup/Login'
import AdminPanel from './components/Admin/AdminPanel.jsx'
import ProtectedRoute from './components/Admin/ProtectedRoute'
import { useAuth } from './components/Authentication/useAuth.jsx'

import Users from './components/Admin/Users.jsx'
import Products from './components/Admin/Products.jsx'
import Orders from './components/Admin/Order.jsx'
import Dashboard from './components/Admin/Dashboard.jsx'
import UserDetails from './components/Admin/UserDetails.jsx'
import ProductDetails from './components/Admin/PrdouctDetails.jsx'
import EditProduct from './components/Admin/EditProduct.jsx'
import AddProduct from './components/Admin/AddProduct.jsx'
import OrderDetail from './components/Admin/OrderDetail.jsx'
import SearchButton from './components/Navbar/SearchButton.jsx'
import Wishlist from './pages/Wishlist.jsx'
import { WishlistProvider } from './components/wishlist/wishlistContext.jsx'
import Success from './pages/Success.jsx'
import Failed from './pages/Failed.jsx'




const router = createHashRouter([
  {path: '', element: <RootLayout />, errorElement: <Error /> , children: [
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
    { path: '/wishlist', element: <Wishlist /> },
    { path: '/login', element: <Login /> },
    { path: '/payment', element: <Payment /> },
    { path: '/orderhistory', element: <OrderHistory /> },
    { path: '/about', element: <About /> },
    { path: '/contact', element: <Contact /> },
    { path: '/category/:category/product/:id', element: <ProductDetail /> },
    { path: '/search', element: <SearchButton />},
    
  ]},
  { path: '/success/:orderId', element: <Success />},
  { path: '/failed', element: <Failed />},
  { path: '/dashboard', element: <ProtectedRoute><AdminPanel /></ProtectedRoute>, errorElement: <Error /> , children: [
      { path: '', element: <Dashboard /> },
      { path: 'users', element: <Users /> },
      { path: 'orders', element: <Orders /> },
      { path: 'products', element: <Products /> },
      { path: 'users/:id', element: <UserDetails /> },
      { path: 'products/:id', element: <ProductDetails /> },
      { path: 'products/edit/:id', element: <EditProduct /> },
      { path: 'products/add', element: <AddProduct /> },
      { path: 'orders/:orderId', element: <OrderDetail /> }
  ] }
])



function App() { 
  const { user, isLoading } = useAuth() || {};
  if (isLoading) {
    return <div>Loading...</div>;
  }
  const userEmail = user?.email;

  return (
    <>
        
      <WishlistProvider userEmail={userEmail}>
          <CartProvider>
            <RouterProvider router={router} />
          </CartProvider>
      </WishlistProvider>
        
    </>
  );
}


export default App
