import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { ShoppingCart, Star, MessageSquareText, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

// Importar los datos de productos desde ProductsPage para mantener la coherencia
import { productsData as allProductsData } from './ProductsPage'; 

const CategoryPage = () => {
  const { categoryName } = useParams();
  const { addToCart } = useCart();
  const { t } = useLanguage();
  const [categoryProducts, setCategoryProducts] = useState([]);

  useEffect(() => {
    // Asegurarse de que allProductsData sea un array antes de intentar filtrar
    if (Array.isArray(allProductsData)) {
      const filtered = allProductsData.filter(product => product.category === categoryName);
      setCategoryProducts(filtered);
    } else {
      console.error("productsData no es un array o no está definido.");
      setCategoryProducts([]); // Asegurar que categoryProducts sea un array vacío en caso de error
    }
  }, [categoryName]);

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

  // Función para obtener el nombre traducido de la categoría
  const getTranslatedCategoryName = (catKey) => {
    switch (catKey) {
      case 'maquillaje': return t.home.makeup;
      case 'cuidado-piel': return t.home.skinCare;
      case 'fragancias': return t.home.fragrances;
      // Las categorías de cabello, corporal y hogar ya no están en el menú,
      // pero se mantienen aquí por si se usan en otro contexto o se reintroducen.
      case 'cuidado-cabello': return t.home.hairCare || 'Cuidado del Cabello';
      case 'cuidado-corporal': return t.home.bodyCare || 'Cuidado Corporal';
      case 'hogar': return t.home.homeProducts || 'Productos para el Hogar';
      default: return catKey;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-50 py-12"
    >
      <div className="container mx-auto px-4">
        <Link
          to="/products"
          className="inline-flex items-center text-pink-600 hover:text-pink-700 font-medium mb-8 transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          {t.productsPage.all} {t.header.products}
        </Link>
        <motion.h1
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center text-gray-800 mb-10"
        >
          {getTranslatedCategoryName(categoryName)}
        </motion.h1>

        {categoryProducts.length > 0 ? (
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
            {categoryProducts.map((product) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                whileHover={{ scale: 1.03, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
                whileTap={{ scale: 0.98 }}
                className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col"
              >
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
                    <p className="text-xl font-bold text-pink-600">${product.price.toFixed(2)}</p>
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
            {t.productsPage.noProductsFound}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default CategoryPage;