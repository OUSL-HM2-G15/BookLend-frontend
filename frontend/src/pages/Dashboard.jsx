import DashboardLayout from "../layouts/DashboardLayout";
import { Routes, Route, Navigate , Link} from "react-router-dom";
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
        {/* Default page */}
        <Route index element={<Navigate to="explore" replace />} />
        <Route path="explore" element={<Explore />} />

        {/* Book detail - user view - with hidden data*/}
        <Route path="explore/:id" element={<BookDetails />} />

        {/* Book detail - user view - with contact infor*/}
        <Route path="my-borrowed-books/:id" element={<BookDetails />} />

        <Route path="my-books" element={<MyBooks />} />
        <Route path="my-borrowed-books" element={<BorrowedBooks />} />
        <Route path="my-lended-books" element={<MyLendedBooks />} />
        <Route path="requests-received" element={<RequestsReceived />} />
        <Route path="requests-posted" element={<RequestsPosted />} />

        {/* Book detail - owner view - for CRUD */}
        <Route path="my-books/:id" element={<MyBookDetails />}  />

        {/* Profile Page */}
        <Route path="profile" element={<ProfilePage />}  />

      </Route>
    </Routes>
  );
}
