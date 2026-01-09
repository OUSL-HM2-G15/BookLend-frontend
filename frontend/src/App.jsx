import { useState, useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { IKContext } from "imagekitio-react"; // to access imagekit.io globally
import Home from "./pages/Home";

function App() {
  const [user, setUser] = useState(null); // store logged-in user

  const API_URL = process.env.REACT_APP_API_URL;

  // Check token on app load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${API_URL}/auth/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Invalid token");

        const data = await res.json();
        setUser(data.user); // real user
      } catch (err) {
        console.error(err);
        localStorage.removeItem("token");
        setUser(null);
      }
    };

    fetchProfile();
  }, [API_URL]);

  // Global logout function
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await fetch(`${API_URL}/auth/logout`, {
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

          {/* Dashboard (all nested paths handled inside Dashboard.jsx) */}
          <Route path="/*"
            element={<Dashboard user={user} onLogout={handleLogout} />} />

          
        </Routes>
      </BrowserRouter>
    </IKContext>
  );
}

export default App;
