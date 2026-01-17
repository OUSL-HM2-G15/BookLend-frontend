import DashboardLayout from "../layouts/DashboardLayout";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import Explore from "./Explore";
import MyBooks from "./MyBooks";
import BorrowedBooks from "./BorrowedBooks";
import MyLendedBooks from "./MyLendedBooks";
import RequestsReceived from "./RequestsReceived";
import RequestsPosted from "./RequestPosted";
import BookDetails from "./BookDetails";
import MyBookDetails from "./MyBookDetails";
import ProfilePage from "./ProfilePage";
import { Result, Button } from "antd";
import PrivateRoute from "../components/ProtectedRoute" // Import PrivateRoute

export default function Dashboard({ user, onLogout }) {
  return (
    <Routes>
      <Route element={<DashboardLayout user={user} onLogout={onLogout} />}>
        {/* Default page */}
        <Route index element={<Navigate to="explore" replace />} />

        {/* Explore page accessible without login */}
        <Route path="explore" element={<Explore />} />
        <Route path="books/:id" element={<BookDetails />} />  {/* BookDetails is public now */}


        {/* Private Routes */}
        <Route path="my-books" element={<PrivateRoute element={<MyBooks />} />} />
        <Route path="my-borrowed-books" element={<PrivateRoute element={<BorrowedBooks />} />} />
        <Route path="my-lended-books" element={<PrivateRoute element={<MyLendedBooks />} />} />
        <Route path="requests-received" element={<PrivateRoute element={<RequestsReceived />} />} />
        <Route path="requests-posted" element={<PrivateRoute element={<RequestsPosted />} />} />
        <Route path="my-books/:id" element={<PrivateRoute element={<MyBookDetails />} />} />
        <Route path="profile" element={<PrivateRoute element={<ProfilePage />} />} />

        {/* Catch-all for invalid paths */}
        <Route
          path="*"
          element={
            <Result
              status="404"
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
      </Route>
    </Routes>
  );
}

