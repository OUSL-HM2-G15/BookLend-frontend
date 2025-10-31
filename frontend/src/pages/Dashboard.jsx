// import React, { useEffect, useState } from "react";
// import axios from "axios";
import DashboardHeader from "../components/DashboardHeader";
import Sidebar from "../components/DashboardSideBar";
import { Routes, Route, Navigate } from "react-router-dom";
import Explore from "./Explore";
import MyBooks from "./MyBooks";
// import MyBorrowedBooks from "./MyBorrowedBooks";
// import MyLendedBooks from "./MyLendedBooks";
// import RequestsReceived from "./RequestsReceived";
// import RequestsPosted from "./RequestsPosted";

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
    <div className="bg-white min-h-screen">
      {/* Fixed Header */}
      <DashboardHeader /> {/* user={user} */}

     {/* Page Layout */}
      <div className="flex">
        {/* Fixed Sidebar */}
        <Sidebar />

       {/* Main Content Area */}
       <main className="flex-1 ml-64 mt-16 p-6 h-[calc(100vh-4rem)] overflow-y-auto">
          <Routes> 
          {/* Default redirect to 'explore' when at '/dashboard' */}
            <Route path="/" element={<Navigate to="explore" replace />} />

            <Route path="explore" element={<Explore  />} />  {/*need to pass user={user}*/}
            <Route path="my-books" element={<MyBooks  />} />
            {/*<Route path="my-borrowed-books" element={<MyBorrowedBooks user={user} />} />
            <Route path="my-lended-books" element={<MyLendedBooks user={user} />} />
            <Route path="requests-received" element={<RequestsReceived user={user} />} />
            <Route path="requests-posted" element={<RequestsPosted user={user} />} />  */}
           </Routes>
        </main>
      </div>
    </div>
  );
}

// Notes:
// - Fetching logged-in user data once (after login). Storing it in useState. Passing it to child components (DashboardHeader, and pages like MyBooks, MyBorrowedBooks)
// - The user info is needed in multiple child components. So fetching once avoids multiple API calls.
// - Can easily pass user as prop wherever needed.
// - Sidebar is fixed position. Main content area has left margin to avoid overlap.
// - API calling is commented out until the backend ready.
// - Other sections are commented to check the UI