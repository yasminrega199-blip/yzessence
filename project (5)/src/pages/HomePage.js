import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import YZEssenceLogo from '../components/YZEssenceLogo'; // Importar el nuevo logo
import { productsData } from './ProductsPage'; // Importar productos para "Más Vendidos"

const HomePage = () => {
  const { t } = useLanguage();

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
  };

  // Seleccionar algunos productos para "Más Vendidos" (ej. los primeros 4)
  const bestSellingProducts = productsData.slice(0, 4);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Hero Section */}
      <motion.section
        className="relative h-screen flex items-center justify-center text-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://4tsix0yujj.ufs.sh/f/2vMRHqOYUHc0J1KHSlipYIkKhaEN0eCX7zGogwrU3sn8TcHm')" }}>
          <div className="absolute inset-0 bg-black opacity-40"></div>
        </div>
        <div className="relative z-10 text-white p-4 max-w-4xl mx-auto">
          <motion.h1
            className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {t.home.heroTitle}
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl mb-8 font-light"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {t.home.heroSubtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <Link
              to="/products"
              className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              {t.home.exploreProducts}
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Artículos Más Vendidos Section */}
      <motion.section
        className="py-16 bg-white"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-12"
            variants={itemVariants}
          >
            Artículos Más Vendidos
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {bestSellingProducts.map((product, index) => (
              <motion.div
                key={product.id}
                className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center relative overflow-hidden"
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 15px 25px rgba(0,0,0,0.2)",
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.img
                  src={product.image}
                  alt={product.name}
                  className="w-40 h-40 object-cover rounded-full mb-4 shadow-md"
                  animate={{ rotateY: 360 }} // Rotación 3D constante
                  transition={{ repeat: Infinity, duration: 8, ease: "linear" }} // Gira constantemente
                />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">${product.price.toFixed(2)}</p>
                <Link
                  to={`/product/${product.id}`}
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-md text-sm"
                >
                  ¡Ordena Ahora con Pago Contra Entrega!
                </Link>
                <p className="text-xs text-green-700 font-bold mt-1 animate-pulse">Envío Express a tu Puerta</p> {/* Resaltado y animado */}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Why Choose Us Section */}
      <motion.section
        className="py-16 bg-gray-50"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-12"
            variants={itemVariants}
          >
            {t.home.whyChooseUs}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center transform hover:translate-y-[-5px] transition-transform duration-300"
              variants={itemVariants}
            >
              <div className="text-pink-500 text-5xl mb-4">✨</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{t.home.qualityTitle}</h3>
              <p className="text-gray-600">{t.home.qualityDesc}</p>
            </motion.div>
            <motion.div
              className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center transform hover:translate-y-[-5px] transition-transform duration-300"
              variants={itemVariants}
            >
              <div className="text-purple-500 text-5xl mb-4">💡</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{t.home.innovationTitle}</h3>
              <p className="text-gray-600">{t.home.innovationDesc}</p>
            </motion.div>
            <motion.div
              className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center transform hover:translate-y-[-5px] transition-transform duration-300"
              variants={itemVariants}
            >
              <div className="text-blue-500 text-5xl mb-4">💖</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{t.home.attentionTitle}</h3>
              <p className="text-gray-600">{t.home.attentionDesc}</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Call to Action Section */}
      <motion.section
        className="py-16 bg-gradient-to-r from-pink-600 to-purple-700 text-white text-center"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4"
            variants={itemVariants}
          >
            {t.home.ctaTitle}
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl mb-8 font-light"
            variants={itemVariants}
          >
            {t.home.ctaSubtitle}
          </motion.p>
          <motion.div variants={itemVariants}>
            <Link
              to="/products"
              className="bg-white text-pink-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              {t.home.shopNow}
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default HomePage;