import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Header from "./components/common/Header/Header";
import Footer from "./components/common/Footer/Footer";
import Home from "./pages/Home/Home";
import TextTools from "./pages/TextTools/TextTools";
import DeveloperTools from "./pages/DeveloperTools/DeveloperTools";
import Converters from "./pages/Converters/Converters";
import Generators from "./pages/Generators/Generators";
import MathTools from "./pages/MathTools/MathTools";
import { ThemeProvider } from "./contexts/ThemeContext";

// Tool Pages
import CaseConverter from "./pages/TextTools/CaseConverter/CaseConverter";
import WordCounter from "./pages/TextTools/WordCounter/WordCounter";
import StringEncoder from "./pages/TextTools/StringEncoder/StringEncoder";
import JsonFormatter from "./pages/DeveloperTools/JsonFormatter/JsonFormatter";
import CodeBeautifier from "./pages/DeveloperTools/CodeBeautifier/CodeBeautifier";
import CodeMinifier from "./pages/DeveloperTools/CodeMinifier/CodeMinifier";
import RegexTester from "./pages/DeveloperTools/RegexTester/RegexTester";
import HashGenerator from "./pages/DeveloperTools/HashGenerator/HashGenerator";
import KeccakSha3Generator from "./pages/DeveloperTools/KeccakSha3Generator/KeccakSha3Generator";
import HmacGenerator from "./pages/DeveloperTools/HmacGenerator/HmacGenerator";

import ColorConverter from "./pages/Converters/ColorConverter/ColorConverter";
import UnitConverter from "./pages/Converters/UnitConverter/UnitConverter";
import TimeConverter from "./pages/Converters/TimeConverter/TimeConverter";
import LoremGenerator from "./pages/Generators/LoremGenerator/LoremGenerator";
import PasswordGenerator from "./pages/Generators/PasswordGenerator/PasswordGenerator";
import PercentageCalculator from "./pages/MathTools/PercentageCalculator/PercentageCalculator";
import ScientificCalculator from "./pages/MathTools/ScientificCalculator/ScientificCalculator";

// Styles
import "./App.css";
import "./styles/tools.css";

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <Router>
          <div className="app">
            <Header />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/text-tools" element={<TextTools />} />
                <Route path="/developer-tools" element={<DeveloperTools />} />
                <Route path="/converters" element={<Converters />} />
                <Route path="/generators" element={<Generators />} />
                <Route path="/math-tools" element={<MathTools />} />

                {/* Text Tools Routes */}
                <Route
                  path="/text-tools/case-converter"
                  element={<CaseConverter />}
                />
                <Route
                  path="/text-tools/word-counter"
                  element={<WordCounter />}
                />
                <Route
                  path="/text-tools/string-encoder"
                  element={<StringEncoder />}
                />

                {/* Developer Tools Routes */}
                <Route
                  path="/developer-tools/json-formatter"
                  element={<JsonFormatter />}
                />
                <Route
                  path="/developer-tools/code-beautifier"
                  element={<CodeBeautifier />}
                />
                <Route
                  path="/developer-tools/code-minifier"
                  element={<CodeMinifier />}
                />
                <Route
                  path="/developer-tools/regex-tester"
                  element={<RegexTester />}
                />
                <Route
                  path="/developer-tools/hash-generator"
                  element={<HashGenerator />}
                />
                <Route
                  path="/developer-tools/keccak-sha3-generator"
                  element={<KeccakSha3Generator />}
                />
                <Route
                  path="/developer-tools/hmac-generator"
                  element={<HmacGenerator />}
                />

                {/* Converters Routes */}
                <Route
                  path="/converters/color-converter"
                  element={<ColorConverter />}
                />
                <Route
                  path="/converters/unit-converter"
                  element={<UnitConverter />}
                />
                <Route
                  path="/converters/time-converter"
                  element={<TimeConverter />}
                />

                {/* Generators Routes */}
                <Route
                  path="/generators/lorem-generator"
                  element={<LoremGenerator />}
                />
                <Route
                  path="/generators/password-generator"
                  element={<PasswordGenerator />}
                />

                {/* Math Tools Routes */}
                <Route
                  path="/math-tools/percentage-calculator"
                  element={<PercentageCalculator />}
                />
                <Route
                  path="/math-tools/scientific-calculator"
                  element={<ScientificCalculator />}
                />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default App;
