import React from 'react';
import { motion } from 'framer-motion';

const ModernLogo = ({ size = 48, color1 = "#EC4899", color2 = "#8B5CF6" }) => {
  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100, damping: 10 } },
  };

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      variants={logoVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Fondo degradado sutil */}
      <defs>
        <linearGradient id="paint0_linear" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop stopColor={color1} stopOpacity="0.8" />
          <stop offset="1" stopColor={color2} stopOpacity="0.8" />
        </linearGradient>
      </defs>

      {/* Forma principal abstracta (ej. una "Y" estilizada o una gota) */}
      <motion.path
        d="M50 0L75 25L50 50L25 25L50 0Z"
        fill={`url(#paint0_linear)`}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />
      <motion.path
        d="M50 100L25 75L50 50L75 75L50 100Z"
        fill={`url(#paint0_linear)`}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
      />
      <motion.circle
        cx="50"
        cy="50"
        r="20"
        fill="white"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
      />
      <motion.path
        d="M50 35L60 50L50 65L40 50L50 35Z"
        fill={color1}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.8 }}
      />
    </motion.svg>
  );
};

export default ModernLogo;