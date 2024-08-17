import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/widgets/Navbar';
import Home from './components/Home';
import Resume from './components/Resume';
import ActionBar from './components/widgets/ActionBar';
import JsonViewer from './components/JsonViewer';
import ColorPaletteGenerator from './components/ColorPaletteGenerator';
import AccessibilityTool from './components/AccessibilityTool';
import ContactPage from './components/ContactPage';
import Portfolio from './components/Portfolio';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Home />
                  <Resume />
                </>
              }
            />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/projects" element={<Portfolio />} />
            <Route path="/json-viewer" element={<JsonViewer />} />
            <Route path="/color-gen" element={<ColorPaletteGenerator />} />
            <Route path="/accessibility-viewer" element={<AccessibilityTool />} />
          </Routes>
        </main>
        <ActionBar />
      </div>
    </Router>
  );
}

export default App;