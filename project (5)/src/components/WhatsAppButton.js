import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react'; // Mantener MessageSquare si se usa como fallback o para el estilo
import { FaWhatsapp } from 'react-icons/fa'; // Importar el icono de WhatsApp de React Icons

const WhatsAppButton = () => {
  const phoneNumber = '18091234567'; // Reemplaza con tu número de WhatsApp
  const message = 'Hola, me gustaría obtener más información sobre sus productos.'; // Mensaje predeterminado

  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <motion.button
      className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg flex items-center justify-center z-50"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1 }}
      onClick={handleClick}
      aria-label="Contactar por WhatsApp"
    >
      <FaWhatsapp size={32} /> {/* Usar el icono de WhatsApp */}
    </motion.button>
  );
};

export default WhatsAppButton;