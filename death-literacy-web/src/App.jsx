// Import router components from react-router-dom
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import the Home page component for the root path
import Home from "./pages/Home";

// The App component defines the main routing structure of the application
function App() {
  return (
    // BrowserRouter enables HTML5 history-based routing (clean URLs)
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}


// Export the App component so it can be used in main.jsx as the entry point
export default App;
