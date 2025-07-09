import React from "react";
import { motion } from "framer-motion";
import { useIntlayer } from "react-intlayer";
import { useTextStore } from "../store/textStore";

/**
 * Text input component for entering and analyzing text
 */
const TextInput: React.FC = () => {
  const content = useIntlayer("app");
  // Get store state and actions
  const { currentText, setText, analyzeCurrentText, clearCurrentText } =
    useTextStore();

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    analyzeCurrentText();
  };

  return (
    <motion.div
      className="card max-w-3xl mx-auto mt-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        {content.textInput.title}
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="textInput" className="label">
            {content.textInput.label}
          </label>
          <textarea
            id="textInput"
            rows={6}
            placeholder={content.textInput.placeholder.value}
            className="input h-40 font-mono resize-y"
            value={currentText}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        <div className="flex gap-3 justify-end">
          <button
            type="button"
            className="btn-secondary"
            onClick={clearCurrentText}
            disabled={!currentText}
          >
            {content.textInput.clearButton}
          </button>

          <motion.button
            type="submit"
            className="btn-primary"
            disabled={!currentText.trim()}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {content.textInput.analyzeButton}
          </motion.button>
        </div>
      </form>

      {/* Sample text suggestions */}
      <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
          {content.textInput.examples}:
        </h3>
        <div className="flex flex-wrap gap-2">
          {[
            "Hello world",
            "Shannon entropy was introduced by Claude Shannon in 1948",
            "AAAAAAAA",
            "The quick brown fox jumps over the lazy dog",
          ].map((sample) => (
            <button
              key={sample}
              onClick={() => setText(sample)}
              className="text-sm px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 rounded-full transition-colors"
            >
              {sample.length > 20 ? `${sample.substring(0, 20)}...` : sample}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default TextInput;
