import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Truck, Zap, X, MessageSquareText } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';

const ExpressDeliveryAd = () => {
  const { t } = useLanguage();
  const { cart, getTotalPrice, isCartModalOpen } = useCart();
  const [positionStyle, setPositionStyle] = useState({ bottom: '1rem', position: 'fixed' });
  const [isMobile, setIsMobile] = useState(false); // Nuevo estado para detectar si es móvil

  useEffect(() => {
    // Función para detectar si es un dispositivo móvil
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768); // Considerar móvil si el ancho es menor a 768px (md en Tailwind)
    };

    checkIsMobile(); // Ejecutar al montar
    window.addEventListener('resize', checkIsMobile); // Escuchar cambios de tamaño de ventana

    const handleScroll = () => {
      const footer = document.querySelector('footer');
      const adElement = document.getElementById('express-delivery-ad');
      
      if (footer && adElement) {
        const footerRect = footer.getBoundingClientRect();
        const adRect = adElement.getBoundingClientRect();
        
        const adHeightWithMargin = adRect.height + 20; 

        // Si el footer está entrando en la vista desde abajo
        if (window.innerHeight > footerRect.top && footerRect.top < window.innerHeight) {
          const newBottom = window.innerHeight - footerRect.top + 10; 
          setPositionStyle({ bottom: `${newBottom}px`, position: 'fixed' });
        } else {
          // Si el footer no está en la vista, el anuncio sigue flotando en la parte inferior
          setPositionStyle({ bottom: '1rem', position: 'fixed' });
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Establecer posición inicial

    return () => {
      window.removeEventListener('resize', checkIsMobile);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // La visibilidad ahora depende de si es móvil Y si el carrito NO está abierto
  const isVisible = isMobile && !isCartModalOpen;

  const handleWhatsAppRedirect = () => {
    const phoneNumber = '5215512345678'; // Reemplaza con tu número de WhatsApp
    let message = t.expressDeliveryAd.whatsappMessageStartProfessional;

    if (cart.length === 0) {
      message += t.expressDeliveryAd.whatsappMessageEmptyCartProfessional;
    } else {
      message += t.expressDeliveryAd.whatsappMessageItemsProfessional;
      cart.forEach((item, index) => {
        message += `\n- ${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}`;
      });
      message += `\n\n${t.expressDeliveryAd.whatsappMessageTotalProfessional}: $${getTotalPrice().toFixed(2)}`;
      message += `\n\n${t.expressDeliveryAd.whatsappMessageEndProfessional}`;
    }

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const adVariants = {
    hidden: { opacity: 0, y: 100, scale: 0.8 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 10 } },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          id="express-delivery-ad"
          className="md:hidden right-4 bg-gradient-to-br from-pink-500 to-purple-600 text-white rounded-xl shadow-xl p-4 pr-12 flex items-center gap-3 cursor-pointer z-50"
          style={positionStyle}
          variants={adVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={handleWhatsAppRedirect}
        >
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", delay: 0.5 }}
          >
            <MessageSquareText size={32} className="text-white" />
          </motion.div>
          <div className="flex flex-col">
            <p className="text-lg font-bold leading-tight">{t.expressDeliveryAd.titleProfessional}</p>
            <p className="text-sm font-medium opacity-90 flex items-center gap-1">
              <Zap size={16} /> {t.expressDeliveryAd.subtitleProfessional}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExpressDeliveryAd;