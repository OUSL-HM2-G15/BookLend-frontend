import DashboardLayout from "../layouts/DashboardLayout";
import { Routes, Route, Navigate } from "react-router-dom";
import Explore from "./Explore";
import MyBooks from "./MyBooks";
import BorrowedBooks from "./BorrowedBooks";
import MyLendedBooks from "./MyLendedBooks";
import RequestsReceived from "./RequestsReceived";
import RequestsPosted from "./RequestPosted";
import BookDetails from "./BookDetails";
import MyBookDetails from "./MyBookDetails";
import ProfilePage from "./ProfilePage";

export default function Dashboard({ user, onLogout }) {
  return (
    <Routes>
      <Route element={<DashboardLayout user={user} onLogout={onLogout} />}>
        <Route index element={<Navigate to="explore" replace />} /> {/* default page */}
        <Route path="explore" element={<Explore />} />
        <Route path="my-books" element={<MyBooks />} />
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
