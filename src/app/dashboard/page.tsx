import AuthGuard from "@/components/AuthGuard";
import AdminDashboard from "./AdminDashboard";
// import AdminTable from "@/components/AdminTable"/

export default function Dashboard() {
  return (
    <AuthGuard>
      <AdminDashboard />
    </AuthGuard>
  );
}