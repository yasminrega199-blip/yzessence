import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Filter, ShoppingCart, Star, MessageSquareText } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

// Datos de productos de ejemplo (¡en un proyecto real, esto vendría de una API!)
export const productsData = [
  // Cuidado de la Piel (5 productos)
  {
    id: '1000267',
    name: 'DR. C. TUNA AQUA HYDRATING CREAM',
    description: 'Crema hidratante intensiva que proporciona una hidratación profunda y duradera para una piel suave y radiante.',
    price: 56.00,
    image: 'https://4tsix0yujj.ufs.sh/f/2vMRHqOYUHc0QiuuFhQiykWjlXTqU1cwIADob6V2r5N0P3Rp',
    category: 'cuidado-piel',
    rating: 4.97,
    reviews: 172,
    benefits: [
      'Hidratación profunda y duradera',
      'Piel suave y radiante',
      'Fórmula ligera y de rápida absorción',
      'Ideal para todo tipo de piel',
    ],
    usage: 'Aplicar sobre el rostro y cuello limpios por la mañana y por la noche, masajeando suavemente hasta su completa absorción.',
    customerTestimonials: [
      { id: 1, name: 'Laura S.', text: '¡Esta crema es increíble! Mi piel se siente hidratada todo el día y se ve mucho más luminosa. ¡La recomiendo totalmente!', rating: 5 },
      { id: 2, name: 'Pedro G.', text: 'Soy de piel sensible y esta crema no me ha causado ninguna irritación. Se absorbe muy rápido y deja la piel fresca.', rating: 5 },
    ],
  },
  {
    id: '1',
    name: 'DR. C. TUNA CALENDULA OIL CREAM',
    description: 'Crema facial y corporal con aceite de caléndula. Hidrata y calma la piel sensible.',
    price: 15.99,
    image: 'https://4tsix0yujj.ufs.sh/f/2vMRHqOYUHc0dHfZX9GmOcYyX10bjsZMu7Wi9At5EN3G4gTf',
    category: 'cuidado-piel',
    rating: 4.7,
    reviews: 250,
    benefits: [
      'Hidratación profunda',
      'Calma la piel sensible',
      'Ideal para rostro y cuerpo',
      'Con aceite de caléndula natural',
    ],
    usage: 'Aplicar generosamente sobre la piel limpia y seca, masajeando suavemente hasta su completa absorción. Usar diariamente.',
    customerTestimonials: [
      { id: 1, name: 'Ana G.', text: '¡Esta crema es maravillosa! Mi piel sensible se siente mucho más calmada e hidratada. La uso todos los días.', rating: 5 },
      { id: 2, name: 'Sofía M.', text: 'Excelente para la piel seca. Se absorbe rápido y no deja sensación grasosa. ¡La recomiendo!', rating: 4 },
    ],
  },
  {
    id: '3',
    name: 'DR. C. TUNA CALENDULA OIL FACE WASH',
    description: 'Limpiador facial suave con aceite de caléndula. Ideal para pieles delicadas.',
    price: 10.00,
    image: 'https://4tsix0yujj.ufs.sh/f/2vMRHqOYUHc0dHfZX9GmOcYyX10bjsZMu7Wi9At5EN3G4gTf',
    category: 'cuidado-piel',
    rating: 4.5,
    reviews: 100,
    benefits: [
      'Limpieza suave y efectiva',
      'No reseca la piel',
      'Calma y refresca',
      'Fórmula sin sulfatos',
    ],
    usage: 'Aplicar sobre el rostro húmedo, masajear suavemente y enjuagar con abundante agua. Usar por la mañana y por la noche.',
    customerTestimonials: [
      { id: 4, name: 'Carlos R.', text: 'Mi piel sensible reacciona muy bien a este limpiador. La deja limpia y sin tirantez.', rating: 4 },
    ],
  },
  {
    id: '11',
    name: 'DR. C. TUNA TEA TREE OIL SOS SERUM',
    description: 'Serum concentrado de árbol de té para imperfecciones y brotes.',
    price: 13.00,
    image: 'https://4tsix0yujj.ufs.sh/f/2vMRHqOYUHc0J1KHSlipYIkKhaEN0eCX7zGogwrU3sn8TcHm',
    category: 'cuidado-piel',
    rating: 4.8,
    reviews: 200,
    benefits: [
      'Reduce imperfecciones',
      'Controla el exceso de grasa',
      'Calma la piel irritada',
      'Fórmula de rápida absorción',
    ],
    usage: 'Aplicar una pequeña cantidad directamente sobre las imperfecciones o en las zonas afectadas. Usar por la mañana y por la noche.',
    customerTestimonials: [
      { id: 5, name: 'Andrea P.', text: 'Este serum es mágico para mis brotes. Los seca rápidamente y no deja marcas.', rating: 5 },
    ],
  },
  {
    id: '13',
    name: 'DR. C. TUNA ALOE VERA GEL',
    description: 'Gel refrescante de aloe vera. Calma e hidrata la piel irritada o quemada por el sol.',
    price: 9.00,
    image: 'https://4tsix0yujj.ufs.sh/f/2vMRHqOYUHc0J1KHSlipYIkKhaEN0eCX7zGogwrU3sn8TcHm',
    category: 'cuidado-piel',
    rating: 4.9,
    reviews: 300,
    benefits: [
      'Calma y refresca la piel',
      'Hidratación intensa',
      'Alivia quemaduras solares e irritaciones',
      'Textura ligera y no pegajosa',
    ],
    usage: 'Aplicar generosamente sobre la piel limpia y seca, especialmente después de la exposición al sol o para aliviar irritaciones.',
    customerTestimonials: [
      { id: 6, name: 'Roberto L.', text: 'Indispensable para el verano. Calma mi piel después de la playa al instante.', rating: 5 },
    ],
  },

  // Maquillaje (10 productos - 5 existentes + 5 nuevos)
  {
    id: 'M1',
    name: 'Base de Maquillaje Líquida VFX Pro',
    description: 'Base de alta cobertura con acabado mate natural. Ideal para todo tipo de piel.',
    price: 22.00,
    image: 'https://4tsix0yujj.ufs.sh/f/2vMRHqOYUHc0J1KHSlipYIkKhaEN0eCX7zGogwrU3sn8TcHm', // Nueva imagen para M1
    category: 'maquillaje',
    rating: 4.5,
    reviews: 180,
    benefits: [
      'Alta cobertura',
      'Acabado mate natural',
      'Larga duración',
      'Control de brillo',
    ],
    usage: 'Aplicar con brocha o esponja desde el centro del rostro hacia afuera.',
    customerTestimonials: [
      { id: 7, name: 'Camila V.', text: 'Cubre todo sin sentirse pesada. ¡Mi base favorita!', rating: 5 },
    ],
  },
  {
    id: 'M2',
    name: 'Máscara de Pestañas Zen',
    description: 'Alarga y da volumen a tus pestañas sin grumos. Fórmula resistente al agua.',
    price: 14.00,
    image: 'https://4tsix0yujj.ufs.sh/f/2vMRHqOYUHc0dpR5ezGmOcYyX10bjsZMu7Wi9At5EN3G4gTf',
    category: 'maquillaje',
    rating: 4.7,
    reviews: 210,
    benefits: [
      'Pestañas más largas y voluminosas',
      'Sin grumos',
      'Resistente al agua',
      'Fácil de aplicar',
    ],
    usage: 'Aplicar desde la raíz hasta las puntas de las pestañas con movimientos en zigzag.',
    customerTestimonials: [
      { id: 8, name: 'Lucía G.', text: 'Deja mis pestañas espectaculares y no se corre. ¡Impresionante!', rating: 5 },
    ],
  },
  {
    id: 'M3',
    name: 'Labial Mate Líquido Kiss Me',
    description: 'Color intenso y duradero con acabado mate. No transfiere.',
    price: 10.00,
    image: 'https://4tsix0yujj.ufs.sh/f/2vMRHqOYUHc0dpR5ezGmOcYyX10bjsZMu7Wi9At5EN3G4gTf',
    category: 'maquillaje',
    rating: 4.6,
    reviews: 150,
    benefits: [
      'Color vibrante y duradero',
      'Acabado mate perfecto',
      'No transfiere',
      'Confortable en los labios',
    ],
    usage: 'Aplicar una capa uniforme sobre los labios limpios y secos.',
    customerTestimonials: [
      { id: 9, name: 'Sofía P.', text: 'Los colores son hermosos y duran todo el día. ¡Me encantan!', rating: 5 },
    ],
  },
  {
    id: 'M4',
    name: 'Paleta de Sombras Nude Look',
    description: '12 tonos neutros y versátiles para looks de día y noche.',
    price: 28.00,
    image: 'https://4tsix0yujj.ufs.sh/f/2vMRHqOYUHc0dpR5ezGmOcYyX10bjsZMu7Wi9At5EN3G4gTf',
    category: 'maquillaje',
    rating: 4.8,
    reviews: 190,
    benefits: [
      'Variedad de tonos neutros',
      'Alta pigmentación',
      'Fácil de difuminar',
      'Ideal para looks naturales y sofisticados',
    ],
    usage: 'Aplicar con brocha sobre los párpados. Combinar tonos para crear diferentes looks.',
    customerTestimonials: [
      { id: 10, name: 'Mariana R.', text: 'La paleta perfecta para el día a día y para ocasiones especiales. Los tonos son preciosos.', rating: 5 },
    ],
  },
  {
    id: 'M5',
    name: 'Delineador de Ojos Líquido Precision',
    description: 'Punta fina para un trazo preciso y color negro intenso. Larga duración.',
    price: 9.00,
    image: 'https://4tsix0yujj.ufs.sh/f/2vMRHqOYUHc0dpR5ezGmOcYyX10bjsZMu7Wi9At5EN3G4gTf',
    category: 'maquillaje',
    rating: 4.4,
    reviews: 110,
    benefits: [
      'Trazo preciso y definido',
      'Color negro intenso',
      'Larga duración',
      'Resistente al agua',
    ],
    usage: 'Delinear el párpado superior a lo largo de la línea de las pestañas.',
    customerTestimonials: [
      { id: 11, name: 'Valeria C.', text: 'Fácil de usar y el color es súper intenso. Dura todo el día sin correrse.', rating: 4 },
    ],
  },
  // Nuevos productos de Maquillaje
  {
    id: 'M6',
    name: 'Corrector Líquido HD',
    description: 'Corrector de alta definición que cubre imperfecciones y ojeras sin marcar líneas finas.',
    price: 18.00,
    image: 'https://4tsix0yujj.ufs.sh/f/2vMRHqOYUHc0dpR5ezGmOcYyX10bjsZMu7Wi9At5EN3G4gTf', // Placeholder
    category: 'maquillaje',
    rating: 4.7,
    reviews: 160,
    benefits: [
      'Cobertura completa',
      'Acabado natural',
      'No se cuartea',
      'Ilumina la mirada',
    ],
    usage: 'Aplicar directamente sobre las imperfecciones o debajo de los ojos y difuminar con el dedo o una esponja.',
    customerTestimonials: [
      { id: 12, name: 'Andrea L.', text: 'Cubre todo y se ve muy natural. ¡Me encanta!', rating: 5 },
    ],
  },
  {
    id: 'M7',
    name: 'Polvo Compacto Mineral',
    description: 'Polvo ligero que sella el maquillaje y controla el brillo, con ingredientes minerales.',
    price: 20.00,
    image: 'https://4tsix0yujj.ufs.sh/f/2vMRHqOYUHc0dpR5ezGmOcYyX10bjsZMu7Wi9At5EN3G4gTf', // Placeholder
    category: 'maquillaje',
    rating: 4.6,
    reviews: 140,
    benefits: [
      'Control de brillo',
      'Acabado sedoso',
      'Fórmula mineral',
      'No obstruye los poros',
    ],
    usage: 'Aplicar con brocha sobre todo el rostro después de la base.',
    customerTestimonials: [
      { id: 13, name: 'Carla P.', text: 'Deja mi piel sin brillo y suave. Perfecto para retoques.', rating: 4 },
    ],
  },
  {
    id: 'M8',
    name: 'Rubor en Crema Glow',
    description: 'Rubor cremoso que aporta un toque de color natural y un brillo saludable a las mejillas.',
    price: 15.00,
    image: 'https://4tsix0yujj.ufs.sh/f/2vMRHqOYUHc0dpR5ezGmOcYyX10bjsZMu7Wi9At5EN3G4gTf', // Placeholder
    category: 'maquillaje',
    rating: 4.8,
    reviews: 120,
    benefits: [
      'Color natural',
      'Acabado luminoso',
      'Fácil de difuminar',
      'Larga duración',
    ],
    usage: 'Aplicar con los dedos o una brocha sobre las manzanas de las mejillas y difuminar.',
    customerTestimonials: [
      { id: 14, name: 'Elena R.', text: 'El color es precioso y el brillo es sutil. Me encanta cómo se ve.', rating: 5 },
    ],
  },
  {
    id: 'M9',
    name: 'Set de Brochas Esenciales',
    description: 'Set de 5 brochas esenciales para un maquillaje completo y profesional.',
    price: 35.00,
    image: 'https://4tsix0yujj.ufs.sh/f/2vMRHqOYUHc0dpR5ezGmOcYyX10bjsZMu7Wi9At5EN3G4gTf', // Placeholder
    category: 'maquillaje',
    rating: 4.9,
    reviews: 200,
    benefits: [
      'Cerdas suaves y sintéticas',
      'Mango ergonómico',
      'Incluye brochas para rostro y ojos',
      'Fácil de limpiar',
    ],
    usage: 'Utilizar cada brocha según la función deseada para aplicar y difuminar productos de maquillaje.',
    customerTestimonials: [
      { id: 15, name: 'Sofía G.', text: 'Excelente calidad de brochas. Son muy suaves y aplican el maquillaje de maravilla.', rating: 5 },
    ],
  },
  {
    id: 'M10',
    name: 'Fijador de Maquillaje Long Lasting',
    description: 'Spray fijador que prolonga la duración del maquillaje y refresca la piel.',
    price: 12.00,
    image: 'https://4tsix0yujj.ufs.sh/f/2vMRHqOYUHc0dpR5ezGmOcYyX10bjsZMu7Wi9At5EN3G4gTf', // Placeholder
    category: 'maquillaje',
    rating: 4.5,
    reviews: 130,
    benefits: [
      'Prolonga la duración del maquillaje',
      'Acabado natural',
      'Refresca la piel',
      'Sin sensación pegajosa',
    ],
    usage: 'Rociar sobre el rostro a una distancia de 20-30 cm después de finalizar el maquillaje.',
    customerTestimonials: [
      { id: 16, name: 'Laura M.', text: 'Mi maquillaje dura mucho más con este fijador. ¡Lo recomiendo!', rating: 4 },
    ],
  },

  // Fragancias (5 productos)
  {
    id: '54',
    name: 'DR. C. TUNA PURE ROSE PERFUME',
    description: 'Perfume con aroma a rosas. Fragancia delicada y duradera.',
    price: 25.00,
    image: 'https://4tsix0yujj.ufs.sh/f/2vMRHqOYUHc0J1KHSlipYIkKhaEN0eCX7zGogwrU3sn8TcHm',
    category: 'fragancias',
    rating: 4.8,
    reviews: 150,
    benefits: [
      'Aroma floral delicado',
      'Larga duración',
      'Ideal para uso diario',
      'Sensación de frescura',
    ],
    usage: 'Aplicar en puntos de pulso como muñecas y cuello.',
    customerTestimonials: [
      { id: 12, name: 'Gabriela F.', text: 'Un aroma clásico y elegante. Recibo muchos cumplidos.', rating: 5 },
    ],
  },
  {
    id: 'F1',
    name: 'Perfume Signature for Her',
    description: 'Una fragancia elegante y sofisticada con notas florales y amaderadas.',
    price: 35.00,
    image: 'https://4tsix0yujj.ufs.sh/f/2vMRHqOYUHc0J1KHSlipYIkKhaEN0eCX7zGogwrU3sn8TcHm',
    category: 'fragancias',
    rating: 4.7,
    reviews: 120,
    benefits: [
      'Fragancia sofisticada',
      'Notas florales y amaderadas',
      'Perfecta para ocasiones especiales',
      'Aroma duradero',
    ],
    usage: 'Vaporizar sobre la piel a una distancia de 15-20 cm.',
    customerTestimonials: [
      { id: 13, name: 'Isabel M.', text: 'Mi perfume favorito para salir. Huele increíble y dura mucho.', rating: 5 },
    ],
  },
  {
    id: 'F2',
    name: 'Eau de Parfum Brave for Him',
    description: 'Aroma masculino y audaz con toques cítricos y especiados.',
    price: 30.00,
    image: 'https://4tsix0yujj.ufs.sh/f/2vMRHqOYUHc0J1KHSlipYIkKhaEN0eCX7zGogwrU3sn8TcHm',
    category: 'fragancias',
    rating: 4.6,
    reviews: 90,
    benefits: [
      'Aroma masculino y fresco',
      'Toques cítricos y especiados',
      'Ideal para el día a día',
      'Sensación de energía',
    ],
    usage: 'Aplicar en cuello y muñecas.',
    customerTestimonials: [
      { id: 14, name: 'Diego S.', text: 'Un perfume con carácter. Me gusta mucho para ir a trabajar.', rating: 4 },
    ],
  },
  {
    id: 'F3',
    name: 'Body Mist Fresh Breeze',
    description: 'Bruma corporal ligera y refrescante con aroma a brisa marina.',
    price: 15.00,
    image: 'https://4tsix0yujj.ufs.sh/f/2vMRHqOYUHc0J1KHSlipYIkKhaEN0eCX7zGogwrU3sn8TcHm',
    category: 'fragancias',
    rating: 4.4,
    reviews: 70,
    benefits: [
      'Sensación refrescante',
      'Aroma ligero a brisa marina',
      'Perfecta para después de la ducha',
      'Hidrata ligeramente la piel',
    ],
    usage: 'Vaporizar sobre todo el cuerpo después de la ducha o en cualquier momento del día.',
    customerTestimonials: [
      { id: 15, name: 'Paula T.', text: 'Me encanta para refrescarme en el gimnasio. Huele muy bien y no es pesado.', rating: 4 },
    ],
  },
  {
    id: 'F4',
    name: 'Perfume Secret Garden',
    description: 'Una fragancia dulce y misteriosa inspirada en un jardín secreto al anochecer.',
    price: 40.00,
    image: 'https://4tsix0yujj.ufs.sh/f/2vMRHqOYUHc0J1KHSlipYIkKhaEN0eCX7zGogwrU3sn8TcHm',
    category: 'fragancias',
    rating: 4.9,
    reviews: 180,
    benefits: [
      'Aroma dulce y enigmático',
      'Notas florales y amaderadas',
      'Ideal para la noche',
      'Fragancia única y memorable',
    ],
    usage: 'Aplicar en puntos de pulso para una mayor duración.',
    customerTestimonials: [
      { id: 16, name: 'Javier N.', text: 'Se lo regalé a mi esposa y le encantó. Es un aroma muy especial.', rating: 5 },
    ],
  },
];

const ProductsPage = () => {
  const { addToCart } = useCart();
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredProducts, setFilteredProducts] = useState(productsData);

  useEffect(() => {
    let tempProducts = productsData;

    // Filter by search term
    if (searchTerm) {
      tempProducts = tempProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    // La clave aquí es que si selectedCategory NO es 'all', filtramos de productsData
    // Si es 'all', y no hay searchTerm, entonces mostramos los primeros 5.
    if (selectedCategory !== 'all') {
      tempProducts = productsData.filter(
        (product) => product.category === selectedCategory
      );
    } else if (!searchTerm) { // Solo si selectedCategory es 'all' y no hay searchTerm
      tempProducts = productsData.slice(0, 5);
    }

    setFilteredProducts(tempProducts);
  }, [searchTerm, selectedCategory]);

  const categories = [
    { value: 'all', label: t.productsPage.all },
    { value: 'cuidado-piel', label: t.home.skinCare },
    { value: 'maquillaje', label: t.home.makeup },
    { value: 'fragancias', label: t.home.fragrances },
  ];

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const handleCashOnDeliveryProduct = (product) => {
    const phoneNumber = '5215512345678'; // Reemplaza con tu número de WhatsApp
    const message = t.productsPage.whatsappProductMessage
      .replace('{productName}', product.name)
      .replace('{productPrice}', product.price.toFixed(2));
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-50 py-12"
    >
      <div className="container mx-auto px-4">
        <motion.h1
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center text-gray-800 mb-10"
        >
          {t.productsPage.title}
        </motion.h1>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder={t.productsPage.searchPlaceholder}
              className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          </div>
          <div className="relative">
            <select
              className="appearance-none w-full md:w-auto px-4 py-3 pl-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-white pr-8"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            initial="hidden"
            animate="visible"
          >
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                whileHover={{ scale: 1.03, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
                whileTap={{ scale: 0.98 }}
                className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col"
              >
                {/* Toda la tarjeta es un Link */}
                <Link to={`/product/${product.id}`} className="block relative overflow-hidden flex-grow">
                  <motion.img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover transition-transform duration-300"
                    whileHover={{ scale: 1.1 }}
                  />
                  <div className="p-4"> {/* Contenido dentro del Link */}
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">{product.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{product.description}</p> {/* Descripción aquí */}
                    <div className="flex items-center mb-2">
                      <Star size={16} className="text-yellow-400 mr-1" fill="currentColor" />
                      <span className="text-sm text-gray-600">{product.rating} ({product.reviews})</span>
                    </div>
                    <p className="text-xl font-bold text-pink-600">${product.price.toFixed(2)}</p>
                  </div>
                </Link>
                {/* Botones fuera del Link para que solo ellos sean clicables para sus acciones */}
                <div className="p-4 pt-0 flex gap-2"> {/* Contenedor para los botones */}
                  <button
                    onClick={() => addToCart(product)}
                    className="flex-1 bg-pink-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-pink-700 transition-colors flex items-center justify-center gap-2 text-sm"
                  >
                    <ShoppingCart size={18} /> {t.productsPage.addToCart}
                  </button>
                  <button
                    onClick={() => handleCashOnDeliveryProduct(product)}
                    className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center justify-center gap-2 text-sm"
                  >
                    <MessageSquareText size={18} /> {t.productsPage.cashOnDelivery}
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-10 text-gray-600 text-lg"
          >
            {t.productsPage.noProductsFound}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ProductsPage;