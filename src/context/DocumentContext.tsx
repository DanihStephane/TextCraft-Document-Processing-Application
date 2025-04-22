import React, { createContext, useState, useContext } from 'react';

interface DocumentContextType {
  document: string;
  processedDocument: string;
  documentName: string;
  setDocument: (doc: string) => void;
  setProcessedDocument: (doc: string) => void;
  setDocumentName: (name: string) => void;
  processingMode: ProcessingMode;
  setProcessingMode: (mode: ProcessingMode) => void;
}

export type ProcessingMode = 
  | 'simplify' 
  | 'toc' 
  | 'deduplicate' 
  | 'annotate' 
  | 'faq' 
  | 'summary' 
  | null;

const DocumentContext = createContext<DocumentContextType | undefined>(undefined);

export const DocumentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [document, setDocument] = useState<string>('');
  const [processedDocument, setProcessedDocument] = useState<string>('');
  const [documentName, setDocumentName] = useState<string>('Untitled Document');
  const [processingMode, setProcessingMode] = useState<ProcessingMode>(null);

  return (
    <DocumentContext.Provider
      value={{
        document,
        processedDocument,
        documentName,
        setDocument,
        setProcessedDocument,
        setDocumentName,
        processingMode,
        setProcessingMode,
      }}
    >
      {children}
    </DocumentContext.Provider>
  );
};

export const useDocument = (): DocumentContextType => {
  const context = useContext(DocumentContext);
  if (context === undefined) {
    throw new Error('useDocument must be used within a DocumentProvider');
  }
  return context;
};