import React from 'react';
import { Download, Copy, Undo } from 'lucide-react';
import { ProcessingMode } from '../context/DocumentContext';
import { useDocument } from '../context/DocumentContext';

interface ProcessingControlsProps {
  processingMode: ProcessingMode;
  isProcessing: boolean;
}

const ProcessingControls: React.FC<ProcessingControlsProps> = ({
  processingMode,
  isProcessing,
}) => {
  const { processedDocument, setProcessingMode, documentName } = useDocument();

  const handleDownload = () => {
    if (!processedDocument) return;
    
    const blob = new Blob([processedDocument], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = documentName.replace(/\.[^/.]+$/, '') + '-processed.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    if (!processedDocument) return;
    navigator.clipboard.writeText(processedDocument);
  };

  if (!processingMode) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="text-sm text-gray-500">
          {getProcessingModeLabel(processingMode)}
        </div>
        
        <div className="flex space-x-4">
          <button
            onClick={() => setProcessingMode(null)}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            disabled={isProcessing}
          >
            <Undo className="h-4 w-4 mr-2" />
            Clear
          </button>
          
          <button
            onClick={handleCopy}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            disabled={isProcessing || !processedDocument}
          >
            <Copy className="h-4 w-4 mr-2" />
            Copy
          </button>
          
          <button
            onClick={handleDownload}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-800 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            disabled={isProcessing || !processedDocument}
          >
            <Download className="h-4 w-4 mr-2" />
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

function getProcessingModeLabel(mode: ProcessingMode): string {
  switch (mode) {
    case 'simplify':
      return 'Simplifying legal language';
    case 'toc':
      return 'Generating table of contents';
    case 'deduplicate':
      return 'Removing duplicate lines';
    case 'annotate':
      return 'Adding legal annotations';
    case 'faq':
      return 'Generating FAQ from document';
    case 'summary':
      return 'Creating executive summary';
    default:
      return '';
  }
}

export default ProcessingControls;