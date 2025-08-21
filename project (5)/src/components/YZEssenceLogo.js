import React from 'react';
import { motion } from 'framer-motion';

const YZEssenceLogo = () => {
  const heartVariants = {
    hidden: { opacity: 0, y: 0, scale: 0 },
    visible: {
      opacity: [0, 1, 0.8, 0],
      y: [0, -20, -40, -60], // Subir y desaparecer
      scale: [0, 1, 1.2, 0],
      transition: {
        duration: 1.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className="relative flex items-center justify-center p-1 sm:p-2 md:p-3 rounded-full overflow-hidden" // Padding más pequeño
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Nube rosada de fondo */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full filter blur-lg opacity-70"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.7 }}
        transition={{ duration: 1, ease: "easeOut", repeat: Infinity, repeatType: "reverse" }}
      />

      {/* Corazones flotantes */}
      {[...Array(3)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute text-pink-500 text-lg" // Corazones más pequeños
          variants={heartVariants}
          initial="hidden"
          animate="visible"
          style={{
            left: `${20 + i * 20}%`, // Posición horizontal aleatoria
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          transition={{ ...heartVariants.visible.transition, delay: i * 0.5 }} // Retraso para cada corazón
        >
          ❤️
        </motion.span>
      ))}

      <motion.span
        className="relative text-xl sm:text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 z-10" // Texto más pequeño
        animate={{
          x: [0, -0.5, 0.5, -0.5, 0.5, 0], // Vibración más sutil
          y: [0, 0.5, -0.5, 0.5, -0.5, 0], // Vibración más sutil
          rotate: [0, 3, -3, 3, -3, 0], // Ligera inclinación más pronunciada
        }}
        transition={{
          repeat: Infinity,
          duration: 0.3, // Duración más corta para una vibración más rápida
          ease: "easeInOut",
          repeatDelay: 1, // Espera 1 segundo antes de repetir la vibración
        }}
      >
        YZ
      </motion.span>
      <motion.span
        className="relative text-xl sm:text-2xl md:text-3xl font-light text-gray-800 ml-0.5 sm:ml-1 z-10" // Texto más pequeño
        animate={{
          x: [0, 0.5, -0.5, 0.5, -0.5, 0], // Vibración más sutil
          y: [0, -0.5, 0.5, -0.5, 0.5, 0], // Vibración más sutil
          rotate: [0, -3, 3, -3, 3, 0], // Ligera inclinación más pronunciada
        }}
        transition={{
          repeat: Infinity,
          duration: 0.3, // Duración más corta para una vibración más rápida
          ease: "easeInOut",
          repeatDelay: 1, // Espera 1 segundo antes de repetir la vibración
        }}
      >
        Essence
      </motion.span>
    </motion.div>
  );
};

export default YZEssenceLogo;