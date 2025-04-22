import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import DocumentPage from './pages/DocumentPage';
import { DocumentProvider } from './context/DocumentContext';

function App() {
  return (
    <DocumentProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/document" element={<DocumentPage />} />
          </Route>
        </Routes>
      </Router>
    </DocumentProvider>
  );
}

export default App;