import "../index.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col">
      {children}
    </div>
  );
}
