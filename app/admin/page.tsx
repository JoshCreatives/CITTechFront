'use client';
import AdminDashboard from './AdminDashboard';
import AdminLayout from './layout';

export default function AdminPage() {
  return (
    <AdminLayout>
      <AdminDashboard />
    </AdminLayout>
  );
}