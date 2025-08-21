import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useLocation } from 'react-router-dom'; // Importar useLocation

const GlobalFloatingAd = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(true);
  const location = useLocation(); // Obtener la ubicación actual

  useEffect(() => {
    // Mostrar el anuncio al cargar la página o al cambiar de ruta
    setIsVisible(true);

    // Opcional: Si quieres que desaparezca después de un tiempo, puedes añadir un setTimeout
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 10000); // Desaparece después de 10 segundos

    // Limpiar el timer si el componente se desmonta o la ruta cambia
    return () => clearTimeout(timer);
  }, [location]); // Dependencia de location para que se reinicie al cambiar de página

  const handleClose = () => {
    setIsVisible(false);
  };

  const adVariants = {
    hidden: { opacity: 0, y: -50, scale: 0.8 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 10, delay: 0.5 } },
    exit: { opacity: 0, y: -50, scale: 0.8, transition: { duration: 0.3 } },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full shadow-lg px-6 py-3 flex items-center gap-3 z-50 cursor-pointer"
          variants={adVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={() => alert(t.globalAd.message)}
        >
          <Sparkles size={24} className="text-white" />
          <p className="text-sm font-semibold leading-tight">{t.globalAd.text}</p>
          <motion.button
            onClick={(e) => { e.stopPropagation(); handleClose(); }}
            className="p-1 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X size={16} className="text-white" />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GlobalFloatingAd;