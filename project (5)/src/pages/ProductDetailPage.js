import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, ArrowLeft, Star, CheckCircle, User, PlayCircle, MessageSquareText } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

// Datos de productos de ejemplo (¡en un proyecto real, esto vendría de una API!)
import { productsData } from './ProductsPage'; // Importar productsData desde ProductsPage

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { t } = useLanguage();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showAddedToCart, setShowAddedToCart] = useState(false);

  useEffect(() => {
    // En un proyecto real, aquí harías una llamada a la API para obtener el producto por ID
    const foundProduct = productsData.find((p) => p.id === id);
    setProduct(foundProduct);
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({ ...product, quantity: quantity });
      setShowAddedToCart(true);
      setTimeout(() => setShowAddedToCart(false), 3000); // Ocultar mensaje después de 3 segundos
    }
  };

  const handleCashOnDeliveryProduct = () => {
    if (product) {
      const phoneNumber = '5215512345678'; // Reemplaza con tu número de WhatsApp
      const message = t.productDetail.whatsappProductMessage
        .replace('{productName}', product.name)
        .replace('{productPrice}', (product.price * quantity).toFixed(2)) // Precio total por la cantidad
        .replace('{quantity}', quantity);
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 text-lg">{t.productDetail.loading}</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-50 py-12"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.button
          onClick={() => navigate('/products')}
          className="inline-flex items-center text-pink-600 hover:text-pink-700 font-medium mb-8 transition-colors"
          whileHover={{ x: -5 }}
        >
          <ArrowLeft size={20} className="mr-2" /> {t.productDetail.backToProducts}
        </motion.button>

        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative overflow-hidden rounded-lg shadow-md"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col justify-between"
          >
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
                {product.name}
              </h1>
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                      stroke={i < Math.floor(product.rating) ? 'currentColor' : 'gray'}
                    />
                  ))}
                </div>
                <span className="ml-2 text-gray-600">
                  {product.rating} ({product.reviews} {t.productDetail.reviews})
                </span>
              </div>
              <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                {product.description}
              </p>

              {/* Benefits */}
              {product.benefits && product.benefits.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    {t.productDetail.benefitsTitle || "Beneficios Clave"}
                  </h3>
                  <ul className="space-y-2">
                    {product.benefits.map((benefit, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className="flex items-center text-gray-700"
                      >
                        <CheckCircle size={18} className="text-green-500 mr-2 flex-shrink-0" />
                        <span>{benefit}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Usage */}
              {product.usage && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    {t.productDetail.usageTitle || "Modo de Uso"}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{product.usage}</p>
                </div>
              )}
            </div>

            {/* Price and Add to Cart */}
            <div className="border-t border-gray-200 pt-6 mt-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-4xl font-bold text-pink-600">
                  ${product.price.toFixed(2)}
                </span>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                  >
                    -
                  </button>
                  <span className="text-xl font-semibold text-gray-800">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3"> {/* Contenedor para los botones */}
                <motion.button
                  onClick={handleAddToCart}
                  className="flex-1 bg-pink-600 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-pink-700 transition-colors flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ShoppingCart size={24} /> {t.productDetail.addToCart}
                </motion.button>
                <motion.button
                  onClick={handleCashOnDeliveryProduct}
                  className="flex-1 bg-green-500 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <MessageSquareText size={24} /> {t.productDetail.cashOnDelivery}
                </motion.button>
              </div>
              <AnimatePresence>
                {showAddedToCart && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-green-600 text-center mt-3 font-medium"
                  >
                    {t.productDetail.addedToCart
                      .replace('{quantity}', quantity)
                      .replace('{productName}', product.name)}
                  </motion.p>
                )}
              </AnimatePresence>
            </div >
          </motion.div>
        </div >

        {/* Video Demo Section */}
        {product.videoDemo && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-6 md:p-8 mt-8"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <PlayCircle size={32} className="text-pink-600" /> {t.productDetail.videoDemoTitle || "Video de Demostración"}
            </h2>
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}> {/* 16:9 Aspect Ratio */}
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-lg shadow-md"
                src={product.videoDemo}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </motion.div>
        )}

        {/* Customer Testimonials Section */}
        {product.customerTestimonials && product.customerTestimonials.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-white rounded-xl shadow-lg p-6 md:p-8 mt-8"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <User size={32} className="text-pink-600" /> {t.productDetail.testimonialsTitle || "Lo que dicen nuestros clientes"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {product.customerTestimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200"
                >
                  <div className="flex items-center mb-3">
                    <span className="font-semibold text-gray-800 mr-2">{testimonial.name}</span>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          fill={i < Math.floor(testimonial.rating) ? 'currentColor' : 'none'}
                          stroke={i < Math.floor(testimonial.rating) ? 'currentColor' : 'gray'}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700 italic leading-relaxed">"{testimonial.text}"</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div >
    </motion.div >
  );
};

export default ProductDetailPage;