import React from 'react';
import { motion } from 'framer-motion';

const EssenceLogo = () => {
  return (
    <motion.div
      className="flex items-center justify-center"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.span
        className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500"
        animate={{
          x: [0, -2, 2, -2, 2, 0], // Pequeña vibración horizontal
          y: [0, 2, -2, 2, -2, 0], // Pequeña vibración vertical
        }}
        transition={{
          repeat: Infinity,
          duration: 0.5,
          ease: "easeInOut",
          repeatDelay: 2, // Espera 2 segundos antes de repetir la vibración
        }}
      >
        Essence
      </motion.span>
    </motion.div>
  );
};

export default EssenceLogo;