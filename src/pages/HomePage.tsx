import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, FilePlus, Import, Upload } from 'lucide-react';
import { useDocument } from '../context/DocumentContext';
import FeatureCard from '../components/FeatureCard';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { setDocument, setDocumentName } = useDocument();
  
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setDocument(content);
      setDocumentName(file.name);
      navigate('/document');
    };
    reader.readAsText(file);
  };
  
  const handleNewDocument = () => {
    setDocument('');
    setDocumentName('Untitled Document');
    navigate('/document');
  };

  const features = [
    {
      icon: <FileText className="h-8 w-8 text-blue-800" />,
      title: "Legal Document Simplification",
      description: "Transform complex legal documents into plain language anyone can understand."
    },
    {
      icon: <Import className="h-8 w-8 text-blue-800" />,
      title: "Automatic Table of Contents",
      description: "Generate clickable navigation for your documents with heading detection."
    },
    {
      icon: <Upload className="h-8 w-8 text-blue-800" />,
      title: "Duplicate Line Removal",
      description: "Clean up documents by automatically detecting and removing duplicate content."
    },
    {
      icon: <FilePlus className="h-8 w-8 text-blue-800" />,
      title: "Document Annotation",
      description: "Add legal comments and annotations to contracts and agreements."
    },
    {
      icon: <FileText className="h-8 w-8 text-blue-800" />,
      title: "FAQ Generation",
      description: "Create question-and-answer sets automatically from your documents."
    },
    {
      icon: <FileText className="h-8 w-8 text-blue-800" />,
      title: "Executive Summary Creation",
      description: "Generate concise summaries from lengthy documents and reports."
    }
  ];

  return (
    <div className="relative bg-white overflow-hidden">
      <div className="relative pt-6 pb-16 sm:pb-24">
        <main className="mt-16 mx-auto max-w-7xl px-4 sm:mt-24">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block xl:inline">Advanced document</span>{' '}
              <span className="block text-blue-800 xl:inline">processing made simple</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Transform, clean, and enhance your documents with powerful text processing tools. Simplify legal language, create summaries, and more with just a few clicks.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <button
                  onClick={handleNewDocument}
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-800 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 transition-colors duration-150"
                >
                  <FilePlus className="h-5 w-5 mr-2" />
                  Create New Document
                </button>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3">
                <label className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-800 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg md:px-10 cursor-pointer transition-colors duration-150">
                  <Upload className="h-5 w-5 mr-2" />
                  Upload Document
                  <input
                    type="file"
                    accept=".txt,.doc,.docx,.pdf,.rtf"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </label>
              </div>
            </div>
          </div>
        </main>
      </div>
      
      <div className="relative bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-base font-semibold uppercase tracking-wider text-blue-800">Features</h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
            Everything you need to process your documents
          </p>
          <p className="mx-auto mt-5 max-w-prose text-xl text-gray-500">
            Transform your documents with our suite of advanced text processing features
          </p>
          <div className="mt-12">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <FeatureCard 
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;