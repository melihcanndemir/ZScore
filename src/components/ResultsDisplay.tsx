import React from "react";
import { motion } from "framer-motion";
import { useIntlayer } from "react-intlayer";
import { useTextStore } from "../store/textStore";
import { ChartData } from "../types";

/**
 * Formats a number to a specified number of decimal places
 */
const formatNumber = (value: number, decimals = 4): string => {
  return value.toFixed(decimals);
};

/**
 * SimpleBarChart component for visualizing word frequencies
 */
const SimpleBarChart: React.FC<{ data: ChartData }> = ({ data }) => {
  const maxValue = Math.max(...data.values);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 h-60 overflow-y-auto">
      <div className="flex flex-col gap-2">
        {data.labels.map((label, index) => (
          <div key={label} className="flex items-center gap-2">
            <div className="w-24 truncate text-xs font-mono dark:text-gray-300">
              {label}
            </div>
            <div className="flex-1 h-5 flex items-center">
              <motion.div
                className="bg-primary-500 dark:bg-primary-600 h-full rounded"
                initial={{ width: 0 }}
                animate={{ width: `${(data.values[index] / maxValue) * 100}%` }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              />
              <span className="ml-2 text-xs font-mono dark:text-gray-300">
                {data.values[index]}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Results display component showing text analysis metrics and visualization
 */
const ResultsDisplay: React.FC = () => {
  const content = useIntlayer("app");
  const { currentResult } = useTextStore();

  // If no result, don't render anything
  if (!currentResult) return null;

  // Prepare chart data for top words
  const topWords: ChartData = { labels: [], values: [] };

  // Sort words by frequency in descending order and take top 10
  const sortedWords = Object.entries(currentResult.wordFrequency)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10);

  // Extract labels and values for chart
  topWords.labels = sortedWords.map(([word]) => word);
  topWords.values = sortedWords.map(([, count]) => count);

  return (
    <motion.div
      className="card max-w-3xl mx-auto mt-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        {content.results.title}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Metrics */}
        <div className="space-y-4">
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
              {content.results.wordCount}
            </h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {currentResult.wordCount}
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
              {content.results.uniqueWords}
            </h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {currentResult.uniqueWordCount}
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
              {content.results.lexicalDiversity}
            </h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {formatNumber(currentResult.lexicalDiversity, 4)}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              ({content.results.ratioExplanation})
            </p>
          </div>

          <div className="bg-primary-50 dark:bg-gray-700 dark:border-primary-800 p-4 rounded-lg border border-primary-100">
            <h3 className="text-sm font-medium text-primary-700 dark:text-primary-400 mb-1">
              {content.results.shannonEntropy}
            </h3>
            <p className="text-2xl font-bold text-primary-900 dark:text-primary-300">
              {formatNumber(currentResult.shannonEntropy, 4)} bits/word
            </p>
            <p className="text-xs text-primary-700 dark:text-primary-400 mt-1">
              ({content.results.entropyExplanation})
            </p>
          </div>
        </div>

        {/* Frequency visualization */}
        <div>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
            {content.results.topWords}
          </h3>
          <SimpleBarChart data={topWords} />
        </div>
      </div>
    </motion.div>
  );
};

export default ResultsDisplay;
