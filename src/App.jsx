import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { ToastProvider } from './context/ToastContext';
import { AdminProvider, useAdmin } from './context/AdminContext';
import useScrollAnimation from './hooks/useScrollAnimation';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Toast from './components/Toast/Toast';
import Home from './pages/Home/Home';
import Shop from './pages/Shop/Shop';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import Cart from './pages/Cart/Cart';
import Checkout from './pages/Checkout/Checkout';
import Offers from './pages/Offers/Offers';
import Accessories from './pages/Accessories/Accessories';
import AdminLogin from './pages/Admin/AdminLogin';
import AdminDashboard from './pages/Admin/AdminDashboard';
import './index.css';

// Protected route: redirect to login if not authenticated as admin
const ProtectedAdminRoute = ({ children }) => {
  const { isAdmin } = useAdmin();
  return isAdmin ? children : <Navigate to="/admin/login" replace />;
};

function AnimatedApp() {
  useScrollAnimation();
  return (
    <>
      <Routes>
        {/* Admin routes — no Navbar/Footer */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminDashboard />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/*"
          element={
            <ProtectedAdminRoute>
              <AdminDashboard />
            </ProtectedAdminRoute>
          }
        />

        {/* Customer storefront */}
        <Route
          path="/*"
          element={
            <>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/mobiles" element={<Shop />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/offers" element={<Offers />} />
                <Route path="/accessories" element={<Accessories />} />
                <Route path="*" element={<Home />} />
              </Routes>
              <Footer />
              <Toast />
            </>
          }
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AdminProvider>
        <CartProvider>
          <WishlistProvider>
            <ToastProvider>
              <AnimatedApp />
            </ToastProvider>
          </WishlistProvider>
        </CartProvider>
      </AdminProvider>
    </BrowserRouter>
  );
}

export default App;
