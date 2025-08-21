import React from 'react';
import { motion } from 'framer-motion';
import { Gift, Percent } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const DiscountBanner = () => {
  const { t } = useLanguage();

  const bannerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 10, delay: 0.5 } },
  };

  const textVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { delay: 0.8, duration: 0.5 } },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100, damping: 10, delay: 1.2 } },
  };

  return (
    <motion.div
      className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 px-6 flex flex-col md:flex-row items-center justify-center gap-4 shadow-lg"
      variants={bannerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={textVariants} className="flex items-center gap-3">
        <Gift size={32} className="text-white" />
        <p className="text-lg md:text-xl font-semibold text-center md:text-left">
          {t.promotionModal.welcomeSubtitle}
        </p>
      </motion.div>
      <motion.button
        className="bg-white text-pink-600 px-6 py-2 rounded-full font-bold text-md shadow-md hover:bg-pink-50 hover:scale-105 transition-all duration-300 flex items-center gap-2"
        variants={buttonVariants}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          // Aquí podrías añadir la lógica para abrir el modal de promoción
          // o redirigir a una página de promociones.
          alert("¡Aprovecha tu 10% de descuento con el código BIENVENIDO10!");
        }}
      >
        <Percent size={20} />
        {t.promotionModal.applyDiscount}
      </motion.button>
    </motion.div>
  );
};

export default DiscountBanner;