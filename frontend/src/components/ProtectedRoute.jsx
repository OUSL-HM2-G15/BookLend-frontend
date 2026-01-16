import React from "react";
import { Navigate, useLocation, Link } from "react-router-dom";
import { Button, Result } from "antd";

// A custom private route component
const PrivateRoute = ({ element: Component, ...rest }) => {
  const token = localStorage.getItem("token");
  const location = useLocation();

  // Define the public routes that do not require authentication
  const publicRoutes = ["/", "/login", "/register", "/explore"]; // You can add more public routes here

  // If the current location is one of the public routes, no need for authentication check
  if (publicRoutes.includes(location.pathname)) {
    return Component;
  }

  // If there's no token and the route is protected, show a custom page
  if (!token) {
    return (
      <Result
        status="403"
        title="You are not logged in"
        subTitle="Sorry, you need to log in to access this page."
        extra={[
          <Button type="primary" key="login">
            <Link to="/login">Login</Link>
          </Button>,
          <Button key="home">
            <Link to="/">Go to Home</Link>
          </Button>
        ]}
      />
    );
  }

  // If token exists, render the protected route
  return Component;
};

export default PrivateRoute;
