/**
 * Types for the Shannon Entropy Calculator
 */

/**
 * TextAnalysisResult - Contains the analysis results for a text input
 */
export interface TextAnalysisResult {
  /** The original text that was analyzed */
  text: string;
  /** Total number of words in the text */
  wordCount: number;
  /** Array of unique words found in the text */
  uniqueWords: string[];
  /** Number of unique words */
  uniqueWordCount: number;
  /** Lexical diversity (ratio of unique words to total words) */
  lexicalDiversity: number;
  /** Shannon entropy value */
  shannonEntropy: number;
  /** Detailed frequency map of each word */
  wordFrequency: Record<string, number>;
  /** Timestamp when the analysis was performed */
  timestamp: Date;
}

/**
 * HistoryItem - Represents a single item in the analysis history
 */
export interface HistoryItem {
  /** Unique identifier for the history item */
  id: string;
  /** The analysis result */
  result: TextAnalysisResult;
}

/**
 * ChartData - Data structure for visualization components
 */
export interface ChartData {
  /** Labels for the chart (e.g., words) */
  labels: string[];
  /** Values for the chart (e.g., frequencies) */
  values: number[];
} 