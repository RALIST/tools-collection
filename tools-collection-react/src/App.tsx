import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/common/Header/Header';
import Footer from './components/common/Footer/Footer';
import Home from './pages/Home/Home';
import TextTools from './pages/TextTools/TextTools';
import CaseConverter from './pages/TextTools/CaseConverter/CaseConverter';
import WordCounter from './pages/TextTools/WordCounter/WordCounter';
import StringEncoder from './pages/TextTools/StringEncoder/StringEncoder';
import DeveloperTools from './pages/DeveloperTools/DeveloperTools';
import JsonFormatter from './pages/DeveloperTools/JsonFormatter/JsonFormatter';
import CodeMinifier from './pages/DeveloperTools/CodeMinifier/CodeMinifier';
import RegexTester from './pages/DeveloperTools/RegexTester/RegexTester';
import CodeBeautifier from './pages/DeveloperTools/CodeBeautifier/CodeBeautifier';
import HashGenerator from './pages/DeveloperTools/HashGenerator/HashGenerator';
import Converters from './pages/Converters/Converters';
import UnitConverter from './pages/Converters/UnitConverter/UnitConverter';
import ColorConverter from './pages/Converters/ColorConverter/ColorConverter';
import TimeConverter from './pages/Converters/TimeConverter/TimeConverter';
import './App.css';

// Temporary placeholder components
const Generators = () => <div className="page-content">Generators Page</div>;

// Wrapper component to handle current path
const AppContent = () => {
  const location = useLocation();

  return (
    <div className="app">
      <Header currentPath={location.pathname} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Text Tools Routes */}
          <Route path="/text-tools" element={<TextTools />} />
          <Route path="/text-tools/case-converter" element={<CaseConverter />} />
          <Route path="/text-tools/word-counter" element={<WordCounter />} />
          <Route path="/text-tools/string-encoder" element={<StringEncoder />} />

          {/* Developer Tools Routes */}
          <Route path="/developer-tools" element={<DeveloperTools />} />
          <Route path="/developer-tools/json-formatter" element={<JsonFormatter />} />
          <Route path="/developer-tools/code-minifier" element={<CodeMinifier />} />
          <Route path="/developer-tools/regex-tester" element={<RegexTester />} />
          <Route path="/developer-tools/code-beautifier" element={<CodeBeautifier />} />
          <Route path="/developer-tools/hash-generator" element={<HashGenerator />} />

          {/* Converters Routes */}
          <Route path="/converters" element={<Converters />} />
          <Route path="/converters/unit-converter" element={<UnitConverter />} />
          <Route path="/converters/color-converter" element={<ColorConverter />} />
          <Route path="/converters/time-converter" element={<TimeConverter />} />

          {/* Other Tool Categories */}
          <Route path="/generators" element={<Generators />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
