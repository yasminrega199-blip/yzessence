import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import ReturnPolicyPage from './pages/ReturnPolicyPage';
import CheckoutPage from './pages/CheckoutPage';
import HotSalesPage from './pages/HotSalesPage';
import CategoryPage from './pages/CategoryPage';
import { CartProvider } from './context/CartContext';
import { LanguageProvider } from './context/LanguageContext';
import ExpressDeliveryAd from './components/ExpressDeliveryAd';
import GlobalFloatingAd from './components/GlobalFloatingAd';
// import WelcomeAd from './components/WelcomeAd'; // Eliminado

export default function App() {
  return (
    <LanguageProvider>
      <CartProvider>
        <Router>
          <Header />
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:categoryName" element={<CategoryPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/policies" element={<PrivacyPolicyPage />} />
              <Route path="/return-policy" element={<ReturnPolicyPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/hot-sales" element={<HotSalesPage />} />
            </Routes>
          </AnimatePresence>
          <Footer />
          <ExpressDeliveryAd />
          <GlobalFloatingAd />
          {/* <WelcomeAd /> */} {/* Eliminado */}
        </Router>
      </CartProvider>
    </LanguageProvider>
  );
}