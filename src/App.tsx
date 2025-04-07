import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Header from "./components/common/Header/Header";
import Footer from "./components/common/Footer/Footer";
import { ThemeProvider } from "./contexts/ThemeContext";

// Styles (Import styles after libraries/components)
import "./App.css";
import "./styles/tools.css";

// Lazy load page components (Import these last)
const Home = lazy(() => import("./pages/Home/Home"));
const TextTools = lazy(() => import("./pages/TextTools/TextTools"));
const DeveloperTools = lazy(
  () => import("./pages/DeveloperTools/DeveloperTools")
);
const Converters = lazy(() => import("./pages/Converters/Converters"));
const Generators = lazy(() => import("./pages/Generators/Generators"));
const MathTools = lazy(() => import("./pages/MathTools/MathTools"));

// Tool Pages
// Lazy load individual tool pages
const CaseConverter = lazy(
  () => import("./pages/TextTools/CaseConverter/CaseConverter")
);
const WordCounter = lazy(
  () => import("./pages/TextTools/WordCounter/WordCounter")
);
const StringEncoder = lazy(
  () => import("./pages/TextTools/StringEncoder/StringEncoder")
);
const JsonFormatter = lazy(
  () => import("./pages/DeveloperTools/JsonFormatter/JsonFormatter")
);
const CodeBeautifier = lazy(
  () => import("./pages/DeveloperTools/CodeBeautifier/CodeBeautifier")
);
const CodeMinifier = lazy(
  () => import("./pages/DeveloperTools/CodeMinifier/CodeMinifier")
);
const RegexTester = lazy(
  () => import("./pages/DeveloperTools/RegexTester/RegexTester")
);
const HashGenerator = lazy(
  () => import("./pages/DeveloperTools/HashGenerator/HashGenerator")
);
const KeccakSha3Generator = lazy(
  () => import("./pages/DeveloperTools/KeccakSha3Generator/KeccakSha3Generator")
);
const HmacGenerator = lazy(
  () => import("./pages/DeveloperTools/HmacGenerator/HmacGenerator")
);
const ColorConverter = lazy(
  () => import("./pages/Converters/ColorConverter/ColorConverter")
);
const UnitConverter = lazy(
  () => import("./pages/Converters/UnitConverter/UnitConverter")
);
const TimeConverter = lazy(
  () => import("./pages/Converters/TimeConverter/TimeConverter")
);
const LoremGenerator = lazy(
  () => import("./pages/Generators/LoremGenerator/LoremGenerator")
);
const PasswordGenerator = lazy(
  () => import("./pages/Generators/PasswordGenerator/PasswordGenerator")
);
const PercentageCalculator = lazy(
  () => import("./pages/MathTools/PercentageCalculator/PercentageCalculator")
);
const ScientificCalculator = lazy(
  () => import("./pages/MathTools/ScientificCalculator/ScientificCalculator")
);

// Styles moved to top section

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <Router>
          <div className="app">
            <Header />
            <main className="main-content">
              {/* Wrap Routes with Suspense for lazy loading */}
              <Suspense fallback={<div>Loading...</div>}>
                {" "}
                {/* Basic fallback */}
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
              </Suspense>
            </main>
            <Footer />
          </div>
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default App;
