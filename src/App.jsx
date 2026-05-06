import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import Layout from '@/components/layout/Layout';
import { CartProvider } from '@/lib/CartContext';
import CartSidebar from '@/components/shop/CartSidebar';

// Page imports
import Home from '@/pages/Home';
import Shop from '@/pages/Shop';
import About from '@/pages/About';
import Products from '@/pages/Products';
import Services from '@/pages/Services';
import Wholesale from '@/pages/Wholesale';
import Compliance from '@/pages/Compliance';
import Contact from '@/pages/Contact';
import Checkout from '@/pages/CheckOut';
import Register from '@/pages/Register';
import RefundPolicy from '@/pages/RefundPolicy';

// Account pages
import AccountLayout from '@/pages/account/AccountLayout';
import AccountOverview from '@/pages/account/AccountOverview';
import OrdersPage from '@/pages/account/OrdersPage';
import PrescriptionsPage from '@/pages/account/PrescriptionsPage';
import SettingsPage from '@/pages/account/SettingsPage';
import WishlistPage from '@/pages/account/WishlistPage';

const AuthenticatedApp = () => {
  const { user, isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#FAFAFA]">
        <div className="w-8 h-8 border-4 border-[#0A0A0A]/10 border-t-[#1B6E8C] rounded-full animate-spin" />
      </div>
    );
  }

  if (authError) {
    if (authError.type === 'user_not_registered') return <UserNotRegisteredError />;
    if (authError.type === 'auth_required') { navigateToLogin(); return null; }
  }

  return (
    <CartProvider>
      <CartSidebar />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/services" element={<Services />} />
          <Route path="/wholesale" element={<Wholesale />} />
          <Route path="/compliance" element={<Compliance />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/checkout" element={user ? <Checkout /> : <Register />} />
          <Route path="/register" element={<Register />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          
          {/* Account Routes */}
          <Route path="/account" element={<AccountLayout />}>
            <Route index element={<AccountOverview />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="prescriptions" element={<PrescriptionsPage />} />
            <Route path="wishlist" element={<WishlistPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </CartProvider>
  );
};

import { ReactLenis } from '@studio-freight/react-lenis';

import CursorFollower from '@/components/ui/CursorFollower';

function App() {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothTouch: false }}>
      <div className="relative w-full min-h-screen overflow-x-hidden font-sans text-foreground bg-background">
        <CursorFollower />
        <AuthProvider>
          <QueryClientProvider client={queryClientInstance}>
            <Router>
              <AuthenticatedApp />
            </Router>
            <Toaster />
          </QueryClientProvider>
        </AuthProvider>
      </div>
    </ReactLenis>
  );
}

export default App;