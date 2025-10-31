import Dashboard from "./pages/Dashboard"; 
import { Routes, Route, Navigate, BrowserRouter} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default redirect to /dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        {/* "*" → allows nested routing */}
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// notes:
// - If you later add top-level routes (like /login), just add more <Route> entries.
