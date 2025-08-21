import React from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Package, Truck, CreditCard, HelpCircle, Mail } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext'; // Importar useLanguage

const ReturnPolicyPage = () => {
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
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{t.returnPolicyPage.title}</h1>
          <p className="text-gray-600">
            {t.returnPolicyPage.lastUpdated}: {new Date().toLocaleDateString()}
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
                <RotateCcw className="text-pink-600" size={24} />
              </div>
              <h2 className="text-2xl font-bold m-0">{t.returnPolicyPage.title}</h2>
            </div>
            
            <p>
              {t.returnPolicyPage.intro}
            </p>
            
            <div className="flex items-center gap-3 mb-6 mt-10">
              <div className="bg-pink-100 p-3 rounded-full">
                <Package className="text-pink-600" size={24} />
              </div>
              <h2 className="text-2xl font-bold m-0">{t.returnPolicyPage.conditionsTitle}</h2>
            </div>
            
            <p>
              {t.returnPolicyPage.conditionsTitle}
            </p>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">{t.returnPolicyPage.notReturnable}:</h3>
            
            <ul className="list-disc pl-6 space-y-2">
              <li>{t.returnPolicyPage.brokenSeals}</li>
              <li>{t.returnPolicyPage.perishable}</li>
              <li>{t.returnPolicyPage.intimate}</li>
              <li>{t.returnPolicyPage.customized}</li>
              <li>{t.returnPolicyPage.giftCards}</li>
              <li>{t.returnPolicyPage.saleItems}</li>
            </ul>
            
            <p className="mt-4">
              {t.returnPolicyPage.proofOfPurchase}
            </p>
            
            <p>
              {t.returnPolicyPage.noManufacturerReturn}
            </p>
            
            <div className="flex items-center gap-3 mb-6 mt-10">
              <div className="bg-pink-100 p-3 rounded-full">
                <Truck className="text-pink-600" size={24} />
              </div>
              <h2 className="text-2xl font-bold m-0">{t.returnPolicyPage.processTitle}</h2>
            </div>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">{t.returnPolicyPage.step1Title}</h3>
            
            <p>
              {t.returnPolicyPage.contactUsVia}
            </p>
            
            <ul className="list-disc pl-6 space-y-2">
              <li>{t.returnPolicyPage.emailContact}</li>
              <li>{t.returnPolicyPage.phoneContact}</li>
              <li>{t.returnPolicyPage.contactForm}</li>
            </ul>
            
            <p className="mt-4">
              {t.returnPolicyPage.provideInfo}
            </p>
            
            <ul className="list-disc pl-6 space-y-2">
              <li>{t.returnPolicyPage.orderNumber}</li>
              <li>{t.returnPolicyPage.productDetails}</li>
              <li>{t.returnPolicyPage.returnReason}</li>
              <li>{t.returnPolicyPage.refundPreference}</li>
            </ul>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">{t.returnPolicyPage.step2Title}</h3>
            
            <p>
              {t.returnPolicyPage.shippingInstructions}
            </p>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">{t.returnPolicyPage.step3Title}</h3>
            
            <p>
              {t.returnPolicyPage.inspectionDetails}
            </p>
            
            <div className="flex items-center gap-3 mb-6 mt-10">
              <div className="bg-pink-100 p-3 rounded-full">
                <CreditCard className="text-pink-600" size={24} />
              </div>
              <h2 className="text-2xl font-bold m-0">{t.returnPolicyPage.refundsTitle}</h2>
            </div>
            
            <p>
              {t.returnPolicyPage.refundProcess}
            </p>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">{t.returnPolicyPage.partialRefunds}</h3>
            
            <p>
              {t.returnPolicyPage.partialRefundConditions}
            </p>
            
            <ul className="list-disc pl-6 space-y-2">
              <li>{t.returnPolicyPage.usedProducts}</li>
              <li>{t.returnPolicyPage.damagedMissing}</li>
              <li>{t.returnPolicyPage.lateReturns}</li>
            </ul>
            
            <div className="flex items-center gap-3 mb-6 mt-10">
              <div className="bg-pink-100 p-3 rounded-full">
                <Truck className="text-pink-600" size={24} />
              </div>
              <h2 className="text-2xl font-bold m-0">{t.returnPolicyPage.shippingReturnsTitle}</h2>
            </div>
            
            <p>
              {t.returnPolicyPage.shippingCostsResponsibility}
            </p>
            
            <p>
              {t.returnPolicyPage.shippingDeduction}
            </p>
            
            <p>
              {t.returnPolicyPage.shippingTimeVaries}
            </p>
            
            <div className="flex items-center gap-3 mb-6 mt-10">
              <div className="bg-pink-100 p-3 rounded-full">
                <HelpCircle className="text-pink-600" size={24} />
              </div>
              <h2 className="text-2xl font-bold m-0">{t.returnPolicyPage.faqTitle}</h2>
            </div>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">{t.returnPolicyPage.faqQ1}</h3>
            
            <p>
              {t.returnPolicyPage.faqA1}
            </p>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">{t.returnPolicyPage.faqQ2}</h3>
            
            <p>
              {t.returnPolicyPage.faqA2}
            </p>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">{t.returnPolicyPage.faqQ3}</h3>
            
            <p>
              {t.returnPolicyPage.faqA3}
            </p>
            
            <div className="flex items-center gap-3 mb-6 mt-10">
              <div className="bg-pink-100 p-3 rounded-full">
                <Mail className="text-pink-600" size={24} />
              </div>
              <h2 className="text-2xl font-bold m-0">{t.returnPolicyPage.contactUsFooter}</h2>
            </div>
            
            <p>
              {t.returnPolicyPage.contactUsPolicy}
            </p>
            
            <ul className="list-disc pl-6 space-y-2">
              <li>{t.returnPolicyPage.contactEmail}</li>
              <li>{t.returnPolicyPage.contactPhone}</li>
              <li>{t.returnPolicyPage.contactAddress}</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ReturnPolicyPage;