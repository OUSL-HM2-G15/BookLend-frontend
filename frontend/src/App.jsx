import { useState, useEffect  } from "react";
import Dashboard from "./pages/Dashboard";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { IKContext } from "imagekitio-react"; // to access imagekit.io globally
import Home from "./pages/Home";
import BookDetails from "./pages/BookDetails";

function App() {
  const [user, setUser] = useState(null); // store logged-in user

  const API_URL = process.env.REACT_APP_API_URL;

  // Check token on app load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Optionally fetch profile here
      setUser({}); // minimal user object for logged-in state
    }
  }, []);

   // Global logout function
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await fetch(`${API_URL}/api/auth/logout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
      }
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      localStorage.removeItem("token");
      setUser(null);
      window.location.href = "/"; // redirect to Home after logout
    }
  };


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

        {/* SAME Home, different URLs */}
        <Route path="/login" element={<Home />} />
        <Route path="/register" element={<Home />} />

        <Route path="/books/:id" element={<BookDetails />} />

        {/* Dashboard (all nested paths handled inside Dashboard.jsx) */}
        <Route path="/*" 
        element={<Dashboard user={user} onLogout={handleLogout} />} />

        {/* Catch-all for invalid paths */}
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </BrowserRouter>
    </IKContext>
  );
}

export default App;
