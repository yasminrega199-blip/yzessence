import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext'; // Importar useLanguage

const Footer = () => {
  const { t } = useLanguage(); // Obtener las traducciones

  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className="bg-gray-800 text-white py-12 mt-auto"
    >
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About Us */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-pink-400">{t.footer.aboutUsTitle}</h3>
          <p className="text-gray-300 text-sm">
            {t.footer.aboutUsDesc}
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-pink-400">{t.footer.quickLinks}</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="text-gray-300 hover:text-white transition-colors text-sm">
                {t.footer.home}
              </Link>
            </li>
            <li>
              <Link to="/products" className="text-gray-300 hover:text-white transition-colors text-sm">
                {t.footer.products}
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-gray-300 hover:text-white transition-colors text-sm">
                {t.footer.contact}
              </Link>
            </li>
            <li>
              <Link to="/privacy-policy" className="text-gray-300 hover:text-white transition-colors text-sm">
                {t.footer.privacyPolicy}
              </Link>
            </li>
            <li>
              <Link to="/return-policy" className="text-gray-300 hover:text-white transition-colors text-sm">
                {t.footer.returnPolicy}
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-pink-400">{t.footer.contactUsTitle}</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li className="flex items-center gap-2">
              <Mail size={18} className="text-pink-300" />
              <span>{t.footer.email}</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={18} className="text-pink-300" />
              <span>{t.footer.phone}</span>
            </li>
            <li className="flex items-start gap-2">
              <MapPin size={18} className="text-pink-300 mt-1" />
              <span>{t.footer.address}</span>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-pink-400">{t.footer.followUs}</h3>
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
              <Facebook size={24} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
              <Instagram size={24} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
              <Twitter size={24} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
        <p>&copy; {new Date().getFullYear()} {t.footer.aboutUsTitle}. {t.footer.copyright}</p>
      </div>
    </motion.footer>
  );
};

export default Footer;