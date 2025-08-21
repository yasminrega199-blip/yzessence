import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Info, User, Globe, Share2, Gavel, Database, RefreshCcw, Mail } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext'; // Importar useLanguage

const PrivacyPolicyPage = () => {
  const { t } = useLanguage(); // Obtener las traducciones

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{t.privacyPolicyPage.title}</h1>
          <p className="text-gray-600">
            {t.privacyPolicyPage.lastUpdated}: {new Date().toLocaleDateString()}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl shadow-md p-8"
        >
          <div className="prose prose-lg max-w-none">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-pink-100 p-3 rounded-full">
                <Shield className="text-pink-600" size={24} />
              </div>
              <h2 className="text-2xl font-bold m-0">{t.privacyPolicyPage.title}</h2>
            </div>
            
            <p>
              {t.privacyPolicyPage.intro}
            </p>
            
            <div className="flex items-center gap-3 mb-6 mt-10">
              <div className="bg-pink-100 p-3 rounded-full">
                <Info className="text-pink-600" size={24} />
              </div>
              <h2 className="text-2xl font-bold m-0">{t.privacyPolicyPage.infoCollectionTitle}</h2>
            </div>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">{t.privacyPolicyPage.personalInfo}</h3>
            <p>{t.privacyPolicyPage.personalInfoDesc}</p>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">{t.privacyPolicyPage.usageInfo}</h3>
            <p>{t.privacyPolicyPage.usageInfoDesc}</p>
            
            <div className="flex items-center gap-3 mb-6 mt-10">
              <div className="bg-pink-100 p-3 rounded-full">
                <User className="text-pink-600" size={24} />
              </div>
              <h2 className="text-2xl font-bold m-0">{t.privacyPolicyPage.howWeUseInfoTitle}</h2>
            </div>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">{t.privacyPolicyPage.fulfillOrders}</h3>
            <p>{t.privacyPolicyPage.fulfillOrdersDesc}</p>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">{t.privacyPolicyPage.communicate}</h3>
            <p>{t.privacyPolicyPage.communicateDesc}</p>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">{t.privacyPolicyPage.improveSite}</h3>
            <p>{t.privacyPolicyPage.improveSiteDesc}</p>
            
            <div className="flex items-center gap-3 mb-6 mt-10">
              <div className="bg-pink-100 p-3 rounded-full">
                <Share2 className="text-pink-600" size={24} />
              </div>
              <h2 className="text-2xl font-bold m-0">{t.privacyPolicyPage.sharingInfoTitle}</h2>
            </div>
            <p>{t.privacyPolicyPage.thirdParties}</p>
            
            <div className="flex items-center gap-3 mb-6 mt-10">
              <div className="bg-pink-100 p-3 rounded-full">
                <Gavel className="text-pink-600" size={24} />
              </div>
              <h2 className="text-2xl font-bold m-0">{t.privacyPolicyPage.yourRightsTitle}</h2>
            </div>
            <p>{t.privacyPolicyPage.gdpr}</p>
            
            <div className="flex items-center gap-3 mb-6 mt-10">
              <div className="bg-pink-100 p-3 rounded-full">
                <Database className="text-pink-600" size={24} />
              </div>
              <h2 className="text-2xl font-bold m-0">{t.privacyPolicyPage.dataRetention}</h2>
            </div>
            <p>{t.privacyPolicyPage.dataRetentionDesc}</p>
            
            <div className="flex items-center gap-3 mb-6 mt-10">
              <div className="bg-pink-100 p-3 rounded-full">
                <RefreshCcw className="text-pink-600" size={24} />
              </div>
              <h2 className="text-2xl font-bold m-0">{t.privacyPolicyPage.changesPolicyTitle}</h2>
            </div>
            <p>{t.privacyPolicyPage.changesPolicyDesc}</p>
            
            <div className="flex items-center gap-3 mb-6 mt-10">
              <div className="bg-pink-100 p-3 rounded-full">
                <Mail className="text-pink-600" size={24} />
              </div>
              <h2 className="text-2xl font-bold m-0">{t.privacyPolicyPage.contactUsTitle}</h2>
            </div>
            <p>{t.privacyPolicyPage.contactUsDesc}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;