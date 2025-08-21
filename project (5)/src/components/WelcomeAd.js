import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const WelcomeAd = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Mostrar el anuncio después de un breve retraso
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000); // Aparece después de 2 segundos

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  const adVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 10 } },
    exit: { opacity: 0, y: 50, scale: 0.8, transition: { duration: 0.3 } },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-4 left-4 bg-gradient-to-br from-blue-500 to-green-500 text-white rounded-xl shadow-xl p-4 pr-12 flex items-center gap-3 cursor-pointer z-50"
          variants={adVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={() => alert(t.welcomeAd.message)} // Mensaje al hacer click (opcional)
        >
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: [0, 10, -10, 10, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: 0.5 }}
          >
            <Sparkles size={32} className="text-white" />
          </motion.div>
          <div className="flex flex-col">
            <p className="text-lg font-bold leading-tight">{t.welcomeAd.title}</p>
            <p className="text-sm font-medium opacity-90">{t.welcomeAd.subtitle}</p>
          </div>
          <motion.button
            onClick={(e) => { e.stopPropagation(); handleClose(); }}
            className="absolute top-2 right-2 p-1 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
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

export default WelcomeAd;