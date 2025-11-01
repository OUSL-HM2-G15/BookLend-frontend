import Dashboard from "./pages/Dashboard"; 
import { Routes, Route, BrowserRouter} from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default route → Home page */}
        <Route path="/" element={<Home />} />

        {/* Dashboard route */}
        <Route path="/dashboard/*" element={<Dashboard />} />

        {/* Catch-all for invalid paths */}
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// notes:
// - If you later add top-level routes (like /login), just add more <Route> entries.
