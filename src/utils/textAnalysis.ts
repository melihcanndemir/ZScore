import { TextAnalysisResult } from '../types';

/**
 * Tokenizes input text into an array of words
 * @param text - The input text to tokenize
 * @returns Array of words from the input text
 */
export const tokenizeText = (text: string): string[] => {
  // Remove punctuation, convert to lowercase, and split by whitespace
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, '')
    .split(/\s+/)
    .filter(word => word.length > 0);
};

/**
 * Calculates word frequency from an array of words
 * @param words - Array of words to analyze
 * @returns Record of words and their frequencies
 */
export const calculateWordFrequency = (words: string[]): Record<string, number> => {
  const frequency: Record<string, number> = {};
  
  for (const word of words) {
    frequency[word] = (frequency[word] || 0) + 1;
  }
  
  return frequency;
};

/**
 * Calculates Shannon Entropy for a text
 * @param wordFrequency - Record of words and their frequencies
 * @param totalWords - Total number of words in the text
 * @returns Shannon entropy value
 */
export const calculateShannonEntropy = (
  wordFrequency: Record<string, number>,
  totalWords: number
): number => {
  if (totalWords === 0) return 0;
  
  let entropy = 0;
  
  // Calculate Shannon entropy: -sum(p_i * log2(p_i))
  for (const word in wordFrequency) {
    const probability = wordFrequency[word] / totalWords;
    entropy -= probability * Math.log2(probability);
  }
  
  return entropy;
};

/**
 * Calculates lexical diversity (ratio of unique words to total words)
 * @param uniqueWordCount - Number of unique words
 * @param totalWords - Total number of words
 * @returns Lexical diversity value (between 0 and 1)
 */
export const calculateLexicalDiversity = (
  uniqueWordCount: number,
  totalWords: number
): number => {
  if (totalWords === 0) return 0;
  return uniqueWordCount / totalWords;
};

/**
 * Analyzes a text input and returns comprehensive metrics
 * @param text - The input text to analyze
 * @returns Text analysis result object
 */
export const analyzeText = (text: string): TextAnalysisResult => {
  // Tokenize the text into words
  const words = tokenizeText(text);
  const totalWords = words.length;
  
  // Calculate word frequency
  const wordFrequency = calculateWordFrequency(words);
  
  // Get unique words
  const uniqueWords = Object.keys(wordFrequency);
  const uniqueWordCount = uniqueWords.length;
  
  // Calculate lexical diversity
  const lexicalDiversity = calculateLexicalDiversity(uniqueWordCount, totalWords);
  
  // Calculate Shannon entropy
  const shannonEntropy = calculateShannonEntropy(wordFrequency, totalWords);
  
  return {
    text,
    wordCount: totalWords,
    uniqueWords,
    uniqueWordCount,
    lexicalDiversity,
    shannonEntropy,
    wordFrequency,
    timestamp: new Date(),
  };
}; 