import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { HistoryItem, TextAnalysisResult } from '../types';
import { analyzeText } from '../utils/textAnalysis';

/**
 * Interface for the text analysis store state
 */
interface TextStore {
  // Current text input
  currentText: string;
  // Current analysis result
  currentResult: TextAnalysisResult | null;
  // History of analyses
  history: HistoryItem[];
  // Maximum history items to keep
  maxHistorySize: number;
  
  // Actions
  setText: (text: string) => void;
  analyzeCurrentText: () => void;
  clearCurrentText: () => void;
  clearHistory: () => void;
  removeHistoryItem: (id: string) => void;
}

/**
 * Creates a new empty analysis result
 */
const createEmptyResult = (): TextAnalysisResult => ({
  text: '',
  wordCount: 0,
  uniqueWords: [],
  uniqueWordCount: 0,
  lexicalDiversity: 0,
  shannonEntropy: 0,
  wordFrequency: {},
  timestamp: new Date(),
});

/**
 * Text analysis store with persistent history
 */
export const useTextStore = create<TextStore>()(
  persist(
    (set, get) => ({
      currentText: '',
      currentResult: null,
      history: [],
      maxHistorySize: 10,
      
      /**
       * Sets the current text input
       */
      setText: (text: string) => set({ currentText: text }),
      
      /**
       * Analyzes the current text and updates the result
       */
      analyzeCurrentText: () => {
        const { currentText, history, maxHistorySize } = get();
        
        if (!currentText.trim()) {
          set({ currentResult: createEmptyResult() });
          return;
        }
        
        const result = analyzeText(currentText);
        
        // Create a new history item
        const newHistoryItem: HistoryItem = {
          id: Date.now().toString(),
          result,
        };
        
        // Add to history, maintaining max size
        const updatedHistory = [newHistoryItem, ...history];
        if (updatedHistory.length > maxHistorySize) {
          updatedHistory.pop();
        }
        
        set({
          currentResult: result,
          history: updatedHistory,
        });
      },
      
      /**
       * Clears the current text input and result
       */
      clearCurrentText: () => set({ 
        currentText: '',
        currentResult: null,
      }),
      
      /**
       * Clears the analysis history
       */
      clearHistory: () => set({ history: [] }),
      
      /**
       * Removes a specific history item by ID
       */
      removeHistoryItem: (id: string) => set(state => ({
        history: state.history.filter(item => item.id !== id),
      })),
    }),
    {
      name: 'shannon-entropy-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ history: state.history }),
    }
  )
); 