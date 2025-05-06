import React from "react";
import { useTranslation } from "react-i18next";

/**
 * Footer component with information and links
 */
const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="py-6 mt-12 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
              {t("footer.title")}
            </h2>
            <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
              {t("footer.description")}
            </p>
          </div>

          <div className="text-sm text-gray-700 dark:text-gray-300" id="about">
            <div className="mb-2">
              <h3 className="font-medium text-gray-900 dark:text-gray-100">
                {t("footer.about")}
              </h3>
              <p>{t("footer.aboutText")}</p>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 dark:text-gray-100">
                {t("footer.formula")}
              </h3>
              <p className="font-mono">H(X) = -Σ p(x) log₂ p(x)</p>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700 text-center text-xs text-gray-700 dark:text-gray-300">
          © {new Date().getFullYear()} Melih Can Demir. {t("footer.copyright")}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
