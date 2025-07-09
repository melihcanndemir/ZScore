import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIntlayer } from "react-intlayer";
import { useTextStore } from "../store/textStore";

/**
 * Formats a date for display
 */
const formatDate = (date: Date): string => {
  return new Date(date).toLocaleString();
};

/**
 * HistoryPanel component to display past analyses
 */
const HistoryPanel: React.FC = () => {
  const content = useIntlayer("app");
  const { history, setText, clearHistory, removeHistoryItem } = useTextStore();
  const [isOpen, setIsOpen] = useState(false);

  // If no history, don't render
  if (history.length === 0) return null;

  return (
    <div className="max-w-3xl mx-auto mt-6" id="history">
      <div className="flex justify-between items-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-sm flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-4 w-4 transition-transform ${
              isOpen ? "rotate-90" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
          {content.history.title} ({history.length})
        </button>

        <button
          onClick={clearHistory}
          className="text-xs text-gray-500 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400"
        >
          {content.history.clearButton}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-2 space-y-2 max-h-96 overflow-y-auto pr-1">
              {history.map((item) => (
                <motion.div
                  key={item.id}
                  className="card hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-gray-900 transition-shadow"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                >
                  <div className="flex justify-between">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {content.history.timestamp}{" "}
                      {formatDate(item.result.timestamp)}
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setText(item.result.text)}
                        className="text-xs text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300"
                        title={content.history.loadTooltip}
                      >
                        {content.textInput.loadText}
                      </button>
                      <button
                        onClick={() => removeHistoryItem(item.id)}
                        className="text-xs text-gray-500 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400"
                        title={content.history.removeTooltip}
                      >
                        {content.textInput.removeText}
                      </button>
                    </div>
                  </div>

                  <div className="mt-2">
                    <p className="text-sm font-medium truncate dark:text-gray-300">
                      {item.result.text.substring(0, 50)}
                      {item.result.text.length > 50 ? "..." : ""}
                    </p>
                    <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">
                          {content.results.wordCount}:
                        </span>{" "}
                        <span className="dark:text-gray-300">
                          {item.result.wordCount}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">
                          {content.results.uniqueWords}:
                        </span>{" "}
                        <span className="dark:text-gray-300">
                          {item.result.uniqueWordCount}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">
                          {content.results.lexicalDiversity}:
                        </span>{" "}
                        <span className="dark:text-gray-300">
                          {item.result.lexicalDiversity.toFixed(4)}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">
                          {content.results.shannonEntropy}:
                        </span>{" "}
                        <span className="dark:text-gray-300">
                          {item.result.shannonEntropy.toFixed(4)} bits/word
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HistoryPanel;
