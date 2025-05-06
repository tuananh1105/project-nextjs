import UserSidebar from "@/components/user-sidebar";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-6 p-6 bg-gray-50 min-h-screen">
      <UserSidebar />
      <div className="flex-1">{children}</div>
    </div>
  );
}
