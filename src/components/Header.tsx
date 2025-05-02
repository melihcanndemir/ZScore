import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

/**
 * Header component with app title and description
 */
const Header: React.FC = () => {
  const { t } = useTranslation();

  return (
    <motion.header
      className="py-6 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      id="calculator"
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="flex flex-col gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-primary-700 dark:text-primary-400 tracking-tight">
            {t("header.title")}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-3xl">
            {t("header.subtitle")}
          </p>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;
