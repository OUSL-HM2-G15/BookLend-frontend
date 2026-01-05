// import React, { useEffect, useState } from "react";
// import axios from "axios";
import DashboardLayout from "../layouts/DashboardLayout";
import { Routes, Route, Navigate } from "react-router-dom";
import Explore from "./Explore";
import MyBooks from "./MyBooks";
import BorrowedBooks from "./BorrowedBooks";
import MyLendedBooks from "./MyLendedBooks";
import RequestsReceived from "./RequestsReceived";
import RequestsPosted from "./RequestsPosted";
import BookDetails from "./BookDetails";
import MyBookDetails from "./MyBookDetails";
import ProfilePage from "./ProfilePage";

export default function Dashboard() {
  // const [user, setUser] = useState(null); // store user data from backend

  // Fetch logged-in user info when component mounts
  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const res = await axios.get("http://localhost:5000/api/user/profile", {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       });
  //       setUser(res.data);
  //     } catch (err) {
  //       console.error("Failed to fetch user:", err);
  //     }
  //   };
  //   fetchUser();
  // }, []);

  // if (!user) return <p>Loading user data...</p>;

  return (
          <Routes> 
            {/* Parent layout route */}
            <Route element={<DashboardLayout />}>  {/* user={user} */}
            {/* Default redirect to 'explore' when at '/dashboard' */}
            <Route index element={<Navigate to="explore" replace />} />

            {/* Main Pages */}
            <Route path="explore" element={<Explore  />} />
            <Route path="my-books" element={<MyBooks  />} />
            <Route path="my-borrowed-books" element={<BorrowedBooks  />} />
            <Route path="my-lended-books" element={<MyLendedBooks />} />
            <Route path="requests-received" element={<RequestsReceived  />} />
            <Route path="requests-posted" element={<RequestsPosted  />} /> 
            
              {/* Book detail - user view */}
              <Route path="books/:id" element={<BookDetails />} />

              {/* Book detail - owner view */}
              <Route path="my-books/:id" element={<MyBookDetails />} />

              {/* Profile Page */}
              <Route path="profile" element={<ProfilePage />} />

            </Route>
           </Routes>
  );
}

// Notes:
// - Fetching logged-in user data once (after login). Storing it in useState. Passing it to child components (DashboardHeader, and pages like MyBooks, MyBorrowedBooks)
// - The user info is needed in multiple child components. So fetching once avoids multiple API calls.
// - Can easily pass user as prop wherever needed.
// - Sidebar is fixed position. Main content area has left margin to avoid overlap.
// - API calling is commented out until the backend ready.
// - Other sections are commented to check the UI