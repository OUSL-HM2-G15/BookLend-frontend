import { useState, useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import { Routes, Route, BrowserRouter, Link } from "react-router-dom";
import { IKContext } from "imagekitio-react"; // to access imagekit.io globally
import Home from "./pages/Home";
import { Result, Button } from "antd";
import ProtectedRoute from "./components/ProtectedRoute"

function App() {
  const [user, setUser] = useState(undefined); // Initial value of user

  const API_URL = process.env.REACT_APP_API_URL;

  // Check token on app load
  const fetchProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      return;
    }

    try {
      const res = await fetch(`${API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        if (res.status === 401) {
          localStorage.removeItem("token"); // Token expired or invalid
          setUser(null);
        } else {
          // Other backend errors
          const errorData = await res.json();
          console.error("API Error:", errorData.message || "Unknown error");
        }
        return;
      }

      const data = await res.json();
      setUser(data); // real user
    } catch (err) {
      // Network or unexpected errors
      console.error("Fetch failed:", err);
    }
  };

  useEffect(() => {
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
          <Route path="/" element={<Home onLoginSuccess={fetchProfile}/>} /> 

          {/* SAME Home, different URLs */}
          <Route path="/login" element={<Home onLoginSuccess={fetchProfile}/>} />
          <Route path="/register" element={<Home onLoginSuccess={fetchProfile} />} />

          {/* Dashboard (all nested paths handled inside Dashboard.jsx) */}
          <Route 
          path="/dashboard/*"
          element={
                <ProtectedRoute user={user}>
                  <Dashboard user={user} onLogout={handleLogout} />
                </ProtectedRoute>
            }
          />

          {/* Catch-all for invalid paths */}
          {/* 404 Page (Ant Design) */}
          <Route path="*" element={
            <Result status="404"
              title="404"
              subTitle="Sorry, the page you visited does not exist."
              extra={
                <Button type="primary">
                  <Link to="/">Back Home</Link>
                </Button>
              }
            />
          }
          />

        </Routes>
      </BrowserRouter>
    </IKContext>
  );
}

export default App;
