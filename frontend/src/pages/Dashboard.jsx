import DashboardLayout from "../layouts/DashboardLayout";
import { Routes, Route, Navigate } from "react-router-dom";
import Explore from "./Explore";
import MyBooks from "./MyBooks";
import BorrowedBooks from "./BorrowedBooks";
import RequestPosted from "./RequestPosted";

export default function Dashboard () {
  return (
    <div className="bg-white min-h-screen">
      <DashboardLayout >
      <div className="flex">
        <main className="flex-1 ml-64 mt-16 p-6 h-[calc(100vh-4rem)] overflow-y-auto">
          <Routes>
            <Route path="/" element={<Navigate to="explore" replace />} />
            <Route path="explore" element={<Explore />} />
            <Route path="my-books" element={<MyBooks />} />
            <Route path="borrowed-books" element={<BorrowedBooks />} />
            <Route path="lended-books" element={<div>Lended Books </div>} />
            <Route path="requests-received" element={<div>Requests Received </div>} />
            <Route path="requests-posted" element={<RequestPosted />} />
          </Routes>
        </main>
      </div>
      </DashboardLayout>
    </div>
  );
}
