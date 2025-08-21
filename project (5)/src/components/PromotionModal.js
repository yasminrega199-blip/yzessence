import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gift, Percent } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const PromotionModal = ({ isOpen, onClose, onApplyPromotion }) => {
  const { t } = useLanguage();
  const [promotionCode, setPromotionCode] = useState('BIENVENIDO10'); // Código de promoción predefinido
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => setIsCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(promotionCode);
    setIsCopied(true);
  };

  const handleApplyAndClose = () => {
    onApplyPromotion(promotionCode);
    onClose();
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100, damping: 15 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-60"
            onClick={onClose}
          ></motion.div>

          <motion.div
            className="bg-white rounded-3xl shadow-2xl p-8 relative z-10 max-w-md w-full text-center overflow-hidden"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <X size={24} />
            </button>

            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
              className="mb-6"
            >
              <Gift size={64} className="text-pink-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-800 mb-2">{t.promotionModal.welcomeTitle}</h2>
              <p className="text-gray-600 text-lg">{t.promotionModal.welcomeSubtitle}</p>
            </motion.div>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 150 }}
              className="bg-pink-50 border border-pink-200 rounded-xl p-4 mb-6"
            >
              <p className="text-pink-700 font-semibold text-sm mb-2">{t.promotionModal.yourDiscountCode}</p>
              <div className="flex items-center justify-center gap-2 bg-white border border-pink-300 rounded-lg py-2 px-4">
                <Percent size={20} className="text-pink-500" />
                <span className="text-2xl font-bold text-pink-600 tracking-wider">{promotionCode}</span>
                <button
                  onClick={handleCopyCode}
                  className="ml-3 bg-pink-600 text-white px-3 py-1 rounded-md text-sm hover:bg-pink-700 transition-colors"
                >
                  {isCopied ? t.promotionModal.copied : t.promotionModal.copy}
                </button>
              </div>
            </motion.div>

            <motion.button
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 150 }}
              onClick={handleApplyAndClose}
              className="w-full bg-pink-600 text-white px-6 py-3 rounded-xl font-semibold text-lg hover:bg-pink-700 transition-colors shadow-lg"
            >
              {t.promotionModal.applyDiscount}
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PromotionModal;