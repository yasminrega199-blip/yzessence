import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, MessageSquareText, Percent } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

// Importar los datos de productos desde ProductsPage para mantener la coherencia
// En un proyecto real, esto vendría de una API con filtros de ofertas
import { productsData as allProductsData } from './ProductsPage'; 

const HotSalesPage = () => {
  const { addToCart } = useCart();
  const { t } = useLanguage();
  const [saleProducts, setSaleProducts] = useState([]);

  useEffect(() => {
    // Simular la selección del 60% de los productos con un 15% de descuento
    const numProductsForSale = Math.floor(allProductsData.length * 0.60);
    const shuffled = [...allProductsData].sort(() => 0.5 - Math.random());
    const selectedForSale = shuffled.slice(0, numProductsForSale);

    const productsWithDiscount = selectedForSale.map(product => ({
      ...product,
      originalPrice: product.price,
      price: parseFloat((product.price * 0.85).toFixed(2)), // 15% de descuento
      discount: '15%',
    }));
    setSaleProducts(productsWithDiscount);
  }, []);

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const handleCashOnDeliveryProduct = (product) => {
    const phoneNumber = '5215512345678'; // Reemplaza con tu número de WhatsApp
    const message = t.productsPage.whatsappProductMessage
      .replace('{productName}', product.name)
      .replace('{productPrice}', product.price.toFixed(2));
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-red-50 to-pink-100 py-12"
    >
      <div className="container mx-auto px-4">
        <motion.h1
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-extrabold text-center text-red-700 mb-6 flex items-center justify-center gap-3"
        >
          <Percent size={40} className="text-red-600" /> {t.hotSalesPage.title}
        </motion.h1>
        <motion.p
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-center text-gray-700 mb-10"
        >
          {t.hotSalesPage.subtitle}
        </motion.p>

        {saleProducts.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            initial="hidden"
            animate="visible"
          >
            {saleProducts.map((product) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                whileHover={{ scale: 1.03, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
                whileTap={{ scale: 0.98 }}
                className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col relative border-2 border-red-300"
              >
                <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                  {product.discount} OFF
                </div>
                <Link to={`/product/${product.id}`} className="block relative overflow-hidden flex-grow">
                  <motion.img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover transition-transform duration-300"
                    whileHover={{ scale: 1.1 }}
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">{product.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                    <div className="flex items-center mb-2">
                      <Star size={16} className="text-yellow-400 mr-1" fill="currentColor" />
                      <span className="text-sm text-gray-600">{product.rating} ({product.reviews})</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <p className="text-xl font-bold text-red-600">${product.price.toFixed(2)}</p>
                      <p className="text-sm text-gray-500 line-through">${product.originalPrice.toFixed(2)}</p>
                    </div>
                  </div>
                </Link>
                <div className="p-4 pt-0 flex gap-2">
                  <button
                    onClick={() => addToCart(product)}
                    className="flex-1 bg-pink-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-pink-700 transition-colors flex items-center justify-center gap-2 text-sm"
                  >
                    <ShoppingCart size={18} /> {t.productsPage.addToCart}
                  </button>
                  <button
                    onClick={() => handleCashOnDeliveryProduct(product)}
                    className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center justify-center gap-2 text-sm"
                  >
                    <MessageSquareText size={18} /> {t.productsPage.cashOnDelivery}
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-10 text-gray-600 text-lg"
          >
            {t.hotSalesPage.noSalesFound}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default HotSalesPage;