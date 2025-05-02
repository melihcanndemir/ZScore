import React from "react";

/**
 * Footer component with information and links
 */
const Footer: React.FC = () => {
  return (
    <footer className="py-6 mt-12 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
              Shannon Entropy Calculator
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              A tool for calculating information entropy and lexical diversity
              metrics
            </p>
          </div>

          <div className="text-sm text-gray-600 dark:text-gray-400" id="about">
            <div className="mb-2">
              <h3 className="font-medium text-gray-900 dark:text-gray-100">
                About Shannon Entropy
              </h3>
              <p>
                Shannon entropy quantifies the amount of information or
                uncertainty in a variable's possible outcomes. It was introduced
                by Claude Shannon in his 1948 paper "A Mathematical Theory of
                Communication."
              </p>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 dark:text-gray-100">
                Formula
              </h3>
              <p className="font-mono">H(X) = -Σ p(x) log₂ p(x)</p>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700 text-center text-xs text-gray-500 dark:text-gray-500">
          © {new Date().getFullYear()} Melih Can Demir. Crafted with entropy,
          purpose, and a whisper of meaning. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
