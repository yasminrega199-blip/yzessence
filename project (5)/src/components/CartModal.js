import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Trash2, Minus, Plus, ArrowRight, Wallet } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const CartModal = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleProceedToCheckout = () => {
    onClose();
    if (cart && cart.length > 0) {
      navigate('/checkout');
    } else {
      console.log("El carrito está vacío, no se puede proceder al pago.");
    }
  };

  const handleCashOnDelivery = () => {
    onClose();
    if (cart && cart.length > 0) {
      // Aquí se simularía el proceso de pedido para pago contra entrega
      // En un caso real, esto enviaría el pedido al backend con el método COD
      alert("¡Pedido realizado con Pago Contra Entrega! Nos pondremos en contacto contigo pronto.");
      clearCart(); // Vaciar el carrito después de "realizar" el pedido
      navigate('/'); // Redirigir a la página de inicio o a una página de confirmación
    } else {
      console.log("El carrito está vacío, no se puede realizar el pedido.");
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, y: "100vh" },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } },
    exit: { opacity: 0, y: "100vh", transition: { duration: 0.3 } },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const isCartEmpty = !cart || cart.length === 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={onClose}
          ></motion.div>

          <motion.div
            className="bg-white w-full max-w-md rounded-t-3xl shadow-2xl p-6 relative z-10 max-h-[80vh] flex flex-col"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <ShoppingCart className="text-pink-600" /> {t.cartModal.yourCart}
              </h2>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>

            {isCartEmpty ? (
              <div className="flex flex-col items-center justify-center flex-grow text-gray-500">
                <ShoppingCart size={64} className="mb-4 text-gray-300" />
                <p className="text-lg font-medium">{t.cartModal.emptyCart}</p>
                <p className="text-sm text-center mt-2">{t.cartModal.emptyCartMessage}</p>
              </div>
            ) : (
              <>
                <div className="flex-grow overflow-y-auto pr-2 -mr-2">
                  <ul className="space-y-4">
                    <AnimatePresence>
                      {cart.map(item => (
                        <motion.li
                          key={item.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ duration: 0.2 }}
                          className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg shadow-sm"
                        >
                          <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md border border-gray-200" />
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-800 text-base">{item.name}</h3>
                            <p className="text-sm text-gray-600">${item.price.toFixed(2)}</p>
                            <div className="flex items-center mt-2">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                                className="p-1 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <Minus size={16} />
                              </button>
                              <span className="mx-2 font-medium text-gray-800">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-1 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300"
                              >
                                <Plus size={16} />
                              </button>
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="ml-auto text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100 transition-colors"
                              >
                                <Trash2 size={20} />
                              </button>
                            </div>
                          </div>
                        </motion.li>
                      ))}
                    </AnimatePresence>
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold text-gray-700">{t.cartModal.total}:</span>
                    <span className="text-2xl font-bold text-pink-600">${getTotalPrice().toFixed(2)}</span>
                  </div>
                  {/* Botón de Pago Contra Entrega */}
                  <button
                    onClick={handleCashOnDelivery}
                    disabled={isCartEmpty}
                    className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-lg transition-all duration-300 mb-3 ${
                      isCartEmpty
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-pink-600 text-white hover:bg-pink-700 shadow-lg hover:shadow-xl'
                    }`}
                  >
                    <Wallet size={20} /> {t.cartModal.cashOnDelivery}
                  </button>
                  {/* Botón de Proceder al Pago */}
                  <button
                    onClick={handleProceedToCheckout}
                    disabled={isCartEmpty}
                    className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-lg transition-all duration-300 ${
                      isCartEmpty
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-pink-600 text-white hover:bg-pink-700 shadow-lg hover:shadow-xl'
                    }`}
                  >
                    {t.cartModal.proceedToCheckout} <ArrowRight size={20} />
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CartModal;