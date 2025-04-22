import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDocument } from '../context/DocumentContext';
import ToolSelector from '../components/ToolSelector';
import DocumentEditor from '../components/DocumentEditor';
import ProcessingControls from '../components/ProcessingControls';
import { processDocument } from '../utils/textProcessing';

const DocumentPage: React.FC = () => {
  const navigate = useNavigate();
  const { 
    document, 
    processedDocument, 
    documentName,
    setDocument,
    setProcessedDocument, 
    processingMode,
    setProcessingMode
  } = useDocument();
  
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!document && documentName === 'Untitled Document') {
      setDocument('Welcome to TextCraft!\n\nStart by typing or pasting your document here. Then select a processing tool from above to transform your text.\n\nExample features:\n- Simplify legal language\n- Generate table of contents\n- Remove duplicate content\n- Add legal annotations\n- Create FAQs\n- Generate executive summaries');
    }
  }, [document, documentName, setDocument]);

  useEffect(() => {
    if (processingMode && document) {
      setIsProcessing(true);
      const timer = setTimeout(() => {
        const result = processDocument(document, processingMode);
        setProcessedDocument(result);
        setIsProcessing(false);
      }, 800);
      
      return () => clearTimeout(timer);
    } else {
      setProcessedDocument('');
    }
  }, [document, processingMode, setProcessedDocument]);

  const handleDocumentChange = (newContent: string) => {
    setDocument(newContent);
    if (processingMode) {
      setProcessingMode(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">{documentName}</h1>
        </div>
        <p className="text-gray-500 mt-1">
          Select a text processing tool to begin transforming your document.
        </p>
      </div>
      
      <ToolSelector 
        selectedTool={processingMode} 
        onSelectTool={setProcessingMode} 
      />
      
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DocumentEditor 
          content={document} 
          readOnly={false}
          label="Original Document"
          onChange={handleDocumentChange}
        />
        
        <DocumentEditor 
          content={processedDocument} 
          readOnly={true}
          label="Processed Result"
          loading={isProcessing}
        />
      </div>
      
      <ProcessingControls 
        processingMode={processingMode}
        isProcessing={isProcessing}
      />
    </div>
  );
};

export default DocumentPage;