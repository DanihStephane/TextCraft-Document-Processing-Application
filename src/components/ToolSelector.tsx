import React from 'react';
import { 
  FileText, 
  List, 
  Filter, 
  MessageSquare, 
  HelpCircle, 
  FileDigit 
} from 'lucide-react';
import { ProcessingMode } from '../context/DocumentContext';

interface ToolSelectorProps {
  selectedTool: ProcessingMode;
  onSelectTool: (tool: ProcessingMode) => void;
}

interface Tool {
  id: ProcessingMode;
  name: string;
  description: string;
  icon: React.ReactNode;
}

const ToolSelector: React.FC<ToolSelectorProps> = ({ selectedTool, onSelectTool }) => {
  const tools: Tool[] = [
    {
      id: 'simplify',
      name: 'Simplify Language',
      description: 'Convert legal jargon to plain language',
      icon: <FileText className="h-6 w-6" />
    },
    {
      id: 'toc',
      name: 'Generate TOC',
      description: 'Create clickable table of contents',
      icon: <List className="h-6 w-6" />
    },
    {
      id: 'deduplicate',
      name: 'Remove Duplicates',
      description: 'Delete duplicate lines from text',
      icon: <Filter className="h-6 w-6" />
    },
    {
      id: 'annotate',
      name: 'Annotate Document',
      description: 'Add legal comments to text',
      icon: <MessageSquare className="h-6 w-6" />
    },
    {
      id: 'faq',
      name: 'Generate FAQ',
      description: 'Create Q&A from document content',
      icon: <HelpCircle className="h-6 w-6" />
    },
    {
      id: 'summary',
      name: 'Executive Summary',
      description: 'Create concise document summary',
      icon: <FileDigit className="h-6 w-6" />
    },
  ];

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
        {tools.map((tool) => (
          <li key={tool.id}>
            <button
              onClick={() => onSelectTool(tool.id === selectedTool ? null : tool.id)}
              className={`w-full px-6 py-4 flex items-start space-x-4 focus:outline-none transition-colors duration-200 ${
                tool.id === selectedTool 
                  ? 'bg-blue-50 border-l-4 border-blue-800' 
                  : 'hover:bg-gray-50'
              }`}
            >
              <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${
                tool.id === selectedTool ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-500'
              }`}>
                {tool.icon}
              </div>
              <div className="text-left">
                <p className={`text-sm font-medium ${
                  tool.id === selectedTool ? 'text-blue-800' : 'text-gray-900'
                }`}>
                  {tool.name}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  {tool.description}
                </p>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToolSelector;