import { IKContext } from "imagekitio-react"; // to access imagekit.io globally

import Dashboard from "./pages/Dashboard";
import { Routes, Route, BrowserRouter} from "react-router-dom";
import Home from "./pages/Home";
import BookDetails from "./pages/BookDetails";

function App() {

  const API_URL = process.env.REACT_APP_API_URL;

  return (
    <IKContext
      publicKey={process.env.REACT_APP_IMAGEKIT_PUBLIC_KEY}
      urlEndpoint={process.env.REACT_APP_IMAGEKIT_URL_ENDPOINT}
      authenticator={async () => {
        try {
          const res = await fetch(`${API_URL}/imagekit/auth`);
          const data = await res.json();
            console.log("ImageKit auth:", data);
          return data;
        } catch (err) {
          console.error("Auth error:", err);
        }
      }}
    >
    <BrowserRouter>
      <Routes>
        {/* Default route → Home page */}
        <Route path="/" element={<Home />} />

        {/* Dashboard route */}
        <Route path="/*" element={<Dashboard />} />

        <Route path="/books/:id" element={<BookDetails />} />

        {/* Catch-all for invalid paths */}
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </BrowserRouter>
    </IKContext>
  )
}

export default App;

// notes:
// - If you later add top-level routes (like /login), just add more <Route> entries.
