import Dashboard from "./pages/Dashboard";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default route → Home page */}
        <Route path="/" element={<Home />} />

         {/* SAME Home, different URLs */}
        <Route path="/login" element={<Home />} />
        <Route path="/register" element={<Home />} />
        
        {/* Dashboard route */}
        <Route path="/dashboard/*" element={<Dashboard />} />

        {/* Catch-all for invalid paths */}
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
