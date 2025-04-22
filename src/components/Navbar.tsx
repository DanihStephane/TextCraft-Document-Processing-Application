import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Settings, HelpCircle } from 'lucide-react';
import { useDocument } from '../context/DocumentContext';

const Navbar: React.FC = () => {
  const { documentName } = useDocument();

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <FileText className="h-8 w-8 text-blue-800" />
              <span className="ml-2 text-xl font-bold text-gray-900">TextCraft</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/"
                className="border-transparent text-gray-500 hover:border-blue-800 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Home
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            {documentName !== 'Untitled Document' && (
              <div className="px-3 py-1 rounded-md text-sm font-medium text-gray-700">
                {documentName}
              </div>
            )}
            <button
              type="button"
              className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-800"
            >
              <span className="sr-only">Settings</span>
              <Settings className="h-6 w-6" />
            </button>
            <button
              type="button"
              className="ml-3 p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-800"
            >
              <span className="sr-only">Help</span>
              <HelpCircle className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;