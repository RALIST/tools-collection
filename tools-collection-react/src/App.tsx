import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/common/Header/Header';
import Footer from './components/common/Footer/Footer';
import Home from './pages/Home/Home';
import TextTools from './pages/TextTools/TextTools';
import DeveloperTools from './pages/DeveloperTools/DeveloperTools';
import Converters from './pages/Converters/Converters';
import Generators from './pages/Generators/Generators';

// Text Tools
import CaseConverter from './pages/TextTools/CaseConverter/CaseConverter';
import WordCounter from './pages/TextTools/WordCounter/WordCounter';
import StringEncoder from './pages/TextTools/StringEncoder/StringEncoder';

// Developer Tools
import JsonFormatter from './pages/DeveloperTools/JsonFormatter/JsonFormatter';
import CodeMinifier from './pages/DeveloperTools/CodeMinifier/CodeMinifier';
import RegexTester from './pages/DeveloperTools/RegexTester/RegexTester';
import CodeBeautifier from './pages/DeveloperTools/CodeBeautifier/CodeBeautifier';
import HashGenerator from './pages/DeveloperTools/HashGenerator/HashGenerator';

// Converters
import UnitConverter from './pages/Converters/UnitConverter/UnitConverter';
import ColorConverter from './pages/Converters/ColorConverter/ColorConverter';

// Generators
import PasswordGenerator from './pages/Generators/PasswordGenerator/PasswordGenerator';
import LoremGenerator from './pages/Generators/LoremGenerator/LoremGenerator';

const App: React.FC = () => {
  return (
    <div className="app">
      <Header />
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
          <Route path="/converters/color-picker" element={<ColorConverter />} />

          {/* Generators Routes */}
          <Route path="/generators" element={<Generators />} />
          <Route path="/generators/password-generator" element={<PasswordGenerator />} />
          <Route path="/generators/lorem-generator" element={<LoremGenerator />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

const AppWrapper: React.FC = () => {
  return (
    <HelmetProvider>
      <Router>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </Router>
    </HelmetProvider>
  );
};

export default AppWrapper;
