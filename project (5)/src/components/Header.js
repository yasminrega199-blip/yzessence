import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingCart, Menu, X, Search, ChevronDown, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CartModal from './CartModal';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import YZEssenceLogo from './YZEssenceLogo'; // Importar el nuevo componente del logo

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
  const { cart } = useCart();
  const { t } = useLanguage();

  const totalItems = Array.isArray(cart) ? cart.reduce((sum, item) => sum + item.quantity, 0) : 0;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsProductsDropdownOpen(false);
  };

  const toggleCartModal = () => {
    setIsCartModalOpen(!isCartModalOpen);
  };

  const handleProductsDropdownToggle = () => {
    setIsProductsDropdownOpen((prev) => !prev); // Alternar el estado al hacer clic
  };

  const handleProductsDropdownClose = () => {
    setIsProductsDropdownOpen(false);
  };

  const navLinks = [
    { name: t.header.home, path: '/' },
    {
      name: t.header.products,
      path: '/products', // Mantener el path general de productos
      isDropdown: true,
      dropdownItems: [
        { name: t.header.allProducts, path: '/products', description: '' },
        { name: t.header.hotSales, path: '/hot-sales', icon: Flame, description: '' }, // Añadir icono de fuego
        { name: t.home.makeup, path: '/products/maquillaje', description: t.home.makeupDesc },
        { name: t.home.skinCare, path: '/products/cuidado-piel', description: t.home.skinCareDesc },
        { name: t.home.fragrances, path: '/products/fragancias', description: t.home.fragrancesDesc },
      ],
    },
    { name: t.header.contact, path: '/contact' },
    { name: t.header.policies, path: '/policies' },
  ];

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, transition: { duration: 0.2 } },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Nuevo Logo YZEssence */}
        <Link to="/" className="flex items-center">
          <YZEssenceLogo />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) =>
            link.isDropdown ? (
              <div key={link.name} className="relative">
                <button
                  className="text-gray-600 hover:text-pink-600 transition-colors duration-300 flex items-center"
                  onClick={handleProductsDropdownToggle}
                >
                  {link.name} <ChevronDown size={16} className="ml-1" />
                </button>
                <AnimatePresence>
                  {isProductsDropdownOpen && (
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={dropdownVariants}
                      className="absolute top-full left-0 mt-2 w-64 bg-white rounded-md shadow-lg py-1 z-50"
                    >
                      {link.dropdownItems.map((item) => (
                        <Link
                          key={item.name}
                          to={item.path}
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                          onClick={handleProductsDropdownClose}
                        >
                          <span className="font-semibold flex items-center">
                            {item.icon && (
                              <motion.span
                                initial={{ scale: 1 }}
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                                className="mr-2"
                              >
                                <item.icon size={16} className="text-red-500" />
                              </motion.span>
                            )}
                            {item.name}
                          </span>
                          {item.description && <p className="text-xs text-gray-500">{item.description}</p>}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-gray-600 hover:text-pink-600 transition-colors duration-300 ${
                    isActive ? 'font-semibold text-pink-600' : ''
                  }`
                }
              >
                {link.name}
              </NavLink>
            )
          )}
        </nav>

        {/* Icons */}
        <div className="flex items-center space-x-4">
          <button className="text-gray-600 hover:text-pink-600 transition-colors duration-300">
            <Search size={24} />
          </button>
          <button
            onClick={toggleCartModal}
            className="relative text-gray-600 hover:text-pink-600 transition-colors duration-300"
          >
            <ShoppingCart size={24} />
            {totalItems > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
              >
                {totalItems}
              </motion.span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-600 hover:text-pink-600" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={{
              hidden: { x: '100%' },
              visible: { x: 0, transition: { type: 'spring', stiffness: 100, damping: 20 } },
            }}
            className="md:hidden fixed top-0 right-0 w-full h-full bg-white p-6 shadow-lg z-50 flex flex-col items-center pt-20"
          >
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-pink-600"
              onClick={toggleMobileMenu}
            >
              <X size={28} />
            </button>
            {navLinks.map((link) =>
              link.isDropdown ? (
                <div key={link.name} className="w-full text-center">
                  <button
                    className="text-gray-800 text-xl py-3 flex items-center justify-center w-full hover:text-pink-600 transition-colors duration-300"
                    onClick={handleProductsDropdownToggle}
                  >
                    {link.name} <ChevronDown size={16} className="ml-1" />
                  </button>
                  <AnimatePresence>
                    {isProductsDropdownOpen && (
                      <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={dropdownVariants}
                        className="w-full bg-gray-50 rounded-md py-1"
                      >
                        {link.dropdownItems.map((item) => (
                          <Link
                            key={item.name}
                            to={item.path}
                            className="block px-4 py-2 text-gray-800 hover:bg-gray-100 text-lg"
                            onClick={closeMobileMenu}
                          >
                            <span className="font-semibold flex items-center">
                              {item.icon && (
                                <motion.span
                                  initial={{ scale: 1 }}
                                  animate={{ scale: [1, 1.2, 1] }}
                                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                                  className="mr-2"
                                >
                                  <item.icon size={16} className="text-red-500" />
                                </motion.span>
                              )}
                              {item.name}
                            </span>
                            {item.description && <p className="text-sm text-gray-500">{item.description}</p>}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-gray-800 text-xl py-3 hover:text-pink-600 transition-colors duration-300 ${
                      isActive ? 'font-semibold text-pink-600' : ''
                    }`
                  }
                  onClick={closeMobileMenu}
                >
                  {link.name}
                </NavLink>
              )
            )}
          </motion.nav>
        )}
      </AnimatePresence>

      <CartModal isOpen={isCartModalOpen} onClose={toggleCartModal} />
    </header>
  );
};

export default Header;