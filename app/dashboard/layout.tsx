import Sidebar from "@/components/dashboard/Sidebar";

export const metadata = {
  title: "Панель управления — ToiBer",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-apple-gray-light">
      <Sidebar />
      <main className="flex-1 px-4 py-6 lg:px-8 lg:py-8">
        <div className="mx-auto max-w-5xl">{children}</div>
      </main>
    </div>
  );
}
