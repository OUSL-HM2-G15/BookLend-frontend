import DashboardHeader from "../layouts/DashboardLayout";
import Sidebar from "../components/DashboardSideBar";
import { Routes, Route, Navigate } from "react-router-dom";
import Explore from "./Explore";
import MyBooks from "./MyBooks";

export default function Dashboard () {
  return (
    <div className="bg-white min-h-screen">
      <DashboardHeader />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-64 mt-16 p-6 h-[calc(100vh-4rem)] overflow-y-auto">
          <Routes>
            <Route path="/" element={<Navigate to="explore" replace />} />
            <Route path="explore" element={<Explore />} />
            <Route path="my-books" element={<MyBooks />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
