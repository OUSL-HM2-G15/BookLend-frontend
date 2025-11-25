import DashboardLayout from "../layouts/DashboardLayout";
import { Routes, Route, Navigate } from "react-router-dom";
import Explore from "./Explore";
import MyBooks from "./MyBooks";
import BorrowedBooks from "./BorrowedBooks";
import RequestPosted from "./RequestPosted";

export default function Dashboard ({ user }) {
  return (
      <DashboardLayout  user={user}>
          <Routes>
            <Route path="/" element={<Navigate to="explore" replace />} />
            <Route path="explore" element={<Explore />} />
            <Route path="my-books" element={<MyBooks />} />
            <Route path="borrowed-books" element={<BorrowedBooks />} />
            <Route path="lended-books" element={<div>Lended Books </div>} />
            <Route path="requests-received" element={<div>Requests Received </div>} />
            <Route path="requests-posted" element={<RequestPosted />} />
          </Routes>
      </DashboardLayout>

  );
}
