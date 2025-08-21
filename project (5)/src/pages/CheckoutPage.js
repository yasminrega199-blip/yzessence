import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, CreditCard, Truck, CheckCircle, ChevronRight, ChevronLeft, Wallet, Package, MapPin, User, Mail, Phone, Home, Building, Calendar, Lock, Info, DollarSign } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const CheckoutPage = ({ appliedPromotionCode }) => { // Recibir el código de promoción
  const { cart, getTotalPrice, clearCart } = useCart();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Shipping Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'República Dominicana', // Default and only option
    // Payment Method (COD ya no está aquí)
    paymentMethod: 'paypal', // Por defecto a PayPal si COD se maneja en el carrito
    // Card Details (if paymentMethod is card - not implemented for this version)
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvc: '',
  });
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);

  // Credenciales de PayPal (¡OJO! Esto es solo para demostración. NUNCA expongas claves secretas en el frontend en un entorno real)
  const PAYPAL_CLIENT_ID_SANDBOX = "AS2dnV6NnS60_DXB3UpG92Cljd28bPFzbFYzu8fFPTGWoAHNNuBGjZDJznjbVccPxxKhoO792dX7qrj4";
  const PAYPAL_CLIENT_SECRET_SANDBOX = "EKqm9qUPgofddky_jG4EbQzFenX2iPMAJYhy24hHorUb43iOtJJtNy-loGY3PdifzXdeMNusqZPQhIE9";
  // Para producción, usarías las claves "Live"

  useEffect(() => {
    // Si el carrito está vacío y no se ha realizado un pedido, redirigir a la página de productos.
    // Esto evita que la página de checkout se muestre vacía si se accede directamente o el carrito se vacía.
    if ((!cart || cart.length === 0) && !orderPlaced) {
      navigate('/products'); 
    }
  }, [cart, navigate, orderPlaced]);

  useEffect(() => {
    // Aplicar descuento si hay un código de promoción y es la primera vez que se carga la página de checkout
    if (appliedPromotionCode === 'BIENVENIDO10' && getTotalPrice() > 0 && discountAmount === 0) {
      const calculatedDiscount = getTotalPrice() * 0.10; // 10% de descuento
      setDiscountAmount(calculatedDiscount);
    }
  }, [appliedPromotionCode, getTotalPrice, discountAmount]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = t.checkoutPage.firstNameRequired;
    if (!formData.lastName.trim()) newErrors.lastName = t.checkoutPage.lastNameRequired;
    if (!formData.email.trim()) {
      newErrors.email = t.checkoutPage.emailRequired;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t.checkoutPage.invalidEmail;
    }
    if (!formData.phone.trim()) newErrors.phone = t.checkoutPage.phoneRequired;
    if (!formData.address.trim()) newErrors.address = t.checkoutPage.addressRequired;
    if (!formData.city.trim()) newErrors.city = t.checkoutPage.cityRequired;
    if (!formData.state.trim()) newErrors.state = t.checkoutPage.stateRequired;
    if (!formData.zipCode.trim()) newErrors.zipCode = t.checkoutPage.zipCodeRequired;
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (validateStep1()) {
        setStep(2);
      }
    } else if (step === 2) {
      setStep(3);
    }
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setOrderPlaced(true);
      clearCart(); // Clear cart after successful order
    }, 2000);
  };

  // Función para manejar el éxito del pago con PayPal (simulado)
  const onPayPalSuccess = (details, data) => {
    console.log('Pago de PayPal exitoso:', details, data);
    handlePlaceOrder(); // Procede a finalizar el pedido
  };

  const finalPrice = getTotalPrice() - discountAmount;

  if (orderPlaced) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-[calc(100vh-200px)] flex items-center justify-center bg-gray-50 py-12"
      >
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 text-center max-w-md w-full">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="w-24 h-24 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6"
          >
            <CheckCircle className="text-green-600 w-12 h-12" />
          </motion.div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{t.checkoutPage.orderSuccessTitle}</h2>
          <p className="text-gray-600 mb-6">
            {t.checkoutPage.orderSuccessMessage}
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors"
          >
            {t.checkoutPage.backToHome}
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center mb-10"
        >
          {t.checkoutPage.title}
        </motion.h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Checkout Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:w-2/3 bg-white rounded-xl shadow-md p-6 md:p-8"
          >
            {/* Progress Indicator */}
            <div className="flex justify-between items-center mb-8">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-pink-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                  1
                </div>
                <span className="text-sm mt-2 text-center hidden sm:block">{t.checkoutPage.shippingInfo}</span>
              </div>
              <div className={`flex-1 h-1 mx-2 ${step > 1 ? 'bg-pink-600' : 'bg-gray-200'}`}></div>
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 2 ? 'bg-pink-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                  2
                </div>
                <span className="text-sm mt-2 text-center hidden sm:block">{t.checkoutPage.paymentMethod}</span>
              </div>
              <div className={`flex-1 h-1 mx-2 ${step > 2 ? 'bg-pink-600' : 'bg-gray-200'}`}></div>
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 3 ? 'bg-pink-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                  3
                </div>
                <span className="text-sm mt-2 text-center hidden sm:block">{t.checkoutPage.orderConfirmation}</span>
              </div>
            </div>

            {/* Step 1: Shipping Information */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Truck className="text-pink-600" /> {t.checkoutPage.shippingInfo}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-gray-700 mb-2">{t.checkoutPage.firstName}</label>
                    <div className="relative">
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder={t.checkoutPage.firstName}
                      />
                      <User className="absolute left-3 top-3.5 text-gray-400" size={16} />
                    </div>
                    {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-gray-700 mb-2">{t.checkoutPage.lastName}</label>
                    <div className="relative">
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder={t.checkoutPage.lastName}
                      />
                      <User className="absolute left-3 top-3.5 text-gray-400" size={16} />
                    </div>
                    {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-700 mb-2">{t.checkoutPage.email}</label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder={t.checkoutPage.email}
                      />
                      <Mail className="absolute left-3 top-3.5 text-gray-400" size={16} />
                    </div>
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-gray-700 mb-2">{t.checkoutPage.phone}</label>
                    <div className="relative">
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder={t.checkoutPage.phone}
                      />
                      <Phone className="absolute left-3 top-3.5 text-gray-400" size={16} />
                    </div>
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="address" className="block text-gray-700 mb-2">{t.checkoutPage.address}</label>
                    <div className="relative">
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder={t.checkoutPage.address}
                      />
                      <Home className="absolute left-3 top-3.5 text-gray-400" size={16} />
                    </div>
                    {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="apartment" className="block text-gray-700 mb-2">{t.checkoutPage.apartment}</label>
                    <div className="relative">
                      <input
                        type="text"
                        id="apartment"
                        name="apartment"
                        value={formData.apartment}
                        onChange={handleChange}
                        className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                        placeholder={t.checkoutPage.apartment}
                      />
                      <Building className="absolute left-3 top-3.5 text-gray-400" size={16} />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="city" className="block text-gray-700 mb-2">{t.checkoutPage.city}</label>
                    <div className="relative">
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder={t.checkoutPage.city}
                      />
                      <MapPin className="absolute left-3 top-3.5 text-gray-400" size={16} />
                    </div>
                    {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-gray-700 mb-2">{t.checkoutPage.state}</label>
                    <div className="relative">
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 ${errors.state ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder={t.checkoutPage.state}
                      />
                      <MapPin className="absolute left-3 top-3.5 text-gray-400" size={16} />
                    </div>
                    {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                  </div>
                  <div>
                    <label htmlFor="zipCode" className="block text-gray-700 mb-2">{t.checkoutPage.zipCode}</label>
                    <div className="relative">
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 ${errors.zipCode ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder={t.checkoutPage.zipCode}
                      />
                      <MapPin className="absolute left-3 top-3.5 text-gray-400" size={16} />
                    </div>
                    {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="country" className="block text-gray-700 mb-2">{t.checkoutPage.country}</label>
                    <div className="relative">
                      <select
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 appearance-none bg-white"
                        disabled // Disable selection as it's fixed
                      >
                        <option value="República Dominicana">República Dominicana</option>
                      </select>
                      <MapPin className="absolute left-3 top-3.5 text-gray-400" size={16} />
                      <ChevronRight className="absolute right-3 top-3.5 text-gray-400 rotate-90" size={16} />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Payment Method */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <CreditCard className="text-pink-600" /> {t.checkoutPage.paymentMethod}
                </h2>
                <div className="space-y-4">
                  {/* PayPal Integration (Simulated) */}
                  <label
                    htmlFor="paypal"
                    className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all duration-200 ${formData.paymentMethod === 'paypal' ? 'border-pink-600 ring-2 ring-pink-200 bg-pink-50' : 'border-gray-300 hover:border-gray-400'}`}
                  >
                    <input
                      type="radio"
                      id="paypal"
                      name="paymentMethod"
                      value="paypal"
                      checked={formData.paymentMethod === 'paypal'}
                      onChange={handleChange}
                      className="form-radio h-5 w-5 text-pink-600"
                    />
                    <div className="ml-4 flex items-center justify-between w-full">
                      <span className="font-semibold text-gray-800">{t.checkoutPage.paypal}</span>
                      <img src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_74x46.jpg" alt="PayPal" className="h-6" />
                    </div>
                  </label>

                  {formData.paymentMethod === 'paypal' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg"
                    >
                      <p className="text-blue-800 text-sm mb-3">
                        {t.checkoutPage.paypalSimulated}
                      </p>
                      <button
                        onClick={() => onPayPalSuccess({ /* mock details */ }, { /* mock data */ })}
                        className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                      >
                        <img src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_74x46.jpg" alt="PayPal" className="h-5 mr-2" />
                        {t.checkoutPage.paypalSimulatedButton}
                      </button>
                      <p className="text-xs text-blue-700 mt-2">
                        Cliente ID (Sandbox): {PAYPAL_CLIENT_ID_SANDBOX.substring(0, 10)}...
                      </p>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Step 3: Order Confirmation */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <CheckCircle className="text-pink-600" /> {t.checkoutPage.orderConfirmation}
                </h2>
                <div className="space-y-6">
                  {/* Shipping Info Summary */}
                  <div className="border border-gray-200 rounded-lg p-5 bg-gray-50">
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                      <Truck className="text-pink-600" size={20} /> {t.checkoutPage.shippingAddress}
                    </h3>
                    <p className="text-gray-700">
                      {formData.firstName} {formData.lastName}<br />
                      {formData.address} {formData.apartment && `, ${formData.apartment}`}<br />
                      {formData.city}, {formData.state} {formData.zipCode}<br />
                      {formData.country}<br />
                      {formData.phone}<br />
                      {formData.email}
                    </p>
                  </div>

                  {/* Payment Method Summary */}
                  <div className="border border-gray-200 rounded-lg p-5 bg-gray-50">
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                      <CreditCard className="text-pink-600" size={20} /> {t.checkoutPage.paymentMethod}
                    </h3>
                    <p className="text-gray-700">
                      {formData.paymentMethod === 'cod' ? t.checkoutPage.cod : t.checkoutPage.paypal}
                    </p>
                  </div>

                  {/* Order Summary */}
                  <div className="border border-gray-200 rounded-lg p-5 bg-gray-50">
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                      <ShoppingCart className="text-pink-600" size={20} /> {t.checkoutPage.orderSummary}
                    </h3>
                    <ul className="space-y-3">
                      {cart && cart.map(item => (
                        <li key={item.id} className="flex justify-between items-center text-gray-700">
                          <span>{item.name} x {item.quantity}</span>
                          <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </li>
                      ))}
                      <li className="flex justify-between items-center font-bold text-lg border-t border-gray-200 pt-3 mt-3">
                        <span>{t.checkoutPage.total}</span>
                        <span>${finalPrice.toFixed(2)}</span> {/* Mostrar precio final con descuento */}
                      </li>
                      {discountAmount > 0 && (
                        <li className="flex justify-between items-center text-green-600 font-semibold text-sm">
                          <span>Descuento ({appliedPromotionCode}):</span>
                          <span>-${discountAmount.toFixed(2)}</span>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              {step > 1 && (
                <button
                  onClick={handlePrevStep}
                  className="flex items-center gap-2 px-5 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <ChevronLeft size={20} /> {t.checkoutPage.previous}
                </button>
              )}
              {step < 3 && (
                <button
                  onClick={handleNextStep}
                  className="flex items-center gap-2 px-5 py-3 rounded-lg bg-pink-600 text-white hover:bg-pink-700 transition-colors ml-auto"
                >
                  {t.checkoutPage.next} <ChevronRight size={20} />
                </button>
              )}
              {step === 3 && (
                <button
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ml-auto ${isProcessing ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700'}`}
                >
                  {isProcessing ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {t.checkoutPage.processing}
                    </>
                  ) : (
                    <>
                      <DollarSign size={20} /> {t.checkoutPage.placeOrder}
                    </>
                  )}
                </button>
              )}
            </div>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:w-1/3 bg-white rounded-xl shadow-md p-6 md:p-8 h-fit sticky top-8"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <ShoppingCart className="text-pink-600" /> {t.cartModal.yourCart}
            </h2>
            {(!cart || cart.length === 0) ? (
              <p className="text-gray-600">{t.cartModal.emptyCart}</p>
            ) : (
              <>
                <ul className="space-y-4 mb-6">
                  {cart.map(item => (
                    <li key={item.id} className="flex items-center gap-4 border-b border-gray-100 pb-4">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">{item.name}</h3>
                        <p className="text-sm text-gray-600">{t.cartModal.quantity}: {item.quantity}</p>
                      </div>
                      <span className="font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700">{t.checkoutPage.subtotal}:</span>
                    <span className="font-semibold text-gray-900">${getTotalPrice().toFixed(2)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between items-center mb-2 text-green-600 font-semibold">
                      <span>Descuento ({appliedPromotionCode}):</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-700">{t.checkoutPage.shipping}:</span>
                    <span className="font-semibold text-gray-900">{t.checkoutPage.free}</span>
                  </div>
                  <div className="flex justify-between items-center text-xl font-bold text-gray-900 border-t border-gray-200 pt-4">
                    <span>{t.checkoutPage.total}:</span>
                    <span>${finalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;