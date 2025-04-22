import React from 'react';
import { Loader } from 'lucide-react';

interface DocumentEditorProps {
  content: string;
  readOnly?: boolean;
  label: string;
  loading?: boolean;
  onChange?: (value: string) => void;
}

const DocumentEditor: React.FC<DocumentEditorProps> = ({
  content,
  readOnly = false,
  label,
  loading = false,
  onChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
      <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-sm font-medium text-gray-700">{label}</h3>
        {loading && (
          <div className="flex items-center text-blue-600">
            <Loader className="animate-spin h-4 w-4 mr-2" />
            <span className="text-xs">Processing...</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <textarea
          className={`w-full h-[calc(100vh-400px)] min-h-[400px] px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${
            readOnly ? 'bg-gray-50' : ''
          }`}
          value={content}
          onChange={handleChange}
          readOnly={readOnly}
          placeholder={readOnly ? 'Processed content will appear here...' : 'Enter or paste your document here...'}
          style={{
            lineHeight: '1.6',
            fontSize: '16px',
            fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          }}
        ></textarea>
      </div>
    </div>
  );
};

export default DocumentEditor;